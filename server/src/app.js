const express = require('express');
const app = express();
const dotenv = require('dotenv');
const responseTime = require("response-time");
const cors = require('cors');
const errorMiddleware = require('./middlewares/error.middleware');
const { logRequest } = require('./middlewares/logRequest.middleware');

dotenv.config();

app.use(responseTime());

app.use(cors({
    origin: '*',
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(responseTime());

app.use(logRequest);

// register routes
app.use('/api/auth', require('./core/auth/auth.route'));

app.get("/api/health-check", (req, res) => {
    return res.status(200).send({
        message: "Server is up and running",
        timestamp: Date.now(),
    })
});

// error handler middleware
app.use(errorMiddleware)

module.exports = app;