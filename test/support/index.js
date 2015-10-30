"use strict";
const path = require('path');
const chai = require('chai');

//chai.use( require('sinon-chai') );
chai.use( require('chai-as-promised') );

const proxyquire = require('proxyquire').noCallThru();

const mock = require('./mock');

module.exports = function (base) {
    base.expect = chai.expect;
    base.mock = mock;
    base.expect = chai.expect;

    base.inject = (moduleName, deps) => proxyquire(toPath(moduleName), deps);

    return base;
};


function toPath (name) {
    return path.resolve(__dirname,'..', '..', 'src', name);
}
