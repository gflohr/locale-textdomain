'use strict';

var LT = require('../lib/locale-textdomain');

describe('When requiring the library', () => {
    var t = new LT();
    it("it should be in the C locale", () => {
        t.setlocale().should.equal('C');
    });
    it('it should allow to override it and return it', () => {
        t.setlocale('fr-FR').should.equal('fr-FR');
    });
    it('it should remember it', () => {
        t.setlocale().should.equal('fr-FR');
    });
});

describe('When using the native environment', () => {
    var t = new LT();
    
    // Clean environment.
    for (var key in process.env) {
        if (process.env.hasOwnProperty(key)
            && key.match(/^LC_/)) {
            delete process.env[key];
        }
    }

    it('it should give LANGUAGE highest precedence', () => {
        process.env.LANG = 'fr_FR';
        process.env.LC_ALL = 'de_DE';
        process.env.LC_MESSAGES = 'fr_FR';
        process.env.LANGUAGE = 'de_AT:de';

        t.setlocale('').should.equal('de_AT');
    });

    it('it should honor LC_ALL', () => {
        delete process.env.LANG;
        process.env.LC_ALL = 'de_DE.UTF-8';
        delete process.env.LC_MESSAGES;
        delete process.env.LANGUAGE;

        t.setlocale('').should.equal('de_DE');
    });
});

