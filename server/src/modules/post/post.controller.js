const { count } = require("console");
const HttpException = require("../../exceptions/http.exception");
const Logger = require("../../utils/logger");
const { getPostsByUserId, getPosts, getPostBySlug, createPost } = require("./post.service");
const logger = new Logger("POST CONTROLLER");

async function getPostsHandler(req, res, next) {
    // TODO do zod body validation
    try {
        // get page page_size user_id from query params
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 10;
        const userId = req.query.user_id;
        // order_by can be date_created_latest, date_created_oldest, like_count, comment_count
        const ORDER_BY_OPTIONS = ["date_created_latest", "date_created_oldest", "like_count", "comment_count"];
        const orderBy = req.query.order_by || "date_created_latest";
        if (orderBy && !ORDER_BY_OPTIONS.includes(orderBy)) {
            throw new HttpException(400, "Invalid order_by query param");
        }

        let select = req.select;
        if (!select) select = [];
        // default select fields
        select.push([
            'id',
            'title',
            'excerpt',
            'bannerImage',
            'slug',
            'author',
            'createAt',
            'updateAt'
        ])
        select = [...new Set(select.flat())]

        let result = {};

        if (userId) {
            // get posts by user
            // getPostsByUserId return {count, posts} object assign it to posts
            result = await getPostsByUserId(userId, page, pageSize, orderBy, select);
        } else {
            // get all posts
            // getPost return {count, posts} object assign it to posts
            result = await getPosts(page, pageSize, orderBy, select);
        }

        return res.status(200).send({
            count: result.count,
            page: page,
            page_size: pageSize,
            result: result.posts,
        })
    } catch (error) {
        console.log("error", error);
        if (error instanceof HttpException) {
            next(error);
        }
        next(new HttpException("Internal Server Error", 500));
    }
}

async function getPostBySlugHandler(req, res, next) {
    try {
        const slug = req.params.slug;
        if (!slug) {
            throw new HttpException("Invalid slug", 400);
        }
        const post = await getPostBySlug(slug);
        if (!post) {
            throw new HttpException("Post not found", 404);
        }
        return res.status(200).send(post);
    } catch (error) {

        logger.error(error.message);
        if (error instanceof HttpException) {
            return next(error);
        }
        next(new HttpException("Internal Server Error", 500));
    }
}

async function createPostHandler(req, res, next) {
    try {
        const body = req.body;
        const userId = req.user.id;
        const post = await createPost(body, userId);
        return res.status(200).send(post);
    } catch (error) {
        logger.error(error.message);
        if (error instanceof HttpException) {
            return next(error);
        }
        next(new HttpException("Internal Server Error", 500));
    }
}

module.exports = {
    getPostsHandler,
    getPostBySlugHandler,
    createPostHandler
};
