const { PrismaClient } = require("@prisma/client");
const clc = require("cli-color");
const Logger = require("../../utils/logger");
const logger = new Logger("PRISMA");
const slugify = require("slugify");

const prisma = global.prisma || new PrismaClient({
    log: ["info", "warn", "error"],
});

prisma.$on("query", (e) => {
    logger.log(`\n${clc.green(`Query: ${e.query}`)} \nDuration: ${e.duration}ms \nParams: ${JSON.stringify(JSON.parse(e.params))}`);
});

prisma.$use(async (params, next) => {
    if ((params.action === 'create' || params.action === 'update') && ['Post', 'Category', 'Tag'].includes(params.model)) {
        let { args: { data } } = params;
        // Check if slug exists by `findUnique` (did not test)
        data.slug = slugify(`${data.name || data.title}`, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
    }
    const result = await next(params)
    return result
});


module.exports = prisma;
