const express = require('express');
const app = express();
const dotenv = require('dotenv');
const responseTime = require("response-time");
const cors = require('cors');
const errorMiddleware = require('./middlewares/error.middleware');
const { logRequest } = require('./middlewares/logRequest.middleware');
const { userDeserialiseMiddleware } = require('./middlewares/userDeserialise.middleware');

dotenv.config();

app.use(responseTime());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(responseTime());

// deserialise user and attach to req.user
app.use(userDeserialiseMiddleware)
// log request
app.use(logRequest);

// register routes
app.use('/api/auth', require('./core/auth/auth.route'));
// user routes
app.use('/api/user', require('./modules/user/user.route'));
// post routes
app.use('/api/post', require('./modules/post/post.route'));
// comment routes
app.use('/api/comment', require('./modules/comment/comment.route'));
// category routes
app.use('/api/category', require('./modules/category/category.route'));

// health check
app.get("/api/health-check", (req, res) => {
    return res.status(200).send({
        message: "Server is up and running",
        timestamp: Date.now(),
    })
});

// error handler middleware
app.use(errorMiddleware)

module.exports = app;