module.exports = class Messages {
    constructor() {
        this.moduleName = `Analytics`
        this.unauthorized = `Unauthorized access`;
        this.server = `${this.moduleName} server threw error`;
        this.koa = `Koa on ${this.moduleName} server generated error`;
        this.mongo = `${this.moduleName} server's mongo repository couldn't be initialized `;
        this.abnormal = `${this.moduleName} server's abnormal observations queue couldn't send mail `;
        this.observation = `The requested observation isn't valid for the sensor`;
        this.sensor = `The requested sensor isn't valid`;
    }
} 