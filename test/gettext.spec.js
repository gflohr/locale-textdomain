'use strict';

var LT = require('../lib/locale-textdomain');
var chai = require('chai');

var expect = chai.expect;

describe('When requesting a missing translation', function () {
    var t = new LT;
    it("it should return the original string", function () {
        expect(t._('Hello')).to.be.equal('Hello');
    });
});
