var mocha = require('mocha');
const got = require('got');
const FormData = require('form-data');
const { MobileEngine }= require('../../../tineye-services');
const fs = require('fs');
var config = require('../testConfig.js');

var mobileengine = new MobileEngine('', '', '', config.MobileEngine);


describe('MatchEngine Ping', function() {

	//Set timeout to 5s
	this.timeout(5000);

	describe('Check Server Ping', function() {
		it('Should return a call with status "ok"', function(done) {
			mobileengine.ping(function(err, data) {
				
				if(err)
					done();
				else if(data.status === "ok")
					done(err);
				else
					done(new Error("Server failed to return ping response"));

			});

		});

	});

});
