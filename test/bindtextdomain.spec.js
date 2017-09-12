var lt = require('../lib/locale-textdomain');
var chai = require('chai');

chai.expect();

const expect = chai.expect;

describe('When binding a textdomain', () => {
    describe('before binding it', () => {
        it("it should be 'assets", () => {
            expect(lt.use().bindtextdomain('foobar')).to.be.equal('assets');
        });
    });
    describe("after binding it to 'js/assets'", () => {
        var t = lt.use('foobar');
        it('it should use it', () => {
            expect(t.bindtextdomain('foobar', 'js/assets')).to.be.equal('js/assets');
        });
        it('it should remember it', () => {
            expect(t.bindtextdomain('foobar')).to.be.equal('js/assets');
        });
        var t2 = lt.use('foobar');
        it('it should share it with other instances', () => {
            expect(t2.bindtextdomain('foobar')).to.be.equal('js/assets');
        });
    });
    describe('and it is undefined', () => {
        var t = lt.use();
        it('it should throw an exception', () => {
            expect(t.bindtextdomain.bind(t))
                .to.throw('undefined or empty textdomain in call to bindtextdomain()');
        });
    });
    describe('and it is empty', () => {
        it('it should throw an exception', () => {
            var t = lt.use();
            expect(t.bindtextdomain.bind(t, ''))
                .to.throw('undefined or empty textdomain in call to bindtextdomain()');
        });
    });
});
