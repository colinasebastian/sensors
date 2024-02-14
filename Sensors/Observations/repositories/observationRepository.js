const Repository = require('./observationMongo');

module.exports = class observationRepository {

    constructor() {
        this.observationRepository = Repository.observation;
    }

    async findAll(begin, end, id) {
        var query = this.observationRepository.find({ requestTime: { $gte: begin, $lte: end }, esn: id }).sort('requestTime');
        let observation = await query;
        return observation.map((observation) => observation.toObject());
    }

    async save(data) {
        let observation = await this.observationRepository.create(data);
        return observation.toObject();
    }
}