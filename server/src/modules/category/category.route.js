const express = require('express');
const placeHolderHandler = require('../../helpers/placeHolderHandler');
const { getCategoriesHandler, getCategoryBySlugHandler } = require('./category.controller');
const router = express.Router();

// route to get all categories
router.get("/", getCategoriesHandler);

// route to get a category by slug
router.get("/:slug", getCategoryBySlugHandler);


module.exports = router;