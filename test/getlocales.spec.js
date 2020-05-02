'use strict';

var LT = require('../lib/locale-textdomain');
var setNativeEnvironment = require('./set-native-environment');
var browser = 'undefined' !== typeof browserTest;

describe('When expanding the list of accepted locales', function() {
    var t = new LT();

    describe('and when requesting automatic conversion', function() {
        setNativeEnvironment(['de_DE', 'de']);
        if (browser) {
            it('it should convert "de_DE" to "de-de" in the browser', function() {
                t.getlocales().should.deep.equal(['de-de', 'de']);
            });
        } else {
            it('it should leave "de_DE" untouched on the server', function() {
                t.getlocales().should.deep.equal(['de_DE', 'de']);
            });
        }
    });
});
