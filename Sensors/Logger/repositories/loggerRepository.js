const Repository = require('./loggerMongo');

module.exports = class loggerRepository {

    constructor() {
        this.loggerRepository = Repository.logger;
    }

    async findAll(limit, offset, type) {
        var query = this.loggerRepository.find({level : type});
        if (limit) {
            query.limit(limit);
        }
        if (offset) {
            query.skip(offset);
        }
        let log = await query;
        return log.map((log) => log.toObject());
    }
}