const Config = require('config');
const Queue = require('bull');
const errorsQueue = new Queue(Config.get('bull.errorsQueueName'));
const infoQueue = new Queue(Config.get('bull.infoQueueName'));

module.exports.sendErrorLog = async function (message) {
    errorsQueue.add({ data: message })
}

module.exports.sendInfoLog = async function (message) {
    infoQueue.add({ data: message })
}