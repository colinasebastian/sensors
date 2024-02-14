const ObservedProperty = require('./observedProperty')

const Sensor = {
    _id: { type: String, required: true, alias: 'esn' },
    model: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    observedProperties: { type: [ObservedProperty], validate: [(value) => value.length > 0, 'No outputs'] }
};

module.exports = Sensor;