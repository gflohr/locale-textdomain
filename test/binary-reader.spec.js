'use strict';

var reader = require('../src/binary-reader');
var chai = require('chai');

chai.should();

const expect = chai.expect;

describe('When reading a file at an existing location', () => {
    var e;
    var d;

    beforeEach(function(done) {
        reader(__filename, function(err, data) {
            e = err;
            d = data;
            done();            
        });
    });

    it('it should not throw an exception', () => {
        expect(e).to.be.null;
    });
    it('it should have defined content', () => {
        expect(d).to.not.be.undefined;
    });
    it('it should have content with a length', () => {
        expect(d.length > 0).to.be.true;
    });
});

describe('When reading a file at a non-existing location', () => {
    var e;
    var d;

    beforeEach(function(done) {
        reader("test/not-there.spec.js", function(err, data) {
            e = err;
            d = data;
            done();            
        });
    });

    it('it should throw an exception', () => {
        expect(e).not.to.be.null;
    });
    it('it should not have defined content', () => {
        expect(d).to.be.undefined;
    });
});
