const Queue = require('bull');
const Config = require('config');
const clear_require = require('clear-require');
const nodeMailer = require('nodemailer');

const logProducer = require('../util/logProducer')
const LogMessages = require('../resources/messages');
const logMessages = new LogMessages();

module.exports = class AbnormalObservationListener {
    constructor() {
        this.abnormalObservationQueue = new Queue(Config.get('bull.abnormalObservationsQueueName'));
        console.log("Bull listening on queue" + Config.get('bull.abnormalObservationsQueueName'));

        this.transporter = nodeMailer.createTransport({
            service: Config.get('nodeMailer.service'),
            auth: {
                user: Config.get('nodeMailer.user'),
                pass: Config.get('nodeMailer.password')
            }
        });

        this.abnormalObservationQueue.process(async (job, done) => {
            let message = job.data;
            await this.sendMail(message)
            done();
        });
    }

    async sendMail(message){
        clear_require("../resources/alertList");
        var alertList = require("../resources/alertList").alertList;
        var mailOptions = {
            from: 'youremail@gmail.com',
            to: alertList,
            subject: 'Abnormal observation alert',
            text: `Abnormal sensor activity of the sensor: 
            - ESN: ${message.esn}  
            - Parameter: ${message.name}
            - Reading: ${message.standardizedData}
            - Time: ${new Date(message.detectedTime).toString()}`
        };
        this.transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                logProducer.sendLog(logMessages.abnormal);
                console.log(error);
            } else {
                console.log(`Email sent ${alertList} :` + info.response);
            }
        })
    };
}