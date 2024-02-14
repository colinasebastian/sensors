const KoaRouter = require('koa-router');
const AnalyticsController = require('./analyticsController');

const router = new KoaRouter();
const analytics = new AnalyticsController();

router.get('/analytics/:id', async (ctx, next) => {
    await analytics.getAverage(ctx, next);
});

module.exports = router;