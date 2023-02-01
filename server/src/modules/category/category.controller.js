const Logger = require("../../utils/logger");
const { getCategories, getCategoryBySlug } = require("./category.service");
const logger = new Logger("CATEGORY CONTROLLER");

async function getCategoriesHandler(req, res, next) {
    try {
        const categories = await getCategories();
        return res.status(200).send(categories);
    } catch (error) {
        console.log("error", error);
        if (error instanceof HttpException) {
            next(error);
        }
        next(new HttpException("Internal Server Error", 500));
    }
}

async function getCategoryBySlugHandler(req, res, next) {
    try {
        const slug = req.params.slug;
        if (!slug) {
            throw new HttpException("Invalid slug", 400);
        }
        const category = await getCategoryBySlug(slug);
        if (!category) {
            throw new HttpException("Category not found", 404);
        }
        return res.status(200).send(category);
    } catch (error) {
        logger.error(error.message);
        if (error instanceof HttpException) {
            return next(error);
        }
        next(new HttpException("Internal Server Error", 500));
    }
}

module.exports = {
    getCategoriesHandler,
    getCategoryBySlugHandler
};