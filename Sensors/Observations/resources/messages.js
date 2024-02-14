module.exports = class Messages {
    constructor() {
        this.moduleName = `Observations`
        this.unauthorized = `Unauthorized access`;
        this.server = `${this.moduleName} server threw error`;
        this.koa = `Koa on ${this.moduleName} server generated error`;
        this.abnormalObservation = `Abnormal observations pipeline error`;
        this.unitConversion = `Unit conversion pipeline error`;
        this.pipe = `${this.moduleName} server's pipe and filters threw error `
        this.mongo = `${this.moduleName} server's mongo repository couldn't be initialized `
    }
} 