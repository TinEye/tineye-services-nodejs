const async = require('async');
const config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { MulticolorEngine }= require('../../../tineye-services');
const mocha = require('mocha');
const libxmljs = require('libxmljs');

var multicolorengine = new MulticolorEngine(
	config.MulticolorEngine.user, 
	config.MulticolorEngine.pass, 
	'', 
	config.MulticolorEngine.url
	);

describe('MulticolorEngine Search and Return Metadata:', function() {

	//Set timeout to 5s
	this.timeout(15000);

   	var colorsPath = __dirname + '/../colors.png';
	var bluePath = __dirname + '/../blue.png';
	var purplePath = __dirname + '/../purple.png';
	var greensPath = __dirname + '/../greens.png';

	var images = {
		colorsPath:{
			imagePath:colorsPath,
			filePath:'multicolorEngineGetMetadataColors.jpg'
		}, 
		bluePath:{
			imagePath:bluePath,
			filePath:'multicolorEngineGetMetadataBlue.jpg'
		}, 
		greensPath:{
			imagePath:bluePath,
			filePath:'multicolorEngineGetMetadataGreens.jpg'
		}, 
		purplePath:{
			imagePath:purplePath,
			filePath:'multicolorEngineGetMetadataPurple.jpg'
		}
	};
   
	//post an image to the collection manually
	before(function(done) {

		async.forEachOfSeries(images, function (value, key, callback) {

			var form = new FormData();
			form.append('image', fs.createReadStream(value.imagePath));
			form.append('filepath', value.filePath);

		   	got.post(config.MulticolorEngine.url + 'add', {
		      auth:config.MulticolorEngine.user + ':' + config.MulticolorEngine.pass,
		      body: form
			})
			.then(response => {
				callback();
			})
			.catch(error => {
				callback(error);
			});

		}, function (err,results) {

			if(err){
				done(err);
			}
			else{
				done();
			}

		});

	});

	//make call to delete images after tests
	after(function(done){

		async.forEachOfSeries(images, function (value, key, callback) {

		    got.delete(config.MulticolorEngine.url + 'delete', {
		      	auth:config.MulticolorEngine.user + ':' + config.MulticolorEngine.pass,
		      	json: true,
	      		query: {filepath:value.filePath}
		    })
		    .then((response) => {
	   			callback();
		    })
		    .catch((err) => {
		    	callback(err);
		    });

		}, function (err) {

			if(err){
				done(err);
			}
			else{
				done();
			}

		});
				
	});

	describe('Call getMetadata', function() {
		
		it('Should return a call with status "ok"', function(done) {

			multicolorengine.getMetadata({filepaths:['multicolorEngineGetMetadataGreens.jpg']},function(err, data) {

	    		if(err){
	    			done(new Error(JSON.stringify(err,null, 4)));
	    		}
				else if (data.status === 'ok'){
	    			done();
				}
				else{
	    			done(new Error('Result returned:' + JSON.stringify(data,null, 4)));
				}

			});

		});

	});


	describe('Call getSearchMetaData', function() {
		
		it('Should return a call with status "ok"', function(done) {

			multicolorengine.getSearchMetadata(function(err, data) {

	    		if(err){
	    			done(new Error(JSON.stringify(err,null, 4)));
	    		}
				else if (data.status === 'ok'){
	    			done();
				}
				else{
	    			done(new Error('Result returned:' + JSON.stringify(data,null, 4)));
				}

			});

		});

	});

	describe('Call getReturnMetaData', function() {
		
		it('Should return a call with status "ok"', function(done) {

			multicolorengine.getReturnMetadata(function(err, data) {

	    		if(err){
	    			done(new Error(JSON.stringify(err,null, 4)));
	    		}
				else if (data.status === 'ok'){
	    			done();
				}
				else{
	    			done(new Error('Result returned:' + JSON.stringify(data,null, 4)));
				}

			});

		});

	});

});
