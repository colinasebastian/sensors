const axios = require('axios');
const config = require('config');

const observationProxy = config.get('observation.URL');

module.exports = class ObservationInvoker {

    async getObservationWithId(id) {
        return axios.get(observationProxy + `/observations/${id}`);
    }

    async postObservation(body) {
        return axios.post(observationProxy + '/observations', body);
    }
}
