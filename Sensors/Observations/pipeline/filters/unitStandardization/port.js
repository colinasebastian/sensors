const filter = require('./implementation');

module.exports = async (input, next) => {
    let result = await filter(input);
    await next(null, result);
};