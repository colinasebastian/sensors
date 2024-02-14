const config = require('config');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const secretKey = fs.readFileSync('./config/private.key', 'utf8');
const UserRepository = require('../repositories/userRepository');

module.exports = class AuthenticationService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async login(email, password) {
        let type = await this.userRepository.validateEmailAndPassword(email, password);
        var credentials = config.get('credentials');
        var signOptions = config.get('signOptions');
        var token = null;
        token = jwt.sign({ email: email, type: type, permissions: credentials.permissions.join(",") }, secretKey, signOptions);
        return token;
    }
}