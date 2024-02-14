const RequestedSensor = {
    esn: { type: String, required: true, maxlength: 16 },
    accessedDate: { type: Number, required: true }
};
module.exports = RequestedSensor;