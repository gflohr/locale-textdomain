'use strict';

var LT = require('../lib/locale-textdomain');
var chai = require('chai');

const expect = chai.expect;

describe('When requesting a missing translation', () => {
    var t = new LT;
    it("it should return the original string", () => {
        expect(t._('Hello')).to.be.equal('Hello');
    });
});
