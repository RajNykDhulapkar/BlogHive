const express = require('express');
const router = express.Router();

router.use(require('../../middlewares/requireUser.middleware'));

// get current logged in user
router.get('/me', async (req, res, next) => {
    return res.status(200).send(req.user);
});



module.exports = router;