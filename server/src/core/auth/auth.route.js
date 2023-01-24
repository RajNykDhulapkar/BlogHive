const express = require('express');
const { processRequestBody } = require("zod-express-middleware");
const { registerUserHandler, verifyEmailHandler, loginHandler, refreshHandler } = require('./auth.controller');
const { registerUserSchema, loginUserSchema } = require('./auth.schema');

const router = express.Router();

// register user route
router.post('/register', processRequestBody(registerUserSchema.body), registerUserHandler);

// verify email route
router.get('/verify-email', verifyEmailHandler);

// login route
router.post('/login', processRequestBody(loginUserSchema.body), loginHandler);

// refresh token route
router.get('/refresh', refreshHandler);

// logout route

// forgot password route

// reset password route

// change password route

// verify phone route

// resend verification email route

// resend verification phone route

// google oauth login and register route

// twitter oauth login and register route


module.exports = router;