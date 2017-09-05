var config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { WineEngine }= require('../../../tineye-services');
var mocha = require('mocha');

var wineengine = new WineEngine('', '', '', config.WineEngine);

describe('WineEngine Delete:', function() {

	//Set timeout to 5s
	this.timeout(5000);

	//post an image to the collection for deletion
	before(function(done) {
	
		var form = new FormData();

		form.append('image', fs.createReadStream(__dirname + '/../image.jpg'));
		form.append('filepath', 'wineEngineDeleteTest.jpg');

	   	got.post(config.WineEngine+'add', {
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
	
		    got.delete(config.WineEngine + 'delete', {
		      json: true,
		      query: {filepath:'wineEngineDeleteTest.jpg'}
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

			wineengine.delete({filepath: "wineEngineDeleteTest.jpg"}, function(err, data) {
				
				if(err)
					done(err);
				else
					done();

			});

		});

	});

});
