"use strict";

const driver = require('cassandra-driver');
const E = require('./Error');
var _client;
var _keyspace = '';

var dacas = module.exports = {
    connect: connect
};

function connect (keyspace, options) {
    if ( typeof keyspace !== 'string' ) {
        let err = E.typeError('KeyspaceRequired', 'Provide keyspace name');
        return Promise.reject(err);
    }
    
    _keyspace = keyspace;

    return new Promise( (resolve, reject) => {
        let c = new driver.Client(options);
        c.connect( (err, res) => {
            if (err) {
                return reject(E.wrapError(err, 'ConnectionFailure'));
            }
            _client = c;
            return resolve(res);
        });
    });
}
