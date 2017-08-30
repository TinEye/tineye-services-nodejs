var mocha = require('mocha');
const got = require('got');
const FormData = require('form-data');
const { MobileEngine }= require('../../../tineye-services');
const fs = require('fs');
var config = require('../testConfig.js');

var mobileengine = new MobileEngine('', '', '', config.MobileEngine);

describe('MobileEngine List:', function() {

	//Set timeout to 5s
	this.timeout(5000);

	//post an image to the collection 
	before(function(done) {
	
		var form = new FormData();
		
		form.append('image', fs.createReadStream('./test/image.jpg'));
		form.append('filepath', 'mobileEngineListTest.jpg');

	   	got.post(config.MobileEngine + 'add', {
		   body: form
		}).then(response => {
			done(); 
		}).catch(error => {
			done(error);
		});

	});

	//delete manually
	after(function(done) {
	
	    got.delete(config.MobileEngine+'delete', {
	      json: true,
	      query: {filepath:'mobileEngineListTest.jpg'}
	    }).then((response) => {
   			if(response.body.status === 'ok')
   				done();
   			else
				done(new Error('After hook failed to delete image')); 
	    }).catch((err) => {
			done();
	    });

	});

	describe('Get list of collection', function() {
		it('Should return a call with status "ok" and list mobileEngineListTest.jpg', function(done) {
			mobileengine.list({filepath: 'mobileEngineListTest.jpg'}, function(err, data) {
				
				if(err)
					done();
				else if(data.result.contains('mobileEngineListTest.jpg'))
					done(err);
				else
					done(new Error('Response does not contain image.jpg'));

			});

		});

	});

});
