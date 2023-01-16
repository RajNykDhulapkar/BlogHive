const { StatusCodes } = require("http-status-codes");
const HttpException = require("../exceptions/http.exception");

function requireUserMiddleware(req, res, next) {
    if (!req.user) {
        throw new HttpException('Please login to continue', StatusCodes.UNAUTHORIZED);
    }
    next();
}

module.exports = requireUserMiddleware;