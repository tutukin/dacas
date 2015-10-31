"use strict";

module.exports = {
    wrapError: wrapError,
    typeError: typeError
};

function wrapError (err, type) {
    err.type = type;
    return err;
}

function typeError (type, message) {
    let err = Error(message);
    err.name = 'TypeError';
    err.type = type;
    return err;
}
