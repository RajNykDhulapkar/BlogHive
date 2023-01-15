const prisma = require('../../core/database/prisma');
const { exclude } = require('../../helpers/serializers');
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject(err);
            }
            resolve(hash);
        });
    });
}

async function createUser(data) {
    // hash password 
    data.password = await hashPassword(data.password);
    const user = await prisma.user.create({
        data
    });
    return exclude(user, ['password']);
}

async function validateUserEmail(email) {
    const user = await prisma.user.update({
        where: {
            email
        },
        data: {
            is_active: true
        }
    });
    return exclude(user, ['password'])
}

module.exports = { createUser, validateUserEmail };