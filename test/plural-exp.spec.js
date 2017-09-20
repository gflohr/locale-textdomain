'use strict';

var pluralExp = require('../src/plural-exp');
var chai = require('chai');

chai.should();

const should = chai.should;

describe('When specifying an invalid plural function', () => {
    var expect = [
                    1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                 ];

    describe('that contains illegal code', () => {
        var plural = pluralExp('alert("Hello, Eve!");');

        it("it should use the default function", () => {
            testPlural('alert("Hello, Eve!");', 2,
                       [
                        1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                       ]);
        });
    });

    describe('that contains syntax errors', () => {
        var plural = pluralExp('rm -rf node_modules && npm install');

        it("it should use the default function", () => {
            for (var n = 0; n < expect.length; ++n) {
                var retval = plural(n);
                retval[0].should.equal(2);
                retval[1].should.equal(expect[n]);
            }
        });
    });
});

describe('When testing plural functions for individual languages', () => {
   it('no plural (Japanese, Vietnamese, Korean, ...)', () => {
       testPlural('nplurals=1; plural=0', 1,
                  [
                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                  ]);
   });
   it('Germanic plural (English, German, ...)', () => {
       testPlural('nplurals=2; plural=(n != 1)', 2,
                  [
                   1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                  ]);
   });
   it('Portuguese and French', () => {
       testPlural('nplurals=2; plural=(n > 1)', 2,
                  [
                   0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                  ]);
   });
   it('Latvian', () => {
       testPlural('nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n != 0 ? 1 : 2);',
                  3,
                  [
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                   1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   1, 0, 1, 1, 1, 1, 1, 1, 1, 1
                  ]);
   });
});

function testPlural(code, nplural, expect) {
    var plural = pluralExp(code);

    for (var n = 0; n < expect.length; ++n) {
        for (var n = 0; n < expect.length; ++n) {
           var retval = plural(n);
           retval[0].should.equal(nplural);
           retval[1].should.equal(expect[n]);
        }
    }
}

