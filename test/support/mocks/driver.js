"use strict";
const sinon = require('sinon');

module.exports = function (options) {
    let connectionOK;

    return {
        // Mock control interface
        $connectionOK: () => { connectionOK = true; },
        $connectionFail: () => { connectionOK = false; },

        // Mock interface
        Client: Client
    };


    function Client ( options ) {
        this.connect = (cb) => {
            if ( typeof connectionOK === 'undefined' ) throw Error('Undefined connection behaviour');
            let err, res;
            if (connectionOK) {
                res = {};
            }
            else {
                err = Error('connection error');
            }
            connectionOK = undefined;
            process.nextTick( cb.bind(null, err, res));
        };
    }
};
