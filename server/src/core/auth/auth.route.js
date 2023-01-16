const express = require('express');
const { processRequestBody } = require("zod-express-middleware");
const { registerUserHandler, verifyEmailHandler, loginHandler } = require('./auth.controller');
const { registerUserSchema, loginUserSchema } = require('./auth.schema');

const router = express.Router();


// register user route
router.post('/register', processRequestBody(registerUserSchema.body), registerUserHandler);

// verify email route
router.get('/verify-email', verifyEmailHandler);

// login route
router.post('/login', processRequestBody(loginUserSchema.body), loginHandler);

module.exports = router;