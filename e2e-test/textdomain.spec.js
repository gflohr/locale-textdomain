'use strict';

var LT = LocaleTextdomain;

describe('When requiring the library', function() {
    describe('and no textdomain was specified', function() {
        var t1 = new LT();
        it("it should use 'messages'", function() {
            expect(t1.textdomain()).to.be.equal('messages');
        });
    });
    describe('and a textdomain was specified', function() {
        var t2 = new LT('old');
        it('it should use it', function() {
            expect(t2.textdomain()).to.be.equal('old');
        });
        it('it should allow to override it and return it', function() {
            expect(t2.textdomain('new')).to.be.equal('new');
        });
        it('it should remember it', function() {
            expect(t2.textdomain()).to.be.equal('new');
        });
    });
});
