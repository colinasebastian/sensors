const Server = require('./server');
const ConsumerMongo = require('./repositories/consumerMongo');

(async () => {
    await ConsumerMongo.initRepository();
    await Server.initServer();
})();