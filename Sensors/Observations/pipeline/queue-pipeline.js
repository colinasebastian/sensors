const EventEmitter = require('events');
const Util = require('util');
const Queue = require('bull');

class QueuePipeline {
    constructor() {
        this.filters = [];
        EventEmitter.call(this);
        Util.inherits(QueuePipeline, EventEmitter);
        this.initialized = false;
        this.queues = [];
    }
    use(filter, name, processes) {
        let options = {
            attempts: 2,
            removeOnComplete: false,
            removeOnFail: false
        }
        var queue = new Queue(name, options);
        queue.on('failed', async function (job, error) {
            console.log(error.message);
        });
        queue.on('error', function (error) {
            console.log(error.message);
        });
        this.queues.push([queue, processes]);
        return this.filters.push(filter);
    }
    run(input) {
        try {
            if (this.queues.length > 0) {
                let queue = this.queues[0][0];
                queue.add(input, { removeOnComplete: true });
            }
        }
        catch (e){
            throw new Error(e.message);
        }
    }
    initializeQueue() {
        for (let i = 0; i < this.queues.length; i++) {
            let queue = this.queues[i][0];
            let processes = this.queues[i][1];
            let filter = this.filters[i];
            let next = (this.queues.length !== i + 1) ? this.queues[i + 1][0] : null;
            try {
                queue.process(processes, (job, done) => {
                    filter.call(this, job.data, (err, result) => {
                        if (err) {
                            this.emit('error', err);
                            this.emit('end', err);
                            done(err);
                        } else {
                            if (next) {
                                next.add(result, { removeOnComplete: true });
                            }
                            done();
                        }
                    });
                });
                if (!next) {
                    queue.on('completed', (job) => {
                        this.emit('end', job.data);
                    });
                }
            }
            catch (e){
                throw new Error(e.message);
            }
        }
        this.initialized = true;
    }
}

module.exports = QueuePipeline;