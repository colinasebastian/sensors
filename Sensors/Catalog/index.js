const Server = require('./server');
const SensorMongo = require('./repositories/sensorMongo');

(async () => {
    await SensorMongo.initRepository();
    await Server.initServer();
})();