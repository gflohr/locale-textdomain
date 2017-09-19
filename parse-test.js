'use strict';

var parseMO = require('./src/parse-mo.js');
var fs = require('fs');
var filename = 'ru.gmo';
filename = '/opt/local/share/locale/nl/LC_MESSAGES/wget.mo';
var content = fs.readFileSync(filename, null);
var data = parseMO(content);
console.log(data);
