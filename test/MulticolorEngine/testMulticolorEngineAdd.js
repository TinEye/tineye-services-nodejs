const config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { MulticolorEngine }= require('../../../tineye-services');
const mocha = require('mocha');
const libxmljs = require('libxmljs');

var multicolorengine = new MulticolorEngine('', '', '', config.MulticolorEngine);

describe('MulticolorEngine Add:', function() {

	//Set timeout to 5s
	this.timeout(5000);

	//make call to delete image after each add
	after(function(done){
				
	    got.delete(config.MulticolorEngine+'delete', {
	      json: true,
	      query: {filepath:'multicolorEngineEngineAdd.jpg'}
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

	    	multicolorengine.add({url: url, filepath: 'multicolorEngineEngineAdd.jpg'}, function(err, data) {

	    		if(err)
	    			done(err);
	    		else
	    			done();
	    	});

	    });

	});

	describe('Add Image by URL without Filepath', function() {

		it('Should return a call with status fail and message "Missing matching filepath"', function(done) {
	    	// Search your index for an image
	    	var url = 'http://tineye.com/images/meloncat.jpg';

	    	multicolorengine.add({url: url},  function(err, data) {

	    		if(err.status === 'fail'&&err.message[0] === 'Missing matching filepath')
	    			done();
	    		else
	    			done(new Error('Image was added by URL without filepath'));

	    	});

	    });

	});

	describe('Add Image by File with no optional params', function() {
		it('Should return a call with status "ok"', function(done) {

			multicolorengine.add({ image: __dirname + '/../image2.jpg', filepath: 'multicolorEngineEngineAdd.jpg'}, function (err, data) {
				if(err)
					done(err);
				else
					done();
			});

		});

	});

	describe('Add Image by File with optional param format:xml', function() {
		it('Return a string of xml that cam successfully be parsed ', function(done) {

			multicolorengine.add({ image: __dirname + '/../image.jpg', filepath: 'multicolorEngineEngineAdd.jpg' },{format:'xml'}, function (err, data) {
				if(err)
					done(new Error(err.message));
				else
					try{
						var obj = libxmljs.parseXmlString(data);
						done();
					}catch(e){
						done(new Error("Failed to parse return string"));
					}
			});

		});

	});

	describe('Add Image by File with optional param callback', function() {
		it('Return a string of json wrapped in JSON.parse function', function(done) {

			multicolorengine.add({ image: __dirname + '/../image.jpg', filepath: 'multicolorEngineEngineAdd.jpg' },{callback:'JSON.parse'}, function (err, data) {
				if(err)
					done(new Error(err.message));
				else
					done();
			});

		});

	});

	describe('Add Image by File with optional param timeout', function() {
		it('Return a status of "ok"', function(done) {

			multicolorengine.add({ image: __dirname + '/../image.jpg', filepath: 'multicolorEngineEngineAdd.jpg' },{timeout:100}, function (err, data) {
				if(err)
					done(new Error(err.message));
				else
					done();
			});

		});

	});

});
