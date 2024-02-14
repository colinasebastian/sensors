const config = require('config');
const mongoose = require('mongoose');
const observation = require('../models/observation.js');
const logProducer = require('../util/logProducer')
const LogMessages = require('../resources/messages');
const logMessages = new LogMessages();
const Schema = mongoose.Schema;

module.exports = class observationMongo {
    constructor() {
        this.connection = null;
    }

    static async connect() {
        this.connection = await mongoose.connect(this.getUrl(), { useNewUrlParser: true });
    }

    static async loadCollections() {
        const observationSchema = new Schema(observation, { id: false });
        observationSchema.set('toObject', {
            transform: function (doc, ret) {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            }
        });
        module.exports.observation = this.connection.model('observation', observationSchema);
    }

    static getUrl() {
        let connectionUrl = config.get('mongo.sensorUrl');
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