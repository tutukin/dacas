"use strict";

const T  = require('./support')({});
const expect = T.expect;
const driver = T.mock('driver');

const dacas = T.inject('dacas.js', {
    'cassandra-driver': driver
});

const keyspace = 'ksname';

describe('dacas.connect(keyspace, options)', () => {
    it('should exist', () => {
        expect(dacas).to.exist
            .and.have.property('connect')
            .that.is.a('function');
    });

    it('should reject with TypeError:KeyspaceRequired if no keyspace is specified', function () {
        let promise = dacas.connect();
        return promise.then(notResolved, error => {
            expect(error).to.be.instanceof(Error)
                .and.have.property('name')
                .that.equals('TypeError');
            expect(error).to.have.property('type')
                .that.equals('KeyspaceRequired');
        });
    });

    context('cassandra is available', () => {
        beforeEach( function () {
            driver.$connectionOK();
        });

        it('should resolve with something usable', () => {
            let promise = dacas.connect(keyspace);
            return expect(promise).to.be.fulfilled;
        });
    });

    context('connection to cassandra fails', () => {
        beforeEach( () => {
            driver.$connectionFail();
        });

        it('should reject with Error.ConnectionFailure', () => {
            let promise = dacas.connect(keyspace);
            return promise.then(notResolved, error => {
                expect(error).to.be.instanceof(Error)
                    .and.have.property('type')
                    .that.is.equal('ConnectionFailure');
            });
        });
    });
});

function notResolved () {
    return Promise.reject(Error('Promise should not be resolved!'));
}
