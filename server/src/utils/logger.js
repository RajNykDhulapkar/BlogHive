const { Console } = require("console");
const clc = require("cli-color");

module.exports = class Logger extends Console {
    constructor(_name) {
        super(process.stdout, process.stderr);
        this.name = _name;
    }
    setName(name) {
        this.name = name;
    }

    log(message, ...optionalParams) {
        const timestamp = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
        super.log(
            `${clc.cyan("[" + timestamp + "]")} - ${clc.yellow(this.name)}  ${message}`,
            ...optionalParams
        );
    }

    warn(message, ...optionalParams) {
        const timestamp = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
        super.warn(
            `${clc.cyan("[" + timestamp + "]")} - ${clc.red(this.name)}  ${message}`,
            ...optionalParams
        );
    }

    error(message, ...optionalParams) {
        const timestamp = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
        super.error(clc.red(`[${timestamp}] - ${this.name}  ${message}`), ...optionalParams);
    }

    debug(message, ...optionalParams) {
        const timestamp = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
        super.debug(
            `${clc.cyan("[" + timestamp + "]")} - ${clc.blue(this.name)}  ${message}`,
            ...optionalParams
        );
    }
};
