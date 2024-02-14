const observationService = require('../services/observationService');
const Pipeline = require('../pipeline/queue-pipeline');
const Config = require('config');
const filterUnitStandardization = require('../pipeline/filters/unitStandardization/port');
const filterEnqueueAbnormalObservations = require('../pipeline/filters/enqueueAbnormalObservations/port');
const filterSaveObservation = require('../pipeline/filters/saveObservation/port');
const pipeline = new Pipeline();

module.exports = class observationController {
    constructor() {
        this.observationService = new observationService();
        pipeline.use(filterUnitStandardization,
            Config.get('pipes.unitStandardizationName'),
            Config.get('pipes.unitStandardizationProcesses'));
        pipeline.use(filterEnqueueAbnormalObservations,
            Config.get('pipes.enqueueAbnormalObservationsName'),
            Config.get('pipes.enqueueAbnormalObservationsProcesses'));
        pipeline.use(filterSaveObservation,
            Config.get('pipes.saveObservationName'),
            Config.get('pipes.saveObservationProcesses'));
        pipeline.initializeQueue();

        pipeline.on('error', (err) => {
            console.log(`The error is ${err}`);
        });

    }
    async list(ctx, next) {
        let id = ctx.params.id;
        let begin = ctx.query.begin || 0;
        let end = ctx.query.end || Date.now();
        let list = (await this.observationService.findAll(begin, end, id)) || [];
        ctx.body = { id: id, begin: begin, end: end, size: list.length, data: list };
        await next();
    }

    async save(ctx, next) {
        let data = ctx.request.body;

        pipeline.run(data);
        ctx.body = await this.waitResponse();

        pipeline.on('end', async (result) => {
            if (result) {
            } else {
                ctx.status = 400;
                ctx.body = { status: 400, message: `Invalid observation data` };
            }
        });

        await next();
    }

    async fetch(ctx, next) {
        let id = ctx.params.id;
        let observation = await this.observationService.findById(id);
        if (observation) {
            ctx.body = observation;
        } else {
            ctx.status = 404;
            ctx.body = { status: 404, message: `observation #${id} not found` };
        }
        await next();
    }

    async waitResponse() {
        let pipe = pipeline;
        return new Promise(function (resolve, reject) {
            pipe.on('end', async (result) => {
                if (result) {
                    await resolve(result);
                }
            });
        })
    }
}