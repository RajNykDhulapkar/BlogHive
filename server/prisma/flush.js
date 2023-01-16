/**
 * A number, or a string containing a number.
 * @typedef {import('@prisma/client').PrismaClient} PrismaClient
 */
/**
 * Set the magic number.
 * @param {PrismaClient} prisma - The magic number.
 */
async function flush(prisma) {
    try {
        // await prisma.$executeRaw('TRUNCATE TABLE "user" CASCADE;');
        await prisma.like.deleteMany();
        await prisma.comment.deleteMany();
        await prisma.postMedia.deleteMany();
        await prisma.post.deleteMany();
        await prisma.category.deleteMany();
        await prisma.tag.deleteMany();
        await prisma.session.deleteMany();
        await prisma.profile.deleteMany();
        await prisma.user.deleteMany();
    } catch (error) {
        throw error;
    }
}
module.exports = flush;
