const logsListener = require('./listeners/logsListener');
const errorLoggerMongo = require('./repositories/loggerMongo');
const Server = require('./server');

(async () => {
    await errorLoggerMongo.initRepository();
    await Server.initServer();
    new logsListener();
})();