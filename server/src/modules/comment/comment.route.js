const express = require('express');
const placeHolderHandler = require('../../helpers/placeHolderHandler');
const router = express.Router();

// route to get all comments on a post nested by parent comment, postId passed as query param
router.get("/", placeHolderHandler("Get all comments on a post nested by parent comment, postId passed as query param"));

// route to create a new comment on a post, postId passed as query param
// if comment is a reply to another comment, parentCommentId passed as query param
router.post("/", placeHolderHandler("Create a new comment on a post, postId passed as query param"));

module.exports = router;