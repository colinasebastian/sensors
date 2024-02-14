class abnormalObservation {
    constructor(esn, name, standardizedData, detectedTime) {
        this.esn = esn,
            this.name = name,
            this.standardizedData = standardizedData,
            this.detectedTime = detectedTime
    }
};
module.exports = abnormalObservation;