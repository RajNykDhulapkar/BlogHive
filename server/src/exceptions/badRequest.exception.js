const HttpException = require('./http.exception');
const { StatusCodes } = require('http-status-codes');

class BadRequestException extends HttpException {
    constructor(message, error = 'Bad Request') {
        super(message, StatusCodes.BAD_REQUEST);
        this.error = error;
    }
}

module.exports = BadRequestException;