const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
const clc = require("cli-color");

const flush = require("./flush");

const { range, slugify, capitalizeEachWord, shuffleArray, get_random } = require("../src/helpers");
const { generateMarkdownPost } = require("../src/helpers/seed-helpers");

async function main() {
    console.log("Start flushing ...");
    await flush(prisma);
    console.log("Complete flushing ...");

    console.log("Start seeding ...");

    console.log("Seeding users ...");

    const password = await bcrypt.hash("myPassword@123", 10);

    const { count: usersCount } = await prisma.user.createMany({
        data: [
            {
                email: "dhulapkarraj@gmail.com",
                password: password,
                name: "Raj Naik Dhulapkar",
                is_active: true,
            },
            ...range(99).map((i) => ({
                email: faker.internet.email(),
                password: password,
                name: faker.name.fullName(),
                is_active: true,
            })),
        ],
    });
    console.log(clc.yellow(`    Seeded users count: ${usersCount} `));
    console.log(clc.cyan(`    Users in DB count: ${await prisma.user.count()}`));

    let users = await prisma.user.findMany();

    console.log("Seeding profiles ...");

    const { count: profilesCount } = await prisma.profile.createMany({
        data: users.map((user) => ({
            userId: user.id,
            bio: faker.lorem.paragraph(),
            profileImage: faker.image.avatar(),
            bannerImage: faker.image.imageUrl(),
        })),
    });
    console.log(clc.yellow(`    Seeded profiles count: ${profilesCount} `));
    console.log(clc.cyan(`    Profiles in DB count: ${await prisma.profile.count()}`));

    users = await prisma.user.findMany({
        include: {
            profile: true,
        },
    });

    console.log("Seeding categories ...");

    const categoriesList = require("./data/categories.json");

    const { count: categoriesCount } = await prisma.category.createMany({
        data: categoriesList.map((category) => ({
            name: category,
            slug: slugify(category),
        })),
    });
    console.log(clc.yellow(`    Seeded categories count: ${categoriesCount} `));
    console.log(clc.cyan(`    Categories in DB count: ${await prisma.category.count()}`));

    const categories = await prisma.category.findMany();

    console.log("Seeding tags ...");

    const tagsList = require("./data/tags.json");

    const { count: tagsCount } = await prisma.tag.createMany({
        data: tagsList.map((tag) => ({
            name: capitalizeEachWord(tag),
            slug: slugify(tag),
        })),
    });
    console.log(clc.yellow(`    Seeded tags count: ${tagsCount} `));
    console.log(clc.cyan(`    Tags in DB count: ${await prisma.tag.count()}`));

    const tags = await prisma.tag.findMany();

    console.log("Seeding posts ...");

    const { count: postsCount } = await prisma.post.createMany({
        data: shuffleArray(users, 30).map((user) => {
            return range(Math.floor(Math.random() * 4) + 1).map((_) => (
                {
                    ...generateMarkdownPost(),
                    published: true,
                    authorId: user.id,
                    categoryId: categories[Math.floor(Math.random() * categories.length)].id,
                    // tags: {
                    //     connect: shuffleArray(tags, Math.floor(Math.random() * 5) + 1).map((tag) => ({
                    //         id: tag.id,
                    //     })),
                    // },
                }
            ));
        }).reduce((acc, val) => acc.concat(val), []),
    });
    console.log(clc.yellow(`    Seeded posts count: ${postsCount} `));
    console.log(clc.cyan(`    Posts in DB count: ${await prisma.post.count()}`));

    // connect tags to posts
    console.log(clc.magenta("    Connecting tags to posts ..."));
    const posts = await prisma.post.findMany();

    for (let post of posts) {
        await prisma.post.update({
            where: {
                id: post.id,
            },
            data: {
                tags: {
                    connect: shuffleArray(tags, Math.floor(Math.random() * 5) + 1).map((tag) => ({
                        id: tag.id,
                    })),
                },
            },
        });
    }

    console.log(clc.magenta("    connected tags to posts ..."));

    console.log("Seeding comments ...");

    console.log(clc.magenta("    Creating comments ..."));
    for (let post of posts) {
        const updatedPost = await prisma.post.update({
            where: {
                id: post.id,
            },
            data: {
                comments: {
                    create: range(Math.floor(Math.random() * 10) + 1).map((_) => ({
                        content: faker.lorem.paragraph(),
                        authorId: get_random(users).id,
                    })),
                },
            },
            include: {
                comments: {
                    select: {
                        id: true,
                    }
                }
            }
        })

        for (let comment of updatedPost.comments) {
            const updatedComment = await prisma.comment.update({
                where: {
                    id: comment.id,
                },
                data: {
                    comments: {
                        createMany: {
                            data: range(Math.floor(Math.random() * 5) + 1).map((_) => ({
                                content: faker.lorem.paragraph(),
                                authorId: get_random(users).id,
                                postId: post.id,
                            }))
                        }
                    },
                },
                include: {
                    comments: {
                        select: {
                            id: true,
                        }
                    }
                }
            });

            for (let reply of updatedComment.comments) {
                await prisma.comment.update({
                    where: {
                        id: reply.id,
                    },
                    data: {
                        comments: {
                            createMany: {
                                data: range(Math.floor(Math.random() * 3)).map((_) => ({
                                    content: faker.lorem.paragraph(),
                                    authorId: get_random(users).id,
                                    postId: post.id,
                                }))
                            }
                        },
                    },
                });
            }
        }

    }

    console.log(clc.magenta("    Created comments..."));


    console.log("Seeding likes ...");

    console.log(clc.magenta("    Creating likes ..."));
    for (let post of posts) {
        await prisma.post.update({
            where: {
                id: post.id,
            },
            data: {
                likes: {
                    createMany: {
                        data: shuffleArray(users, Math.floor(Math.random() * 30) + 1).map((user) => ({
                            authorId: user.id,
                        })),
                    },
                },
            },
        });
    }

    console.log(clc.magenta("    Created likes..."));

    // console.log("Seeding follows ...");

    // console.log("Seeding notifications ...");

    // console.log("Seeding messages ...");

    // console.log("Seeding conversations ...");

    // console.log("Seeding conversation participants ...");

    // console.log("Seeding conversation messages ...");

    // console.log("Seeding conversation message participants ...");

    // console.log("Seeding conversation message reactions ...");

    // console.log("Seeding conversation message replies ...");

    // console.log("Seeding conversation message reply reactions ...");

    // console.log("Seeding conversation message reply participants ...");

    // console.log("Seeding conversation message reply reactions ...");

    console.log("end seeding ...");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });