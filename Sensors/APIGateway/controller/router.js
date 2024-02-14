const config = require('config');
const usersPermissions = config.get('usersPermissions');
const fs = require('fs');
const publicKey = fs.readFileSync('./config/public.key', 'utf8');
const jwt = require('jsonwebtoken');
const KoaRouter = require('koa-router');
const Messages = require('../resources/messages');
const router = new KoaRouter();
const messages = new Messages();
const logProducer = require('../util/logProducer')

const AnalyticsInvoker = require('../invokers/analyticsInvoker');
const CatalogInvoker = require('../invokers/catalogInvoker');
const LoggerInvoker = require('../invokers/loggerInvoker');
const ObservationInvoker = require('../invokers/observationInvoker');
const analyticsInvoker = new AnalyticsInvoker();
const catalogInvoker = new CatalogInvoker();
const loggerInvoker = new LoggerInvoker();
const observationInvoker = new ObservationInvoker();

const ObservationController = require('./observationController');
const observationController = new ObservationController();

//-------------------------Analytics---------------------------
router.get('/analytics/:id', async (ctx) => {
    const permission = hasPermission(ctx, usersPermissions.analytics);
    if (permission.status == "success") {
        const id = ctx.params.id.toString();
        let name = ctx.query.name;
        let start = Date.parse(ctx.query.start) || Date.now();
        let end = Date.parse(ctx.query.end) || 0;
        let format = ctx.query.format || "month";
        await analyticsInvoker.getSensorAnalytics(id, name, start, end, format).then(res => {
            ctx.body = { status: res.status, data: res.data };
        })
    } else {
        logProducer.sendInfoLog(permission.message);
        ctx.status = 403;
        ctx.body = { status: 403, message: permission.message };
    }
});
//-------------------------Analytics---------------------------

//--------------------------Catalog----------------------------
router.get('/sensors', async (ctx) => {
    const permission = hasPermission(ctx, usersPermissions.catalog);
    if (permission.status == "success") {
        await catalogInvoker.getSensors(ctx.request.body).then(res => {
            ctx.body = { status: res.status, data: res.data };
        })
            .catch(error => { throw new Error(error.response.data.message) });
    } else {
        logProducer.sendInfoLog(permission.message);
        ctx.status = 403;
        ctx.body = { status: 403, message: permission.message };
    }
});

router.post('/sensors', async (ctx) => {
    const permission = hasPermission(ctx, usersPermissions.catalog);
    if (permission.status == "success") {
        await catalogInvoker.postSensor(ctx.request.body).then(res => {
            ctx.body = { status: res.status, data: res.data };
        })
            .catch(error => { throw new Error(error.response.data.message) });
    } else {
        logProducer.sendInfoLog(permission.message);
        ctx.status = 403;
        ctx.body = { status: 403, message: permission.message };
    }
});

router.get('/sensors/:id', async (ctx) => {
    const permission = hasPermission(ctx, usersPermissions.catalog);
    if (permission.status == "success") {
        const id = ctx.params.id.toString();
        await catalogInvoker.getSensorWithId(id).then(res => {
            ctx.body = { status: res.status, data: res.data };
        })
            .catch(error => { throw new Error(error.response.data.message) });
    } else {
        logProducer.sendInfoLog(permission.message);
        ctx.status = 403;
        ctx.body = { status: 403, message: permission.message };
    }
});
//--------------------------Catalog----------------------------

//--------------------------Logger-----------------------------
router.get('/errorLogs', async (ctx) => {
    const permission = hasPermission(ctx, usersPermissions.logger);
    if (permission.status == "success") {
        await loggerInvoker.getErrorLogs(ctx.request.body).then(res => {
            ctx.body = { status: res.status, data: res.data };
        })
            .catch(error => { throw new Error(error.response.data.message) });
    } else {
        logProducer.sendInfoLog(permission.message);
        ctx.status = 403;
        ctx.body = { status: 403, message: permission.message };
    }
});

router.get('/infoLogs', async (ctx) => {
    const permission = hasPermission(ctx, usersPermissions.logger);
    if (permission.status == "success") {
        await loggerInvoker.getInfoLogs(ctx.request.body).then(res => {
            ctx.body = { status: res.status, data: res.data };
        })
            .catch(error => { throw new Error(error.response.data.message) });
    } else {
        logProducer.sendInfoLog(permission.message);
        ctx.status = 403;
        ctx.body = { status: 403, message: permission.message };
    }
});
//--------------------------Logger-----------------------------

//--------------------------Observation------------------------
router.get('/observations/:id', async (ctx) => {
    const permission = hasPermission(ctx, usersPermissions.observations);
    if (permission.status == "success") {
        const id = ctx.params.id.toString();
        await observationInvoker.getObservationWithId(id).then(res => {
            ctx.body = { status: res.status, data: res.data };
        })
            .catch(error => { throw new Error(error.response.data.message) });
    } else {
        logProducer.sendInfoLog(permission.message);
        ctx.status = 403;
        ctx.body = { status: 403, message: permission.message };
    }
});

router.post('/observations', async (ctx) => {
    await observationController.getSensor(ctx.request.body).then(async res => {
        ctx.body = { status: res.status, data: res.data };
    })
        .catch(error => { throw new Error(error.response.data.message) });
});
//--------------------------Observation------------------------

function hasPermission(ctx, permissions) {
    if (ctx.request.header.authorization) {
        const token = ctx.request.header.authorization;
        try {
            const decodedUser = jwt.verify(token, publicKey);
            if (permissions.includes(decodedUser.type)) {
                return { status: "success" };
            } else {
                return { status: "fail", message: messages.unauthorized };
            }
        } catch (error) {
            return { status: "fail", message: messages.invalidToken };
        }
    } else {
        return { status: "fail", message: messages.noAuthorizationHeader };
    }
}

module.exports = router;