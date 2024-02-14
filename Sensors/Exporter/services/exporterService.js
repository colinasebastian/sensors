const consumerRepository = require('../repositories/consumerRepository');

module.exports = class exporterService {
    constructor() {
        this.consumerRepository = new consumerRepository();
    }
    async save(data) {
        return await this.consumerRepository.save(data);
    }
    async findByGuid(id) {
        return await this.consumerRepository.findByGuid(id);
    }
    async updateOne(guid, requestedSensors) {
        return await this.consumerRepository.updateOne(guid, requestedSensors);
    }
}