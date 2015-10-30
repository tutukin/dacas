"use strict";

module.exports = function (grunt) {
    const gtx = require('gruntfile-gtx').wrap(grunt);
    const cnf = require('./grunt');

    gtx.loadAuto();

    gtx.config(cnf);

    gtx.alias('default', ['watch']);
    gtx.finalise();
};
