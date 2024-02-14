module.exports = class Messages {
    constructor() {
        this.moduleName = `Authentication`;
        this.server = `${this.moduleName} server threw error`;
        this.koa = `Koa on ${this.moduleName} server generated error`;
        this.unauthorized = `Unauthorized`;
        this.loginError = `${this.moduleName} server throw an error when trying to login`;
        this.DbConnectionError = `Error trying to connect to database`;
        this.invalidUser = `Invalid user credetials`;
    }
}