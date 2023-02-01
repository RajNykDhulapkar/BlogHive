const prisma = require("../../core/database/prisma");
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
    console.log("slug", slug);
    try {
        const post = await prisma.post.findUnique({
            where: {
                slug: String(slug),
            },
        })
    } catch (error) {
        throw error
    }
}


module.exports = {
    getPostsByUserId,
    getPosts,
    getPostBySlug
}