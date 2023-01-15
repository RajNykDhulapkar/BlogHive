/**
 * A number, or a string containing a number.
 * @typedef {import('../exceptions/HttpException')} HttpException
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */
/**
 * Set the magic number.
 * @param {HttpException} error
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 */
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    return response.status(status).send({
        message,
        status,
    });
}

module.exports = errorMiddleware;
