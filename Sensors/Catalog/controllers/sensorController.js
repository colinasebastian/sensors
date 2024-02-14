const sensorService = require('../services/sensorService');

module.exports = class sensorController {
    constructor() {
        this.sensorService = new sensorService();
    }
    async list(ctx, next) {
        let limit = parseInt(ctx.query.limit) || 100;
        let offset = parseInt(ctx.query.offset) || 0;
        let list = (await this.sensorService.findAll(limit, offset)) || [];
        ctx.body = { offset: offset, limit: limit, size: list.length, data: list };
        await next();
    }
    async save(ctx, next) {
        let data = ctx.request.body;
        let sensor = await this.sensorService.save(data);
        if (sensor) {
            ctx.body = sensor;
        } else {
            ctx.status = 400;
            ctx.body = { status: 400, message: `Invalid sensor data` };
        }
        await next();
    }
    async fetch(ctx, next) {
        let id = ctx.params.id;
        let sensor = await this.sensorService.findById(id);
        if (sensor) {
            ctx.body = sensor;
        } else {
            ctx.status = 404;
            ctx.body = { status: 404, message: `sensor #${id} not found` };
        }
        await next();
    }
}