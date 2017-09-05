var config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { MulticolorEngine }= require('../../../tineye-services');
var mocha = require('mocha');

var multicolorengine = new MulticolorEngine('', '', '', config.MulticolorEngine);

describe('MulticolorEngine Ping:', function() {

	//Set timeout to 5s
	this.timeout(10000);

	describe('Check Server Ping', function() {
		it('Should return a call with status "ok"', function(done) {
			multicolorengine.ping(function(err, data) {
				
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