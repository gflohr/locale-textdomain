'use strict';

var pluralExp = require('../src/plural-exp');
var chai = require('chai');

chai.should();

const should = chai.should;

describe('When specifying an illegal plural function', () => {
    var plural = pluralExp('alert("Hello, Eve!");'),
        expect = [
                    1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                 ];

    it("it should use the default function", () => {
        for (var n = 0; n < expect.length; ++n) {
            var retval = plural(n);
            retval[0].should.equal(2);
            retval[1].should.equal(expect[n]);
        }
    });
});

