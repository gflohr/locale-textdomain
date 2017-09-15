'use strict';

var parseMO = require('./src/parse-mo.js');
var fs = require('fs');

fs.readFile('ru.gmo', function(err, content) {
    if (err) {
        return console.log(err);
    }

    parseMO(content, function(err, data) {
        if (err) {
            return console.log(err);
        }

        console.log("Successfully read ru.gmo:");
        console.log(data);
    })
});
