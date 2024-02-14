const ObservationService = require('../../../services/observationService');
const observationService = new ObservationService();

module.exports = async function (data) {
    data['processTime'] = (Date.now() - data.requestTime) / 1000;
    let observation = await observationService.save(data);
    return observation;
}
