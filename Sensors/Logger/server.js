module.exports.initServer = async function () {
  const Config = require('config');
  const Koa = require('koa')
  const logger = require('koa-logger')
  const json = require('koa-json');
  const bodyParser = require('koa-bodyparser');
  const router = require('./controller/router');
  
  const logProducer = require('./util/logProducer')
  const ErrorMessages = require('./resources/messages');
  const errorMessages = new ErrorMessages();


  const app = new Koa()
  const port = Config.get('server.port');

    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = { status: ctx.status, message: err.message };
        ctx.app.emit('error', err, ctx);
      }
    });
    app.use(logger())
    app.use(bodyParser());
    app.use(json({ pretty: true }));
    app.use(router.routes());
    app.use(router.allowedMethods());
    
    app.on('error', (err, ctx) => {
      logProducer.sendLog(errorMessages.server);
  
      console.error(ctx.status);
      console.error(err.status);
      console.error(ctx.body);
      console.error(err.message);
    });
    
    app.listen(port || 8085, () => console.log(`Server started, Listening on http://localhost:${port} 
    Endpoints: 
      * GET /errorLogs 
      * GET /errorLogs?limit=:limit&offset=:offset
      * GET /infoLogs 
      * GET /infoLogs?limit=:limit&offset=:offset`));
}