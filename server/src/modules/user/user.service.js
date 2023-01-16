const prisma = require('../../core/database/prisma');

function getUserByEmail(email) {
    return prisma.user.findUnique({
        where: {
            email
        }
    });
}

function getUserById(id) {
    return prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    });
}


module.exports = { getUserByEmail, getUserById };
