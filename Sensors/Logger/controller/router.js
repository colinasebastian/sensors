const KoaRouter = require('koa-router');
const ErrorLoggerController = require('./errorLoggerController');
const InfoLoggerController = require('./infoLoggerController');
const router = new KoaRouter();

const errorLog = new ErrorLoggerController();
const infoLog = new InfoLoggerController();

// Routes
router.get('/errorLogs', async (ctx, next) => await errorLog.list(ctx, next));

router.get('/infoLogs', async (ctx, next) => await infoLog.list(ctx, next));

module.exports = router;