const config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { MatchEngine }= require('../../tineye-services');
const mocha = require('mocha');
const libxmljs = require('libxmljs');

var matchengine = new MatchEngine('', '', '', config.MatchEngine);

describe('MatchEngine Add:', function() {

	//Set timeout to 5s
	this.timeout(5000);

	//make call to delete image after each add
	after(function(done){
				
	    got.delete(config.MatchEngine+'delete', {
	      json: true,
	      query: {filepath:'matchEngineAdd.jpg'}
	    })
	    .then((response) => {
   			if(response.body.status === 'ok')
				done();
			else
				done(new Error('After hook failed to delete added image')); 
	    })
	    .catch((err) => {
			done();
	    });

	});

	describe('Add Image by URL', function() {
		it('Should return a call with status "ok"', function(done) {
		    	// Search your index for an image
		    	var url = 'http://tineye.com/images/meloncat.jpg';

		    	matchengine.add({url: url, filepath: 'matchEngineAdd.jpg'}, function(err, data) {

		    		if(err)
		    			done(err);
		    		else
		    			done();
		    	});

		    });

	});

});
