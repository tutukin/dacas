"use strict";

const driver = require('cassandra-driver');
const E = require('./Error');
var _client;
var _keyspace = '';
var _schema = {};

var dacas = module.exports = {
    connect: connect,
    schema: schema,
    model: model
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

function schema (modelName, modelDescription) {
    if ( typeof modelName !== 'string' ) throw E.typeError('modelNameRequired', 'Model name required');
    if ( modelName in _schema ) throw E.error('SchemaExists', `Schema ${modelName} is already defined`);

    _schema[modelName] = modelDescription;
}

function model (modelName) {
    if ( typeof modelName !== 'string' ) throw E.typeError('modelNameRequired', 'Model name required');
    if ( ! (modelName in _schema) ) throw E.error('ModelUndefined', `Model ${modelName} is not defined`);
}
