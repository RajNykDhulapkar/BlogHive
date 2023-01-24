const { verifyJWT } = require('../core/auth/auth.util');
const { exclude } = require('../helpers/serializers');
const { getUserById } = require('../modules/user/user.service');
const Logger = require('../utils/logger');
const logger = new Logger('USER DESERIALISE MIDDLEWARE');

function parseCookieHeader(cookieHeader) {
    try {
        return cookieHeader
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: decodeURIComponent(value) }), {});
    } catch (error) {
        logger.error('Invalid cookie header, unable to parse');
        return null
    }
}

async function userDeserialiseMiddleware(req, res, next) {
    try {
        const accessToken = (req.cookies?.accessToken || req.headers?.authorization || parseCookieHeader(req.headers.cookie)?.accessToken || "").replace(
            /^Bearer\s/,
            ""
        );
        if (!accessToken) {
            return next();
        }

        const payload = await verifyJWT(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
        if (!payload.user) {
            logger.error('Invalid token');
            return next();
        }

        // get user with id from payload
        const user = await getUserById(payload.user);
        if (!user) {
            logger.error('Invalid token, user not found');
            return next();
        }

        req.user = exclude(user, ['password']);
        next();
    } catch (error) {
        console.log(error);
        logger.error('Invalid token');
        next();
    }
}

module.exports = {
    userDeserialiseMiddleware,
    parseCookieHeader
};

