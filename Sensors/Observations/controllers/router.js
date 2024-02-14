const Router = require('koa-router');
const ObservationController = require('./observationController');

const router = new Router();
const observation = new ObservationController();

router.get('/observations/:id', async (ctx, next) => await observation.list(ctx, next));
router.post('/observations', async (ctx, next) => await observation.save(ctx, next));

module.exports = router;