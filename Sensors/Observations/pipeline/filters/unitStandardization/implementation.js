const UnitConversion = require('../../../resources/unitConversion');
const unitConversion = new UnitConversion();

module.exports = async function (data) {
    for (let i = 0; i < data.readings.length; i++) {
        let standardizedUnit = data.readings[i].standardizedUnit
        let unit = data.readings[i].unit
        let reading = data.readings[i].data
        data.readings[i]["standardizedData"] = await unitConversion.units[standardizedUnit][unit](reading);
    }
    return data;
}
