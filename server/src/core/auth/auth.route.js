const express = require('express');
const { processRequestBody } = require("zod-express-middleware");
const { registerUserHandler, verifyEmailHandler } = require('./auth.controller');
const { registerUserSchema } = require('./auth.schema');

const router = express.Router();


// register user route
router.post('/register', processRequestBody(registerUserSchema.body), registerUserHandler);

// verify email route
router.get('/verify-email', verifyEmailHandler);

module.exports = router;