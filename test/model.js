"use strict";

const T  = require('./support')({});
const expect = T.expect;
const driver = T.mock('driver');

const dacas = T.inject('dacas.js', {
    'cassandra-driver': driver
});

const keyspace = 'ksname';

describe('dacas.model(modelName)', () => {
    it('should be a function',  () => {
        expect(dacas).to.have.property('model')
            .that.is.a('function');
    });

    it('should throw TypeError:modelNameRequired if modelName is not given', function () {
        expect(() => {
            dacas.model();
        }).to.throw(Error);
    });


    it('should throw Error:ModelUndefined if the model was not defined', function () {
        let modelName = 'Model';
        expect(() => {
            dacas.model(modelName);
        }).to.throw(Error);

    });
});
