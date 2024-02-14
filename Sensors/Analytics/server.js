module.exports.initServer = async function () {

    const Koa = require('koa');
    const router = require('./controllers/router');
    const config = require('config');
    const port = config.get('server.port');
    const logger = require('koa-logger');
    
    const logProducer = require('./util/logProducer')
    const LogMessages = require('./resources/messages');
    const logMessages = new LogMessages();

    const app = new Koa();

    app.use(async (ctx, next) => {
        try {
          await next();
        } catch (err) {
          logProducer.sendLog(logMessages.koa);
          ctx.status = err.status || 500;
          ctx.body = { status: ctx.status, message: err.message };
          ctx.app.emit('error', err, ctx);
        }
      });
    app.use(logger());
    app.use(router.routes());
    app.use(router.allowedMethods());

    app.on('error', (err, ctx) => {
        logProducer.sendLog(logMessages.server);

        console.error(ctx.status);
        console.error(err.status);
        console.error(ctx.body);
        console.error(err.message);
    });
    app.listen(port || 8081, () => console.log(`Server started, see http://localhost:${port}
    Endpoints:
        * GET  /analytics/:id`));
}