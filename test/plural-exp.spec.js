'use strict';

var pluralExp = require('../src/plural-exp');
var chai = require('chai');

chai.should();

describe('When specifying an invalid plural function', function () {
    var expect = [
                    1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                 ];

    describe('that contains illegal code', function () {
        testPlural('alert("Hello, Eve!")', 2,
                   expect);
    });

    describe('that contains syntax errors', function () {
        testPlural('rm -rf node_modules && npm install', 2,
                   expect);
    });
});

describe('When testing plural functions for individual languages', function () {
   it('no plural (Japanese, Vietnamese, Korean, ...)', function () {
       testPlural('nplurals=1; plural=0', 1,
                  [
                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                  ]);
   });
   it('Germanic plural (English, German, ...)', function () {
       testPlural('nplurals=2; plural=(n != 1)', 2,
                  [
                   1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                  ]);
   });
   it('Portuguese and French', function () {
       testPlural('nplurals=2; plural=(n > 1)', 2,
                  [
                   0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                   1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                  ]);
   });
   it('Latvian', function () {
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
   it('Irish', function () {
       testPlural('nplurals=3; plural=n==1 ? 0 : n==2 ? 1 : 2;',
                  3,
                  [
                   2, 0, 1, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                  ]);
   });
    it('Romanian', function () {
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
    it('Lithuanian', function () {
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
    it('Russian, Ukranian, Belarusian, Serbian, Croatian', function () {
        testPlural('nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);',
                  3,
                  [
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2
                  ]);
   });
    it('Czech and Slovak', function () {
        testPlural('nplurals=3; plural=(n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2;',
                  3,
                  [
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                  ]);
   });
    it('Polish', function () {
        testPlural('nplurals=3; plural=(n==1 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);',
                  3,
                  [
                   2, 0, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
                   2, 2, 1, 1, 1, 2, 2, 2, 2, 2

                  ]);
   });
    it('Slovenian', function () {
        testPlural('nplurals=4; plural=(n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3);',
                  4,
                  [
                   3, 0, 1, 2, 2, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 0, 1, 2, 2, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                   3, 3, 3, 3, 3, 3, 3, 3, 3, 3
                  ]);
   }); 
    it('Arab', function () {
        testPlural('nplurals=6; plural=n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 ? 4 : 5;',
                  6,
                  [
                   0, 1, 2, 3, 3, 3, 3, 3, 3, 3,
                   3, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   5, 5, 5, 3, 3, 3, 3, 3, 3, 3,
                   3, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                   4, 4, 4, 4, 4, 4, 4, 4, 4, 4
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

