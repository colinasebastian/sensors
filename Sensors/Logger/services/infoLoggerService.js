const infoLoggerRepository = require('../repositories/loggerRepository');

module.exports = class InfoLoggerService {
    constructor() {
        this.infoLoggerRepository = new infoLoggerRepository();
    }
    async findAll(limit, offset) {
        return await this.infoLoggerRepository.findAll(limit, offset, 'info');
    }
}