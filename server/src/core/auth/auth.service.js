const prisma = require('../../core/database/prisma');
const { exclude } = require('../../helpers/serializers');
const bcrypt = require('bcrypt');
const { signJWT } = require('./auth.util');

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

async function createSession(userId, userAgent) {
    const session = await prisma.session.create({
        data: {
            user: {
                connect: {
                    id: parseInt(userId)
                }
            },
            userAgent,
            // expires in 7 days
            expiresAt: new Date(Date.now() + parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME_IN_MS) || 7 * 24 * 60 * 60 * 1000)
        }
    });
    return session;
}

function createAccessToken(payload) {
    return signJWT(
        payload,
        process.env.JWT_ACCESS_TOKEN_SECRET,
        process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME
    )
}

function createRefreshToken(payload) {
    return signJWT(
        payload,
        process.env.JWT_REFRESH_TOKEN_SECRET,
        process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME
    )
}

module.exports = {
    createUser,
    validateUserEmail,
    createSession,
    createAccessToken,
    createRefreshToken
};