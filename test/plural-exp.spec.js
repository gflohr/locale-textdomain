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
        testPlural('alert("Hello, Eve!")', 2,
                   expect);
    });

    describe('that contains syntax errors', () => {
        testPlural('rm -rf node_modules && npm install', 2,
                   expect);
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
   it('Irish', () => {
       testPlural('nplurals=3; plural=n==1 ? 0 : n==2 ? 1 : 2;',
                  3,
                  [
                   2, 0, 1, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                  ]);
   });
    it('Romanian', () => {
        testPlural('nplurals=3; plural=n==1 ? 0 : (n==0 || (n%100 > 0 && n%100 < 20)) ? 1 : 2;',
                  3,
                  [
                   1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                   1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                  ]);
   });
    it('Lithuanian', () => {
        testPlural('nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && (n%100<10 || n%100>=20) ? 1 : 2);',
                  3,
                  [
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   2, 0, 1, 1, 1, 1, 1, 1, 1, 1
                  ]);
   });
});

function testPlural(code, nplural, expect) {
    var plural = pluralExp(code);

    for (var n = 0; n < expect.length; ++n) {
        var retval = plural(n);
        retval[0].should.equal(nplural);
        retval[1].should.equal(expect[n]);
    }
}

