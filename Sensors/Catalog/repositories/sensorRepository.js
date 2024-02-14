const Repository = require('./sensorMongo');

module.exports = class SensorRepository {
    constructor() {
        this.sensorRepository = Repository.Sensor;
    }
    async findAll(limit, offset) {
        var query = this.sensorRepository.find();
        if (limit) {
            query.limit(limit);
        }
        if (offset) {
            query.skip(offset);
        }
        let sensors = await query;
        return sensors.map((sensor) => sensor.toObject());
    }
    async save(data) {
        let sensor = await this.sensorRepository.create(data);
        return sensor.toObject();
    }
    async findById(id) {
        try {
            let sensor = await this.sensorRepository.findOne({ _id: id });
            return sensor ? sensor.toObject() : null;
        } catch (err) {
            return null;
        }
    }
}