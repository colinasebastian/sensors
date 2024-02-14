const config = require('config');
const mongoose = require('mongoose');
const logger = require('../models/log.js');
const logProducer = require('../util/logProducer')
const LogMessages = require('../resources/messages');
const logMessages = new LogMessages();
const Schema = mongoose.Schema;

module.exports = class loggerMongo {
    constructor() {
        this.connection = null;
    }

    static async connect() {
        this.connection = await mongoose.connect(this.getUrl(), { useNewUrlParser: true });
    }

    static async loadCollections() {
        const logSchema = new Schema(logger, { id: false });
        logSchema.set('toObject', {
            transform: function (doc, ret) {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            }
        });
        module.exports.logger = this.connection.model('log', logSchema);
    }

    static getUrl() {
        let connectionUrl = config.get('mongo.loggerUrl');
        return connectionUrl;
    }

    static async initRepository() {
        try {
            await this.connect();
            await this.loadCollections();
        } catch (err) {
            console.log(`Error trying to connect to database: ${err}`);
            logProducer.sendLog(logMessages.mongo);
        }
    }
}