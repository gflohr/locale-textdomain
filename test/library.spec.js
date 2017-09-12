var lt = require('../lib/locale-textdomain');
var chai = require('chai');

describe('When requiring the library', () => {
    describe('and no textdomain was specified', () => {
        it("it should use 'messages'", () => {
            expect(lt().td().textdomain()).to.be.equal('messages');
        });
    });
});
