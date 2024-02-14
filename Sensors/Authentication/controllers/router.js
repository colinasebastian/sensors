const KoaRouter = require('koa-router');
const AuthenticationController = require('./authenticationController');

const router = new KoaRouter();
const authentication = new AuthenticationController();

router.post('/login', (ctx, next) => authentication.login(ctx, next));

module.exports = router;