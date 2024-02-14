const config = require('config');
const mongoose = require('mongoose');
const consumer = require('../models/consumer.js');
const logProducer = require('../util/logProducer')
const LogMessages = require('../resources/messages');
const logMessages = new LogMessages();
const Schema = mongoose.Schema;

module.exports = class consumerMongo {
    constructor() {
        this.connection = null;
    }

    static async connect() {
        this.connection = await mongoose.connect(this.getUrl(), { useNewUrlParser: true });
    }

    static async loadCollections() {
        const consumerSchema = new Schema(consumer, { id: false });
        consumerSchema.set('toObject', {
            transform: function (doc, ret) {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            }
        });
        module.exports.consumer = this.connection.model('consumer', consumerSchema);
    }

    static getUrl() {
        let connectionUrl = config.get('mongo.consumerUrl');
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