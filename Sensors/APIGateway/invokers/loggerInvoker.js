const axios = require('axios');
const config = require('config');

const loggerProxy = config.get('logger.URL');

module.exports = class LoggerInvoker {

    async getErrorLogs(body) {
        return axios.get(loggerProxy + '/errorLogs', body);
    }

    async getInfoLogs(body) {
        return axios.get(loggerProxy + '/infoLogs', body);
    }
}
