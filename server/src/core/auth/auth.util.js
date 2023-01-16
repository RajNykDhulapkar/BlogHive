const jwt = require('jsonwebtoken');
const BadRequestException = require('../../exceptions/badRequest.exception');

function generateVerificationUrl(email) {
    const payload = { email };
    const token = jwt.sign(payload, process.env.JWT_EMAIL_VERIFICATION_TOKEN_SECRET,
        { expiresIn: process.env.JWT_EMAIL_VERIFICATION_TOKEN_EXPIRATION_TIME });
    return `${process.env.API_HOST}/api/auth/verify-email/?token=${token}`;
}

async function decodeConfirmationToken(token) {
    try {
        const payload = await jwt.verify(token, process.env.JWT_EMAIL_VERIFICATION_TOKEN_SECRET);

        if (typeof payload === "object" && "email" in payload) {
            return payload.email;
        }
        throw new BadRequestException();
    } catch (error) {
        throw error
    }
}

function signJWT(payload, secret, expiresIn) {
    return jwt.sign(
        payload,
        secret,
        { expiresIn }
    )
}

function verifyJWT(token, secret) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                return reject(err);
            }
            resolve(payload);
        });
    });
}


module.exports = {
    generateVerificationUrl,
    decodeConfirmationToken,
    signJWT,
    verifyJWT
};