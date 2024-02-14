const Server = require('./server');
const observationMongo = require('./repositories/observationMongo');

(async () => {
    await observationMongo.initRepository();
    await Server.initServer();
})();