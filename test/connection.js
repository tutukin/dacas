"use strict";

const T  = require('./support')({});
const expect = T.expect;
const driver = T.mock('driver');

const dacas = T.inject('dacas.js', {
    'cassandra-driver': driver
});

describe('dacas.connect()', () => {
    it('should exist', () => {
        expect(dacas).to.exist
            .and.have.property('connect')
            .that.is.a('function');
    });

    context('cassandra is available', () => {
        beforeEach( function () {
            driver.$connectionOK();
        });

        it('should resolve with something usable', () => {
            let promise = dacas.connect();
            return expect(promise).to.be.fulfilled;
        });
    });
});
