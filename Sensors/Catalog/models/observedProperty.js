const ObservedProperty = {
    name: { type: String, required: true },
    unit: { type: String, required: true },
    upperLimit: { type: Number, required: true },
    lowerLimit: { type: Number, required: true }
};
module.exports = ObservedProperty;