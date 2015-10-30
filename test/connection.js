const chai = require('chai');
const expect = chai.expect;

const dacas = require('../src/dacas.js');

describe('dacas.connect', () => {
    it('should exist', () => {
        expect(dacas).to.exist
            .and.have.property('connect')
            .that.is.a('function');
    });
});
