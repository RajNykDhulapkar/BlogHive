const prisma = require("../../core/database/prisma");
const { slugify } = require("../../helpers");
const { exclude } = require("../../helpers/serializers");

async function getPostsByUserId(userId, page, pageSize, orderBy, select) {
    const [count, posts] = await prisma.$transaction([
        prisma.post.count({
            where: {
                authorId: parseInt(userId),
                published: true,
            },
        }),
        prisma.post.findMany({
            where: {
                authorId: parseInt(userId),
                published: true,
            },
            select: {
                ...selectList.reduce((acc, item) => {
                    acc[item] = true;
                    return acc;
                }, {})
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
        })
    ])
    return {
        count,
        posts: posts.map((post) => {
            return {
                ...post,
                author: exclude(post.author, ['password'])
            }
        })
    }
}

async function getPosts(page, pageSize, orderBy, selectList) {
    try {
        const [count, posts] = await prisma.$transaction([
            prisma.post.count({
                where: {
                    published: true,
                },
            }),
            prisma.post.findMany({
                where: {
                    published: true,
                },
                select: {
                    ...selectList.reduce((acc, item) => {
                        acc[item] = true;
                        return acc;
                    }, {})
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
            })
        ])
        return {
            count,
            posts: posts.map((post) => {
                return {
                    ...post,
                    author: exclude(post.author, ['password'])
                }
            })
        }
    } catch (error) {
        throw error
    }
}
// TODO simplify this code block

async function getPostBySlug(slug) {
    console.log("slug : ", slug);
    try {
        const post = await prisma.post.findUnique({
            where: {
                slug: String(slug).trim(),
            },
        })
    } catch (error) {
        throw error
    }
}

// service to create post and return post object
async function createPost(body, userId) {
    try {

        let categoryId = null;
        if (body.categoryId !== undefined) {
            categoryId = parseInt(body.categoryId)
        } else if (body.category !== null) {
            categoryId = parseInt(body.category)
        } else {
            categoryId = null
        }

        // const slug = slugify(body.title)

        const post = await prisma.post.create({
            data: {
                ...body,
                author: {
                    connect: {
                        id: parseInt(userId)
                    }
                },
                published: body.published ? true : false,
                category: {
                    connect: {
                        id: categoryId
                    }
                },
                tags: {
                    connect: body.tags ? body.tags.map((tag) => {
                        return {
                            id: parseInt(tag)
                        }
                    }) : []
                }
            },
        })
        return post;
    } catch (error) {
        throw error
    }
}



module.exports = {
    getPostsByUserId,
    getPosts,
    getPostBySlug,
    createPost
}