const Repository = require('./consumerMongo');

module.exports = class consumerRepository {

    constructor() {
        this.repository = Repository.consumer;
    }

    async findByGuid(guid) {
        try {
            let consumer = await this.repository.findOne({ guid: guid });
            return consumer ? consumer.toObject() : null;
        } catch (err) {
            return null;
        }
    }

    async save(data) {
        let consumer = await this.repository.create(data);
        return consumer.toObject();
    }

    async updateOne(guid, requestedSensors) {
        let consumer = await this.repository.updateOne(
            { guid: guid },
            {
                $set:
                {
                    requestedSensors: requestedSensors
                }
            }
        );
        return consumer;
    }
}