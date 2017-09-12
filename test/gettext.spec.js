var lt = require('../lib/locale-textdomain');
var chai = require('chai');

chai.expect();

const expect = chai.expect;

describe('When requesting a missing translation', () => {
    it("it should return the original string", () => {
        expect(lt.use()._('Hello')).to.be.equal('Hello');
    });
});
