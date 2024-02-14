const sensorRepository = require('../repositories/sensorRepository');

module.exports = class sensorService {
    constructor() {
        this.sensorRepository = new sensorRepository();
    }
    async findAll(limit, offset) {
        return await this.sensorRepository.findAll(limit, offset);
    }
    async save(data) {
        return await this.sensorRepository.save(data);
    }
    async findById(id) {
        return await this.sensorRepository.findById(id);
    }
}