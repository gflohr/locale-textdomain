'use strict';

var LT = require('../lib/locale-textdomain');
var chai = require('chai');

chai.expect();

const expect = chai.expect;

describe('When requiring the library', () => {
    describe('and no textdomain was specified', () => {
        var t1 = new LT();
        it("it should use 'messages'", () => {
            expect(t1.textdomain()).to.be.equal('messages');
        });
    });
    describe('and a textdomain was specified', () => {
        var t2 = new LT('old');
        it('it should use it', () => {
            expect(t2.textdomain()).to.be.equal('old');
        });
        it('it should allow to override it and return it', () => {
            expect(t2.textdomain('new')).to.be.equal('new');
        });
        it('it should remember it', () => {
            expect(t2.textdomain()).to.be.equal('new');
        });
    });
});
