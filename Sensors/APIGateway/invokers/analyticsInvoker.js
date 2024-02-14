const axios = require('axios');
const config = require('config');

const analyticsProxy = config.get('analytics.URL');

module.exports = class AnalyticsInvoker {

    async getSensorAnalytics(id, name, start, end, format) {
        console.log(`/analytics/${id}?name=${name}&start=${start}&end=${end}&format=${format}`);
        return axios.get(analyticsProxy + `/analytics/${id}?name=${name}&start=${start}&end=${end}&format=${format}`);
    }
}
