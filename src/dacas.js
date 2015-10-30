"use strict";

const driver = require('cassandra-driver');

var _client;
var _keyspace = '';

var dacas = module.exports = {
    connect: connect
};

function connect (keyspace, options) {
    _keyspace = keyspace;

    return new Promise( (resolve, reject) => {
        let c = new driver.Client(options);
        c.connect( (err, res) => {
            if (err) {
                return reject(err);
            }
            _client = c;
            return resolve(res);
        });
    });
}
