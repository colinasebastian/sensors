const AbstractServer = require('./abstract-server');

class HttpServer extends AbstractServer {

    async initServer() {
        const Koa = require('koa');
        const router = require('../controller/router');
        const config = require('config');
        const bodyParser = require('koa-bodyparser');
        const port = config.get('server.port');
        const app = new Koa();
        const logger = require('koa-logger');

        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                logProducer.sendErrorLog(logMessages.koa);
                ctx.status = err.status || 500;
                ctx.body = { status: ctx.status, message: err.message };
                ctx.app.emit('error', err, ctx);
            }
        });

        const logProducer = require('../util/logProducer')
        const LogMessages = require('../resources/messages');
        const logMessages = new LogMessages();

        app.use(logger());
        app.use(bodyParser());
        app.use(router.routes());
        app.use(router.allowedMethods());

        app.on('error', (err, ctx) => {
            logProducer.sendErrorLog(logMessages.server);

            console.error(ctx.status);
            console.error(err.status);
            console.error(ctx.body);
            console.error(err.message);
        });

        app.listen(port || 8080, () =>
            console.log(`Server started, Listening on http://localhost:${port}
        Endpoints:
            ANALYTICS
                * GET  /analytics/:id
            CATALOG
                * GET  /sensors
                * GET  /sensors?limit=:limit&offset=:offeset
                * POST /sensors
                * GET  /sensors/:id
            LOGGER
                * GET /errorLogs 
                * GET /errorLogs?limit=:limit&offset=:offset
                * GET /infoLogs 
                * GET /infoLogs?limit=:limit&offset=:offset 
            OBSERVATION
                * POST /observations
                * GET  /observations/:sensorESN?begin=:begin&end=:end
                `));
    }
}

module.exports = HttpServer;