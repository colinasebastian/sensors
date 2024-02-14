const DeferBindingServer = require('./servers/defer-binding-server');

(async () => {
    const server = new DeferBindingServer();
    await server.initServer();
})();