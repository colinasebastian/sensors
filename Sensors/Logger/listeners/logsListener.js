const Queue = require('bull');
const Config = require('config');
const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;
require('winston-mongodb');

const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} ${level} : ${message} `
    if (metadata) {
        msg += JSON.stringify(metadata)
    }
    return msg
});

module.exports = class logListener {
    constructor() {
        this.winstonLogger = createLogger({
            level: 'debug',
            format: combine(
                splat(),
                timestamp(),
                logFormat
            ),
            transports: [
                new transports.MongoDB({
                    db: Config.get('mongo.loggerUrl'),
                    options: {
                        useUnifiedTopology: true,
                    },
                    collection: 'logs',
                }),
            ]
        });

        this.listenErrorQueue();
        this.listenInfoQueue();
    }

    async listenErrorQueue() {
        this.ErrorQueue = new Queue(Config.get('bull.errorsQueueName'));
        console.log("Bull listening on queue: " + Config.get('bull.errorsQueueName'));

        this.ErrorQueue.process(async (job, done) => {
            let message = job.data;
            await this.processError(message);
            done();
        });
    }

    async processError(message){
        console.log("Error received: " + message.data);
        await this.winstonLogger.log({
            level: 'error',
            message: message.data.toString()
        });
    };

    async listenInfoQueue() {
        this.InfoQueue = new Queue(Config.get('bull.infoQueueName'));
        console.log("Bull listening on queue: " + Config.get('bull.infoQueueName'));

        this.InfoQueue.process(async (job, done) => {
            let message = job.data;
            await this.processInfo(message);
            done();
        });
    }

    async processInfo(message){
        console.log("Info received: " + message.data);
        await this.winstonLogger.log({
            level: 'info',
            message: message.data.toString()
        });
    };
}