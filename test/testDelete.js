var mocha = require('mocha');
const got = require('got');
const FormData = require('form-data');
const { MatchEngine }= require('../../tineye-services');
const fs = require('fs');

var config = require('./testConfig.js');
var matchengine = new MatchEngine('', '', '', config.host + ':' + config.port + '/rest/');

describe('MatchEngine Delete', function() {

	//post an image to the collection 
	before(function() {
	
		var form = new FormData();
		
		form.append('image', fs.createReadStream('./test/image.jpg'));
		
	   	got.post('staging02.tc:5000/rest/add', {
		   body: form
		   })
		   .then(response => {
				done(); 
			})
			.catch(error => {
				done(error);
			});
	});

	describe('Delete Image by filepath', function() {
		it('Should return a call with status "ok"', function(done) {
			matchengine.delete({filepath: "image.jpg"}, function(err, data) {
				
				if(err)
					done(err);
				else
					done()
			});

		});

	});

});
