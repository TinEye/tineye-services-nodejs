var config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { MatchEngine }= require('../../../tineye-services');
var mocha = require('mocha');

var matchengine = new MatchEngine('', '', '', config.MatchEngine);

describe('MatchEngine Ping', function() {

	describe('Check Server Ping', function() {
		it('Should return a call with status "ok"', function(done) {
			matchengine.ping(function(err, data) {
				
				if(err)
					done(err);
				else if(data.status === "ok")
					done();
				else
					done(new Error("Server failed to return ping response"));

			});

		});

	});

});
