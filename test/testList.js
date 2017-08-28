var mocha = require('mocha');
const got = require('got');
const FormData = require('form-data');
const { MatchEngine }= require('../../tineye-services');
const fs = require('fs');
var config = require('./testConfig.js');

var testServer = config.host + ':' + config.port + '/rest/';
var matchengine = new MatchEngine('', '', '', testServer);

describe('MatchEngine List', function() {

	//post an image to the collection 
	before(function() {
	
		var form = new FormData();
		
		form.append('image', fs.createReadStream('./test/image.jpg'));
		
	   	got.post(testServer + 'add', {
		   body: form
		   })
		  	.then(response => {
				done(); 
			})
			.catch(error => {
				done(error);
			});

	});

	describe('Get list of collection', function() {
		it('Should return a call with status "ok" and list image.jpg', function(done) {
			matchengine.list({filepath: "image.jpg"}, function(err, data) {
				
				if(err)
					done();
				else if(data.result.contains("image.jpg"))
					done(err);
				else
					done(new Error("Response does not contain image.jpg"));

			});

		});

	});

});
