const Server = require('./server');
const UserMysql = require('./repositories/userMysql');

(async () => {
    await UserMysql.initRepository();
    await Server.initServer();
})();