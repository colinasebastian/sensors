
const CatalogInvoker = require('../invokers/catalogInvoker');
const ObservationInvoker = require('../invokers/observationInvoker');
const catalogInvoker = new CatalogInvoker();
const observationInvoker = new ObservationInvoker();

module.exports = class ObservationController {
    async getSensor(data) {
        const id = data.esn;
        return await catalogInvoker.getSensorWithId(id).then(res => {
            data.requestTime = Date.now();
            let properties = res.data.observedProperties;
            for (let i = 0; i < properties.length; i++) {

                let propName = properties[i].name;
                let propUnit = properties[i].unit;
                let propUpper = properties[i].upperLimit;
                let propLower = properties[i].lowerLimit;

                var result = data.readings.find(obj => {
                    return obj.name === propName
                });

                result.standardizedUnit = propUnit;
                result.upperLimit = propUpper;
                result.lowerLimit = propLower;
            }
            return data;
        }).then(async res => {
            let response = await observationInvoker.postObservation(res);
            return response;
        });
    }
}