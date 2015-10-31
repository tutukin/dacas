"use strict";

const T  = require('./support')({});
const expect = T.expect;
const driver = T.mock('driver');

const dacas = T.inject('dacas.js', {
    'cassandra-driver': driver
});

const keyspace = 'ksname';

describe('dacas.schema(modelName, modelDescription)', () => {
    it('should be a function', () => {
        expect(dacas.schema).to.be.a('function');
    });

    it('should throw TypeError:modelNameRequired if no modelName is provided', function () {
        expect( () => {
            dacas.schema();
        }).to.throw(Error);
    });

    it('should throw Error:SchemaExists if the schema for modelName is already defined', function () {
        let modelName = 'Model';
        let modelDescription = {};

        dacas.schema(modelName, modelDescription);

        expect(() => {
            dacas.schema(modelName, modelDescription);
        }).to.throw(Error);
    });
});
