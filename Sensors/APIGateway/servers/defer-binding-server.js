var config = require('config');

function deferBinding() {
    let type = config.get('defer-binding-server.server') || 'http-server';
    let implementation;
    try {
        implementation = require(`./${type}-server`);
    } catch (err) {
        // Use default implementation
        implementation = require('./http-server');
    }
    return implementation;
}

module.exports = deferBinding();