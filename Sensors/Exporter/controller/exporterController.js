const { v4: uuidv4 } = require('uuid');

const config = require('config');
const port = config.get('server.port');
const ExporterService = require('../services/exporterService');
const ObservationInvoker = require('../invokers/observationInvoker');
const { consumer } = require('../repositories/consumerMongo');
const observationInvoker = new ObservationInvoker();
const LogMessages = require('../resources/messages');
const logMessages = new LogMessages();


module.exports = class ExporterController {
    constructor() {
        this.exporterService = new ExporterService();
    }

    async postConsumer(ctx) {
        let data = ctx.request.body;
        data.guid = uuidv4();
        data.registerDate = Date.now();
        const result = await this.exporterService.save(data);
        const url = `http://localhost:${port}/data/${result.guid}/:sensorId`;
        let toReturn = { status: 200, data: url };
        return toReturn;
    }

    async getSensorById(ctx) {
        let guid = ctx.params.guid.toString();
        let esn = ctx.params.esn.toString();
        let start = Date.now();
        let end = Date.now();
        let updatedConsumer = await this.exporterService.findByGuid(guid).then(consumer => {
            if (consumer == null) throw new Error(logMessages.guid);
            start = consumer.registerDate;
            if (consumer.requestedSensors != null && consumer.requestedSensors.length > 0) {
                let sensors = consumer.requestedSensors;
                let sensorHistory = sensors.find(obj => {
                    return obj.esn === esn
                });
                if (sensorHistory != null) {
                    start = sensorHistory.accessedDate;
                    sensorHistory.accessedDate = end;
                }
                else {
                    sensors.push({
                        "esn": esn,
                        "accessedDate": end
                    })
                }
            }
            else {
                consumer.requestedSensors.push({
                    "esn": esn,
                    "accessedDate": end
                })
            }
            return consumer;
        });
        await this.exporterService.updateOne(updatedConsumer.guid, updatedConsumer.requestedSensors);
        const observations = await observationInvoker.getObservations(esn, start, end);
        let toReturn = { status: 200, data: observations.data };
        return toReturn;
    }
}