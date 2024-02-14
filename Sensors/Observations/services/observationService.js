const observationRepository = require('../repositories/observationRepository');

module.exports = class observationService {
    constructor() {
        this.observationRepository = new observationRepository();
    }
    async findAll(begin, end, id) {
        return await this.observationRepository.findAll(begin, end, id);
    }
    async save(data) {
        return await this.observationRepository.save(data);
    }
    async findById(id) {
        return await this.observationRepository.findById(id);
    }

}