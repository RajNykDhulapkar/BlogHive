const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const http = require('http');
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    }
});
const Logger = require('./utils/logger');

const logger = new Logger('SERVER');

const PORT = process.env.PORT || 8000;

global.io = io;

const server = httpServer.listen(PORT, async () => {
    logger.log(`Server listening on http://localhost:${PORT}`);
});

const signals = ["SIGINT", "SIGTERM", "SIGQUIT"];

function gracefulShutdown(signal) {
    process.on(signal, async () => {
        logger.log(`Received ${signal}. Shutting down gracefully...`);
        server.close(() => {
            logger.log("Server closed.");
        });

        // disconnect from database

        logger.log("Exiting process...");

        process.exit(0);
    });
}

signals.forEach((signal) => {
    gracefulShutdown(signal);
});

