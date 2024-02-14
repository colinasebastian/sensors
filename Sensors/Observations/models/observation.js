const observation = {
    esn: { type: String, required: true, maxlength: 16 },
    processTime: { type: Number, required: true },
    requestTime: { type: Number, required: true },
    readings: [{
        name: { type: String, required: true },
        unit: { type: String, required: true },
        data: { type: Number, required: true },
        standardizedUnit: { type: String, required: true },
        standardizedData: { type: Number, required: true }
    }]
};
module.exports = observation;