const BadRequestException = require('../../exceptions/badRequest.exception');
const { getUserByEmail } = require('../../modules/user/user.service');
const Logger = require('../../utils/logger');
const { sendVerifyEmail } = require('../email/email.service');
const { createUser, validateUserEmail, createSession, createAccessToken, createRefreshToken } = require('./auth.service');
const { generateVerificationUrl, decodeConfirmationToken } = require('./auth.util');
const logger = new Logger('AUTH CONTROLLER');
const bcrypt = require('bcrypt');
const HttpException = require('../../exceptions/http.exception');
const { StatusCodes } = require('http-status-codes');

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

        if (error.code = 'P2002') {
            return next(new BadRequestException("User with this email already exists"))
        }

        if (error instanceof HttpException) {
            return next(error);
        }
        next(new HttpException(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
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
        if (error instanceof HttpException) {
            return next(error);
        }
        next(new HttpException(error.message, HttpException.INTERNAL_SERVER_ERROR));
    }
}

const accessTokenCookieOptions = {
    maxAge: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME_IN_MS), // 1 day is  ms
    httpOnly: true,
    domain: process.env.NODE_ENV === "production" ? "localhost" : undefined,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
};

const refreshTokenCookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME_IN_MS), // 7 days is  ms
    // todo make this path dynamic
    path: "/api/auth/refresh",
};

async function loginHandler(req, res, next) {
    // find the user by email
    // if user not found, throw error
    // compare password with the hashed password
    // if password does not match, throw error
    // generate token and create session
    // send token as cookie
    try {
        const { email, password } = req.body;

        // find user with email
        const user = await getUserByEmail(email);
        // if user not found, throw error
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        // check if user is verified
        if (!user.is_active) {
            throw new BadRequestException('Please verify your email');
        }

        // compare password
        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }

        // create session
        const session = await createSession(user.id, req.get('user-agent') || "");

        // create access token
        const accessTokenPayload = { user: user.id, session: session.id }
        const accessToken = createAccessToken(accessTokenPayload);

        // send token as cookie
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);

        // create refresh token
        const refreshTokenPayload = { session: session.id }
        const refreshToken = createRefreshToken(refreshTokenPayload);

        // send token as cookie
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

        return res.status(200).json({
            message: 'Login successful',
        });
    } catch (error) {
        console.log(error);
        logger.error(error.message);
        next(error);
    }
}


module.exports = { registerUserHandler, verifyEmailHandler, loginHandler };