const BadRequestException = require('../../exceptions/badRequest.exception');
const Logger = require('../../utils/logger');
const { sendEmail, sendVerifyEmail, decodeConfirmationToken } = require('../email/email.service');
const { createUser, validateUserEmail } = require('./auth.service');
const { generateVerificationUrl } = require('./auth.util');
const logger = new Logger('AUTH CONTROLLER');


async function registerUserHandler(req, res, next) {
    try {
        // create user
        const { name, email, password } = req.body;
        const user = await createUser({ name, email, password });

        // send verification email
        // generate verification url
        const url = generateVerificationUrl(user.email);

        // send email
        await sendVerifyEmail(user.email, url);

        return res.status(201).json({
            message: 'Link to verify email sent to your email',
        });
    } catch (error) {
        console.log(error);
        logger.error(error.message);
        next(error);
    }
}

async function verifyEmailHandler(req, res, next) {
    try {
        const token = req.query.token;
        if (!token) {
            throw new BadRequestException('No token provided');
        }
        const email = await decodeConfirmationToken(token);

        if (!email) {
            throw new BadRequestException('Invalid token');
        }

        // update user
        const user = await validateUserEmail(email);

        return res.redirect(process.env.CLIENT_URL || "http://localhost:3000");

    } catch (error) {
        console.log(error);
        logger.error(error.message);
        next(error);
    }
}

module.exports = { registerUserHandler, verifyEmailHandler };