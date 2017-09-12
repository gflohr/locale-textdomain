var lt = require('../lib/locale-textdomain');
var chai = require('chai');

chai.expect();

const expect = chai.expect;

describe('When requesting a plural form', () => {
    var t = lt.use();

    it("it should return the singular for a single item", () => {
        expect(lt.use()._n('one item', 'multiple items', 1)).to.be.equal('one item');
    });
    it("it should return the plural for more items", () => {
        expect(lt.use()._n('one item', 'multiple items', 42)).to.be.equal('multiple items');
    });
    it("it should return the plural for 0 items", () => {
        expect(lt.use()._n('one item', 'multiple items', 0)).to.be.equal('multiple items');
    });
});
