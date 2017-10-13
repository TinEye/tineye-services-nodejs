var config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { WineEngine }= require('../../../tineye-services');
var mocha = require('mocha');

var wineengine = new WineEngine(
    config.WineEngine.user, 
    config.WineEngine.pass, 
    '', 
    config.WineEngine.url
    );

describe('WineEngine List', function() {

	//Set timeout to 5s
	this.timeout(10000);

	//post an image to the collection manually
	before(function(done) {
	
		var form = new FormData();
		
		form.append('image', fs.createReadStream(__dirname + '/../image.jpg'));
		form.append('filepath', 'wineEngineListTest.jpg');

	   	got.post(config.WineEngine.url  + 'add', {
	      	auth:config.WineEngine.user + ':' + config.WineEngine.pass,
		  	body: form,
		  	json:true
		})
		.then(response => {

			if(response.body.status !== 'ok'){
				done(new Error('Error Adding Image: ' + JSON.stringify(response.body)));
			}
			else{
				done(); 
			}

		})
		.catch(error => {

			done(error);

		});

	});

	//delete manually
	after(function(done) {
	
	    got.delete(config.WineEngine.url + 'delete', {
	      	auth:config.WineEngine.user + ':' + config.WineEngine.pass,
	      	json: true,
	      	query: {filepath:'wineEngineListTest.jpg'}
	    })
	    .then((response) => {

   			if(response.body.status === 'ok'){
   				done();
   			}
   			else{
				done(new Error('After hook failed to delete image')); 
   			}

	    })
	    .catch((err) => {

			done();

	    });

	});

	describe('Get list of collection', function() {

		it('Should return a call with status "ok" and list wineEngineListTest.jpg', function(done) {

			wineengine.list(null, function(err, data) {
				
				if(err){
					done();
				}
				else if(data.result.contains('wineEngineListTest.jpg')){
					done(err);
				}
				else{
					done(new Error('Response does not contain image.jpg'));
				}

			});

		});

	});

});
