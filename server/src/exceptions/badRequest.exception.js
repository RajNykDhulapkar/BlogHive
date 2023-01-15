const HttpException = require('./http.exception');

class BadRequestException extends HttpException {
    constructor(message, error = 'Bad Request') {
        super(message, HttpStatus.BAD_REQUEST);
        this.error = error;
    }
}

module.exports = BadRequestException;