module.exports = class Messages {
    constructor() {
        this.moduleName = `Exporter`
        this.unauthorized = `Unauthorized access`;
        this.server = `${this.moduleName} server threw error`;
        this.koa = `Koa on ${this.moduleName} server generated error`;
        this.mongo = `${this.moduleName} server's mongo repository couldn't be initialized`;
        this.guid = `Invalid guid, access denied`;
    }
} 