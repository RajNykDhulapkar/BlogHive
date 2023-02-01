const { getTags, getTagBySlug } = require("./tag.service");

async function getTagsHandler(req, res, next) {
    try {
        const tags = await getTags();
        return res.status(200).send(tags);
    } catch (error) {
        console.log("error", error);
        if (error instanceof HttpException) {
            next(error);
        }
        next(new HttpException("Internal Server Error", 500));
    }
}

async function getTagBySlugHandler(req, res, next) {
    try {
        const slug = req.params.slug;
        if (!slug) {
            throw new HttpException("Invalid slug", 400);
        }
        const tag = await getTagBySlug(slug);
        if (!tag) {
            throw new HttpException("Tag not found", 404);
        }
        return res.status(200).send(tag);
    } catch (error) {
        logger.error(error.message);
        if (error instanceof HttpException) {
            return next(error);
        }
        next(new HttpException("Internal Server Error", 500));
    }
}

module.exports = {
    getTagsHandler,
    getTagBySlugHandler
};