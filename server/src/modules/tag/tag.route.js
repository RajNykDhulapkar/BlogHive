const express = require('express');
const placeHolderHandler = require('../../helpers/placeHolderHandler');
const { getTagsHandler, getTagBySlugHandler } = require('./tag.controller');
const router = express.Router();

// route to get all tags
router.get("/", getTagsHandler);

// route to get a tag by slug
router.get("/:slug", getTagBySlugHandler);

module.exports = router;