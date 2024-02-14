const KoaRouter = require('koa-router');
const ExporterController = require('./exporterController');

const router = new KoaRouter();
const exporterController = new ExporterController();

// Routes
router.post('/consumers', async (ctx) => {
    await exporterController.postConsumer(ctx).then(res => {
        ctx.body = { status: res.status, data: res.data };
    })
});

router.get('/data/:guid/:esn', async (ctx) => {
    await exporterController.getSensorById(ctx).then(res => {
        ctx.body = { status: res.status, data: res.data };
    })
});

module.exports = router;