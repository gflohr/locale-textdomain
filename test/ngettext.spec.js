'use strict';

var LT = require('../lib/locale-textdomain');
var chai = require('chai');

var expect = chai.expect;

describe('When requesting a plural form', function () {
    var t = new LT();

    it("it should return the singular for a single item", function () {
        expect(t._n('one item', 'multiple items', 1)).to.be.equal('one item');
    });
    it("it should return the plural for more items", function () {
        expect(t._n('one item', 'multiple items', 42)).to.be.equal('multiple items');
    });
    it("it should return the plural for 0 items", function () {
        expect(t._n('one item', 'multiple items', 0)).to.be.equal('multiple items');
    });
});
