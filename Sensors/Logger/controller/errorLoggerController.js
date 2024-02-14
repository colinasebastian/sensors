const errorLoggerService = require('../services/errorLoggerService');

module.exports = class ErrorLoggerController {
    constructor() {
        this.errorLoggerService = new errorLoggerService();
    }
    async list(ctx, next) {
        let limit = parseInt(ctx.query.limit) || 100;
        let offset = parseInt(ctx.query.offset) || 0;
        let list = (await this.errorLoggerService.findAll(limit, offset)) || [];
        ctx.body = { offset: offset, limit: limit, size: list.length, data: list };
        await next();
    }
}