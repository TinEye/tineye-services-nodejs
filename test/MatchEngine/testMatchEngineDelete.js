var config = require('../testConfig.js');
var testSetup = require('../setupTest.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { MatchEngine }= require('../../../tineye-services');
var mocha = require('mocha');

var matchengine = new MatchEngine(
	config.MatchEngine.user, 
	config.MatchEngine.pass, 
	'', 
	config.MatchEngine.url);

describe('MatchEngine Delete:', function() {

	//Set timeout to 5s
	this.timeout(5000);

	//post an image to the collection for deletion
	before(function(done) {
	
		var form = new FormData();

		form.append('image', fs.createReadStream(__dirname + '/../image.jpg'));
		form.append('filepath', 'matchEngineDeleteTest.jpg');

	   	got.post(config.MatchEngine.url + 'add', {
	       auth:config.MatchEngine.user + ':' + config.MatchEngine.pass,
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
	
	    got.delete(config.MatchEngine.url + 'delete', {
      	  auth:config.MatchEngine.user + ':' + config.MatchEngine.pass,
	      json: true,
	      query: {filepath:'matchEngineDeleteTest.jpg'}
	    })
	    .then((response) => {

   			if(response.body.status === 'warn'){
   				done();
   			}
   			else{
				done(new Error("Test failed to delete image, image deleted by after hook"));
   			}

	    })
	    .catch((err) => {
			done();
	    });

	});

	describe('Delete Image by filepath', function() {
		
		it('Should return a call with status "ok"', function(done) {

			matchengine.delete({filepath: 'matchEngineDeleteTest.jpg'}, function(err, data){
				
				if(err){
					done(err);
				}
				else{
					done();
				}

			});

		});

	});

});

