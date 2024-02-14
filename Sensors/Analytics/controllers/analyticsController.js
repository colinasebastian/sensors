const ObservationInvoker = require('../invokers/observationInvoker');
const observationInvoker = new ObservationInvoker();
const LogMessages = require('../resources/messages');
const logMessages = new LogMessages();

module.exports = class AnalyticsController {

    async getAverage(ctx, next) {
        let id = ctx.params.id.toString();
        let name = ctx.query.name;
        let start = parseInt(ctx.query.start);
        let end = parseInt(ctx.query.end);
        let format = ctx.query.format || "month";
        const res = await observationInvoker.getObservations(id, start, end);
        const new_list = await this.processList(ctx, res, id, name, start, end, format);
        ctx.body = { esn: id, start: start, end: end, size: new_list.length, data: new_list };
        await next();
    }

    async processList(ctx, res, id, name, start, end, format) {
        let list = res.data.data;
        if (Object.entries(list).length === 0) throw new Error(logMessages.sensor);
        let new_list = [];
        if (format == "day") {
            let item = 0;
            for (let i = start; i < end; i = i + 60 * 60 * 24 * 1000) {
                let valueDay = 0;
                let counter = 0;
                while (item < list.length && list[item].requestTime >= i && list[item].requestTime < i + 60 * 60 * 24 * 1000) {
                    let reading = list[item].readings.find(obj => {
                        return obj.name === name
                    });
                    if (reading == null) throw new Error(logMessages.observation);
                    valueDay += reading.standardizedData;
                    counter++;
                    item++;
                }
                let dataData = new Date(i);
                new_list.push({ key: dataData.getFullYear() + "-" + (dataData.getMonth() + 1) + "-" + (dataData.getDate()), value: counter == 0 ? 0 : valueDay / counter });
                if (new_list.length > 364) break;
            }
        }
        else if (format == "month") {
            let item = 0;
            let year = new Date(start).getFullYear();
            let month = new Date(start).getMonth() + 1;
            let monthDays = new Date(year, month, 0).getDate();
            for (let i = start; i < end; i = i + 60 * 60 * 24 * 1000 * monthDays) {
                let valueMonth = 0;
                let counter = 0;
                while (item < list.length && list[item].requestTime >= i && list[item].requestTime < i + 60 * 60 * 24 * 1000 * monthDays) {
                    let reading = list[item].readings.find(obj => {
                        return obj.name === name
                    });
                    valueMonth += reading.standardizedData;
                    counter++;
                    item++;
                }
                let dataData = new Date(i);
                new_list.push({ key: dataData.getFullYear() + "-" + (dataData.getMonth() + 1), value: counter == 0 ? 0 : valueMonth / counter });
                month = month == 12 ? year++ : month++;
                monthDays = new Date(year, month, 0).getDate();
                if (new_list.length > 119) break;
            }
        }
        else if (format == "year") {
            let item = 0;
            for (let i = start; i < end; i = i + 60 * 60 * 24 * 1000 * 365) {
                let valueYear = 0;
                let counter = 0;
                while (item < list.length && list[item].requestTime >= i && list[item].requestTime < i + 60 * 60 * 24 * 1000 * 365) {
                    let reading = list[item].readings.find(obj => {
                        return obj.name === name
                    });
                    valueYear += reading.standardizedData;
                    counter++;
                    item++;
                }
                let dataData = new Date(i);
                new_list.push({ key: dataData.getFullYear(), value: counter == 0 ? 0 : valueYear / counter });;
            }
        }
        return new_list;
    }
}