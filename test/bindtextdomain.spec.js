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
    describe("after binding it 'js/assets'", () => {
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
});
