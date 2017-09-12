'use strict';

var LT = require('../lib/locale-textdomain');
var chai = require('chai');

chai.expect();

const expect = chai.expect;

describe('When creating an object', () => {
    var t = new LT;
    describe('before binding a textdomain', () => {
        it("it should be bound to 'assets", () => {
            expect(t.bindtextdomain('foobar')).to.be.equal('assets');
        });
    });
    describe("after binding it to 'js/assets'", () => {
        it('it should use it', () => {
            expect(t.bindtextdomain('foobar', 'js/assets')).to.be.equal('js/assets');
        });
        it('it should remember it', () => {
            expect(t.bindtextdomain('foobar')).to.be.equal('js/assets');
        });
        var t2 = new LT;

        it('it should share it with other instances', () => {
            expect(t2.bindtextdomain('foobar')).to.be.equal('js/assets');
        });
    });
    describe('and binding an undefined textdomain', () => {
        it('it should throw an exception', () => {
            expect(t.bindtextdomain.bind(t))
                .to.throw('undefined or empty textdomain in call to bindtextdomain()');
        });
    });
    describe('and it is empty', () => {
        it('it should throw an exception', () => {
            expect(t.bindtextdomain.bind(t, ''))
                .to.throw('undefined or empty textdomain in call to bindtextdomain()');
        });
    });
});
