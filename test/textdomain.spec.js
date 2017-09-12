var lt = require('../lib/locale-textdomain');
var chai = require('chai');

chai.expect();

const expect = chai.expect;

describe('When requiring the library', () => {
    describe('and no textdomain was specified', () => {
        it("it should use 'messages'", () => {
            expect(lt.use().textdomain()).to.be.equal('messages');
        });
    });
});
