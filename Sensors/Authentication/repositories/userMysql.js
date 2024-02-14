const config = require('config');
const Sequelize = require('sequelize');
const User = require("../models/user");
const ErrorMessages = require('../resources/messages');
const logProducer = require('../util/logProducer')

module.exports = class UserMysql {

    constructor() {
        this.connection = null;
        this.errorMessages = new ErrorMessages();
    }

    static async connect() {
        const databaseConfiguration = config.get('mysql');
        this.connection = new Sequelize(databaseConfiguration.database,
            databaseConfiguration.user, databaseConfiguration.password, databaseConfiguration.options);
    }

    static async loadModels() {
        const user = User(this.connection, Sequelize);
        module.exports.User = user;
        return this.connection.sync();
    }

    static async initRepository() {
        try {
            await this.connect();
            await this.loadModels();
        } catch (err) {
            logProducer.sendErrorLog(this.errorMessages.DbConnectionError)
            throw new Error(this.errorMessages.DbConnectionError);
        }
    }
}