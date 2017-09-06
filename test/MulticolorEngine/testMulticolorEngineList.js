var config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { MulticolorEngine }= require('../../../tineye-services');
var mocha = require('mocha');

var multicolorengine = new MulticolorEngine(
	config.MulticolorEngine.user, 
	config.MulticolorEngine.pass, 
	'', 
	config.MulticolorEngine.url
	);

describe('MulticolorEngine List', function() {

	//Set timeout to 5s
	this.timeout(10000);

	//post an image to the collection manually
	before(function(done) {
	
		var form = new FormData();
		
		form.append('image', fs.createReadStream(__dirname + '/../image.jpg'));
		form.append('filepath', 'multicolorEngineListTest.jpg');

	   	got.post(config.MulticolorEngine.url + 'add', {
	      auth:config.MulticolorEngine.user + ':' + config.MulticolorEngine.pass,
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
	
	    got.delete(config.MulticolorEngine.url + 'delete', {
	      auth:config.MulticolorEngine.user + ':' + config.MulticolorEngine.pass,
	      json: true,
	      query: {filepath:'multicolorEngineListTest.jpg'}
	    }).then((response) => {

   			if(response.body.status === 'ok'){
   				done();
   			}
   			else{
				done(new Error('After hook failed to delete image')); 
   			}

	    }).catch((err) => {
			done(new Error('After hook failed to delete image')); 
	    });

	});


	describe('Get list of collection', function() {
		it('Should return a call with status "ok" and list multicolorEngineListTest.jpg', function(done) {
			multicolorengine.list(function(err, data) {
				
				if(err){
					done();
				}
				else if(data.result.contains('multicolorEngineListTest.jpg')){
					done(err);
				}
				else{
					done(new Error('Response does not contain image.jpg'));
				}

			});

		});

	});

});
