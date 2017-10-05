'use strict';

var LT = require('../lib/locale-textdomain');
var chai = require('chai');

var expect = chai.expect;

describe('When creating an object', function () {
    var t = new LT;
    describe('before binding a textdomain', function () {
        it("it should be bound to 'assets", function () {
            expect(t.bindtextdomain('foobar')).to.be.equal('assets');
        });
    });
    describe("after binding it to 'js/assets'", function () {
        it('it should use it', function () {
            expect(t.bindtextdomain('foobar', 'js/assets')).to.be.equal('js/assets');
        });
        it('it should remember it', function () {
            expect(t.bindtextdomain('foobar')).to.be.equal('js/assets');
        });
        var t2 = new LT;

        it('it should share it with other instances', function () {
            expect(t2.bindtextdomain('foobar')).to.be.equal('js/assets');
        });
    });
    describe('and binding an undefined textdomain', function () {
        it('it should throw an exception', function () {
            expect(t.bindtextdomain.bind(t))
                .to.throw('undefined or empty textdomain in call to bindtextdomain()');
        });
    });
    describe('and it is empty', function () {
        it('it should throw an exception', function () {
            expect(t.bindtextdomain.bind(t, ''))
                .to.throw('undefined or empty textdomain in call to bindtextdomain()');
        });
    });
});
