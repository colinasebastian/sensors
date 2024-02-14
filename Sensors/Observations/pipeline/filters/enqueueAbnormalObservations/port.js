const filter = require('./implementation');

module.exports = async (input, next) => {
    let result;
    try{
        result = await filter(input);
        await next(null, result);
    }
    catch (err){
        next(err);
    }
};