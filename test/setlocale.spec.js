'use strict';

var LT = require('../lib/locale-textdomain');
var chai = require('chai');

chai.expect();

const expect = chai.expect;

describe('When requiring the library', () => {
    var t = new LT();
    it("it should be in the C locale", () => {
        expect(t.setlocale()).to.be.equal('C');
    });
    it('it should allow to override it and return it', () => {
        expect(t.setlocale('fr-FR')).to.be.equal('fr-FR');
    });
    it('it should remember it', () => {
        expect(t.setlocale()).to.be.equal('fr-FR');
    });
});
