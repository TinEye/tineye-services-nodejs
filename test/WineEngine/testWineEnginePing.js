var config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { WineEngine }= require('../../../tineye-services');
var mocha = require('mocha');

var wineengine = new WineEngine('', '', '', config.WineEngine);

describe('WineEngine Ping:', function() {

	//Set timeout to 5s
	this.timeout(5000);

	describe('Check Server Ping', function() {
		it('Should return a call with status "ok"', function(done) {
			wineengine.ping(function(err, data) {
				
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
