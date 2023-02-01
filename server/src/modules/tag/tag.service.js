const prisma = require('../../core/database/prisma')

async function getTags() {
    return prisma.tag.findMany()
}

async function getTagBySlug(slug) {
    return prisma.tag.findUnique({
        where: {
            slug: String(slug)
        }
    })
}


module.exports = {
    getTags,
    getTagBySlug
}