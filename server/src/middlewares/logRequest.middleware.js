const clc = require("cli-color");
const Logger = require("../utils/logger");

function createLoggerMiddleware() {
    const logger = new Logger("HTTP");
    return function (request, response, next) {
        const url = decodeURI(request.url);
        response.on("finish", function () {
            const userEmail = request.user ? request.user.email : "anonymous";
            logger.log(
                `${clc.cyan("[" + request.method + "]")} ${request.originalUrl} ${clc.yellow(
                    response.statusCode
                )} ${response.statusMessage} ${response.get("Content-Length") || 0} - ${clc.green(
                    response.get("x-Response-Time")
                )} ${clc.blue("<user:" + userEmail + ">")
                }`
            );
        });
        next();
    };
}

exports.logRequest = createLoggerMiddleware();
