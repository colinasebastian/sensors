const Router = require('koa-router');
const SensorController = require('./sensorController');

const router = new Router();
const sensor = new SensorController();

router.get('/sensors', async (ctx, next) => await sensor.list(ctx, next));
router.post('/sensors', async (ctx, next) => await sensor.save(ctx, next));
router.get('/sensors/:id', async (ctx, next) => await sensor.fetch(ctx, next));

module.exports = router;