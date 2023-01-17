const prisma = require("../../core/database/prisma");

async function getPostsByUserId(userId, page, pageSize, orderBy) {
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
            skip: (page - 1) * pageSize,
            take: pageSize,
        })
    ])
    return {
        count,
        posts
    }
}

async function getPosts(page, pageSize, orderBy) {
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
                skip: (page - 1) * pageSize,
                take: pageSize,
            })
        ])
        return {
            count,
            posts
        }
    } catch (error) {
        throw error
    }
}
// TODO simplify this code block

module.exports = {
    getPostsByUserId,
    getPosts,
}