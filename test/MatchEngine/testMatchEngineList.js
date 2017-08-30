var config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { MatchEngine }= require('../../../tineye-services');
var mocha = require('mocha');

var matchengine = new MatchEngine('', '', '', config.MatchEngine);

describe('MatchEngine List', function() {

	//Set timeout to 5s
	this.timeout(5000);

	//post an image to the collection manually
	before(function(done) {
	
		var form = new FormData();
		
		form.append('image', fs.createReadStream(__dirname + '/../image.jpg'));
		form.append('filepath', 'matchEngineListTest.jpg');

	   	got.post(config.MatchEngine + 'add', {
		   body: form
		   })
		  	.then(response => {
				done(); 
			})
			.catch(error => {
				done(error);
			});

	});

	//delete manually
	after(function(done) {
	
		    got.delete(config.MatchEngine+'delete', {
		      json: true,
		      query: {filepath:'matchEngineListTest.jpg'}
		    })
		    .then((response) => {
	   			if(response.body.status === 'ok')
	   				done();
	   			else
					done(new Error('After hook failed to delete image')); 
		    })
		    .catch((err) => {
				done();
		    });

	});


	describe('Get list of collection', function() {
		it('Should return a call with status "ok" and list matchEngineListTest.jpg', function(done) {
			matchengine.list(function(err, data) {
				
				if(err)
					done();
				else if(data.result.contains("matchEngineListTest.jpg"))
					done(err);
				else
					done(new Error("Response does not contain image.jpg"));

			});

		});

	});

});
