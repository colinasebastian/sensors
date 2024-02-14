module.exports = class Messages {
    constructor() {
        this.moduleName = `API Gateway`
        this.unauthorized = `Unauthorized access`;
        this.noAuthorizationHeader = `Please authenticate and provide an authentication header with the providen token`;
        this.invalidToken = `Please provide a valid token`;
        this.server = `${this.moduleName} server threw error`;
        this.koa = `Koa on ${this.moduleName} server generated error`;
    }
}