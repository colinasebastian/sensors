const AuthenticationService = require('../services/authenticationService');
const Messages = require('../resources/messages');
const logProducer = require('../util/logProducer')
module.exports = class AuthenticationController {

    constructor() {
        this.authenticationService = new AuthenticationService();
        this.messages = new Messages();
    }

    async login(ctx, next) {
        try {
            let email = ctx.request.body.email;
            let password = ctx.request.body.password;
            let token = await this.authenticationService.login(email, password);
            if (token) {
                ctx.body = { token: token };
            } else {
                logProducer.sendInfoLog(this.messages.unauthorized);
                ctx.status = 401;
                ctx.body = { status: 401, message: this.messages.unauthorized };
            }
            await next();
        } catch (e) {
            throw new Error(this.messages.loginError);
        }
    }

}