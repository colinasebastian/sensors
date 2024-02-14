const errorLog = {
    _id: { type: String, required: true },
    timestamp: { type: Date, required: true },
    level: { type: String, required: false },
    message: { type: String, required: true }
};
module.exports = errorLog;