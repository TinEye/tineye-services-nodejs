var chai = require('chai');
var assert = chai.assert;
var mocha = require('mocha');
const { MatchEngine }= require('../../tineye-services');
const fs = require('fs');

matchengine = new MatchEngine('', '', '', 'staging02.tc:5000/rest/');


describe('MatchEngine Delete', function() {

	describe('Delete Image by URL', function() {
		it('Should return a call with status "ok"', function(done) {
			done();
		});

	});

});
