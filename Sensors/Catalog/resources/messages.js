module.exports = class Messages {
    constructor() {
        this.moduleName = `Catalog`
        this.unauthorized = `Unauthorized access`;
        this.server = `${this.moduleName} server threw error`;
        this.koa = `Koa on ${this.moduleName} server generated error`;
        this.mongo = `${this.moduleName} server's mongo repository couldn't be initialized `
    }
} 