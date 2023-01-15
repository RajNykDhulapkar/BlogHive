const jwt = require('jsonwebtoken');

function generateVerificationUrl(email) {
    const payload = { email };
    const token = jwt.sign(payload, process.env.JWT_EMAIL_VERIFICATION_TOKEN_SECRET,
        { expiresIn: process.env.JWT_EMAIL_VERIFICATION_TOKEN_EXPIRATION_TIME });
    return `${process.env.API_HOST}/api/auth/verify-email/?token=${token}`;
}

module.exports = {
    generateVerificationUrl
};