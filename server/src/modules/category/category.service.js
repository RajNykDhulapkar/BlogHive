const prisma = require('../../core/database/prisma')
async function getCategories() {
    return prisma.category.findMany()
}

async function getCategoryBySlug(slug) {
    return prisma.category.findUnique({
        where: {
            slug: String(slug)
        }
    })
}


module.exports = {
    getCategories,
    getCategoryBySlug
}