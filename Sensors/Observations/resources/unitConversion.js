module.exports = class UnitConversion {
    constructor() {
        this.units = {
            'km/h': { 'm/s': (a) => { return a * 3.6 }, 'knots': (a) => { return a * 1.852 }, 'miles/h': (a) => { return a * 1.60934 }, 'km/h': (a) => { return a } },
            'km/s': { 'm/s': (a) => { return a * 1000 }, 'knots': (a) => { return a * 1943.84 }, 'miles/s': (a) => { return a * 0.000621371 }, 'km/s': (a) => { return a } },
            'pm2.5': { 'pm10': (a) => { return a * 0.75 }, 'pm2.5': (a) => { return a } },
            'celsius': { 'fahrenheit': (a) => { return (a - 32) * (5 / 9) }, 'kelvin': (a) => { return a - 273.15 }, 'celsius': (a) => { return a } },
            'bar': { 'pascal': (a) => { return a / 10000 }, 'bar': (a) => { return a }  }
        }
    }
}