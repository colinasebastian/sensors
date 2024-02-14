const Config = require('config');
const Queue = require('bull');
const errorsQueue = new Queue(Config.get('bull.errorsQueueName'));

module.exports.sendLog = async function(message) {
    errorsQueue.add({ data: message })
}