const errorLoggerRepository = require('../repositories/loggerRepository');

module.exports = class ErrorLoggerService {
    constructor() {
        this.errorLoggerRepository = new errorLoggerRepository();
    }
    async findAll(limit, offset) {
        return await this.errorLoggerRepository.findAll(limit, offset, 'error');
    }
}