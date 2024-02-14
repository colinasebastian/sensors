const axios = require('axios');
const config = require('config');

const catalogProxy = config.get('catalog.URL');

module.exports = class CatalogInvoker {

    async getSensors(body) {
        return axios.get(catalogProxy + '/sensors', body);
    }

    async postSensor(body) {
        return axios.post(catalogProxy + '/sensors', body);
    }

    async getSensorWithId(id) {
        return axios.get(catalogProxy + `/sensors/${id}`);
    }
}
