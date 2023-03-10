const express = require('express');
const placeHolderHandler = require('../../helpers/placeHolderHandler');
const requireUserMiddleware = require('../../middlewares/requireUser.middleware');
const selectMiddleware = require('../../middlewares/select.middleware');
const { getPostsHandler, getPostBySlugHandler, createPostHandler } = require('./post.controller');
const router = express.Router();

// route to get all posts paginated sorted by date created, like count, comment count 
// userId passed as query param to get posts by a user
// page and page_size passed as query param to get paginated posts
// [params: order_by, user_id, page, page_size]
// [permissions: PUBLIC]
router.get("/", selectMiddleware, getPostsHandler);

// get by tag
router.get("/tag/:tag", placeHolderHandler("Get all posts paginated sorted by date created, like count, comment count"));

// get by category
router.get("/category/:category", placeHolderHandler("Get all posts paginated sorted by date created, like count, comment count"));

// search by title and excerpt
router.get("/search/:search", placeHolderHandler("Get all posts paginated sorted by date created, like count, comment count"));

// route to get post according to users custom feed
router.get("/feed", placeHolderHandler("Get post according to users custom feed"));

// router to create  a new post by the current logged in user
router.post("/", requireUserMiddleware, createPostHandler);

// route to get a post by slug
router.get("/:slug", getPostBySlugHandler);

// route to like a post by the current logged in user
router.post("/:slug/like", placeHolderHandler("Like a post by the current logged in user"));

// route to unlike a post by the current logged in user
router.delete("/:slug/like", placeHolderHandler("Unlike a post by the current logged in user"));



module.exports = router;