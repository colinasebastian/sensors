const Server = require('./server');
const AbnormalObservationsListener = require('./listeners/abnormalObservationsListener');

(async () => {
    await Server.initServer();
    new AbnormalObservationsListener();
})();