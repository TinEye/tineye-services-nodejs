var mocha = require('mocha');
const got = require('got');
const FormData = require('form-data');
const { MatchEngine }= require('../../tineye-services');
const fs = require('fs');
var config = require('./testConfig.js');

var testServer = config.host + ':' + config.port + '/rest/';
console.log(testServer);
var matchengine = new MatchEngine('', '', '', testServer);

describe('MatchEngine Ping', function() {

	describe('Check Server Ping', function() {
		it('Should return a call with status "ok"', function(done) {
			matchengine.list({filepath: "image.jpg"}, function(err, data) {
				
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
