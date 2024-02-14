const UserMysql = require('../repositories/userMysql');
const InfoMessages = require('../resources/messages');
const logProducer = require('../util/logProducer')

module.exports = class UserRepository {

    constructor() {
        this.userRepositoryMysql = UserMysql.User;
        this.infoMessages = new InfoMessages();
    }

    async validateEmailAndPassword(email, password) {
        let result = await this.userRepositoryMysql.findOne({ where: { email: email, password: password } });
        if (!result) {
            let invalidUserError = new Error(this.infoMessages.invalidUser);
            invalidUserError.status = 400;
            logProducer.sendInfoLog(this.infoMessages.invalidUser + `${email} - ${password}`);
            throw invalidUserError;
        }
        return result.type;
    }

}