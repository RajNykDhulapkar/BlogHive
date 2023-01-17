const express = require('express');
const placeHolderHandler = require('../../helpers/placeHolderHandler');
const router = express.Router();

router.use(require('../../middlewares/requireUser.middleware'));

// get current logged in user
router.get('/me', async (req, res, next) => {
    return res.status(200).send(req.user);
});

// get current logged user's profile
router.get('/me/profile', placeHolderHandler("Get current logged user's profile"));

// get current logged user's posts
router.get('/me/post', placeHolderHandler("Get current logged user's posts"));



module.exports = router;