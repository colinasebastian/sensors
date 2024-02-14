const RequestedSensor = require('./requestedSensor')

const Consumer = {
    name: { type: String, required: true },
    purpose: { type: String, required: true },
    guid: { type: String, required: true },
    registerDate: { type: Number, required: true },
    requestedSensors: { type: [RequestedSensor] }
};

module.exports = Consumer;