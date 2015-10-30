"use strict";

const rd = require('require-directory');
const Mocks = rd(module, 'mocks');

const getter = module.exports = function (mockName, options) {
    if ( ! (mockName in Mocks) ) throw Error(`Mock «${mockName}» is not defined`);

    let mock = Mocks[mockName];
    if ( typeof mock !== 'function' ) throw Error(`Mock «${mockName}» is incorrectly defined: must be a function, not a ${typeof mock}`);

    options = options || {};
    options._getter = getter;

    return mock(options);
};
