var config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { MatchEngine }= require('../../../tineye-services');
var mocha = require('mocha');

var matchengine = new MatchEngine('', '', '', config.MatchEngine);

describe('MatchEngine Delete:', function() {

	//post an image to the collection for deletion
	before(function(done) {
	
		var form = new FormData();

		form.append('image', fs.createReadStream(__dirname + '/../image.jpg'));
		form.append('filepath', 'matchEngineDeleteTest.jpg');

	   	got.post(config.MatchEngine+'add', {
		   body: form
		   })
		   .then(response => {
				done(); 
			})
			.catch(error => {
				done(error);
			});

	});

		//post an image to the collection for deletion
	after(function(done) {
	
		    got.delete(config.MatchEngine+'delete', {
		      json: true,
		      query: {filepath:'matchEngineDeleteTest.jpg'}
		    })
		    .then((response) => {
	   			if(response.body.status === 'warn')
	   				done();
	   			else
					done(new Error("Test failed to delete image, image deleted by after hook")); 
		    })
		    .catch((err) => {
				done();
		    });

	});

	describe('Delete Image by filepath', function() {
		
		it('Should return a call with status "ok"', function(done) {

			matchengine.delete({filepath: "matchEngineDeleteTest.jpg"}, function(err, data) {
				
				if(err)
					done(err);
				else
					done();

			});

		});

	});

});

