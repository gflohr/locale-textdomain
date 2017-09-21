'use strict';

function readLocation(path, callback) {
    if (typeof window === 'undefined') {
        var fs = require('fs');
        fs.readFile(path, null, callback);
    } else {
        throw new Error("not yet implemented");
    }
}

module.exports = readLocation;
