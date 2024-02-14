
const Config = require('config');
const Queue = require('bull');
const Validation = require('../../../resources/' + Config.get('validationType'));
const validation = new Validation();
const abnormalObservationsQueue = new Queue(Config.get('bull.abnormalObservationsQueueName'));
const AbnormalObservation = require('../../../models/abnormalObservation');

module.exports = async function (data) {
    for (let i = 0; i < data.readings.length; i++) {
        let standardizedData = data.readings[i].standardizedData;
        let upperLimit = data.readings[i].upperLimit;
        let lowerLimit = data.readings[i].lowerLimit;
        if (!validation.isValid(standardizedData, upperLimit, lowerLimit)) {
            let esn = data.esn;
            let readingName = data.readings[i].name;
            let now = Date.now();
            let abnormalObservation = new AbnormalObservation(esn, readingName, standardizedData, now);
            await abnormalObservationsQueue.add(abnormalObservation);
        }
    }
    return data;
}