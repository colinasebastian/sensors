const axios = require('axios');
const config = require('config');

const observationProxy = config.get('observation.URL');

module.exports = class ObservationInvoker {
    async getObservations(id, begin, end) {
        return await axios.get(observationProxy + `/observations/${id}?begin=${begin}&end=${end}`);
    }
}
