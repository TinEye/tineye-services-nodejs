const config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { MulticolorEngine }= require('../../../tineye-services');
const mocha = require('mocha');
const libxmljs = require('libxmljs');

var multicolorengine = new MulticolorEngine('', '', '', config.MulticolorEngine);

describe('MulticolorEngine ExtractImageColors:', function() {

	//Set timeout to 5s
	this.timeout(10000);

   	var colorsPath = __dirname + '/../colors.png';
	var bluePath = __dirname + '/../blue.png';
	var purplePath = __dirname + '/../purple.png';
	var greensPath = __dirname + '/../greens.png';
	var url = 'http://tineye.com/images/meloncat.jpg';
	var url2 = 'https://services.tineye.com/developers/matchengine/_images/364069_a1.jpg';
	   
	var form = new FormData();
	form.append('image', fs.createReadStream(greensPath));
	form.append('filepath', 'multicolorEngineExtractGreens.jpg');

	var form2 = new FormData();
	form2.append('image', fs.createReadStream(purplePath));
	form2.append('filepath', 'multicolorEngineExtractPurple.jpg');

	var form3 = new FormData();
	form3.append('image', fs.createReadStream(bluePath));
	form3.append('filepath', 'multicolorEngineExtractBlue.jpg');

	var form4 = new FormData();
	form4.append('image', fs.createReadStream(colorsPath));
	form4.append('filepath', 'multicolorEngineExtractColors.jpg');

	//post an image to the collection manually
	before(function(done) {
	
	   	var postColor1 = got.post(config.MulticolorEngine + 'add', {
		    body: form
		});

	   	var postColor2 = got.post(config.MulticolorEngine + 'add', {
		    body: form2
		});

		var postColor3 = got.post(config.MulticolorEngine + 'add', {
		    body: form3
		});

		var postColors = got.post(config.MulticolorEngine + 'add', {
		    body: form4
		});

		postColor1.then(function(response){
			return postColor2;
		})
		.then(function(response){
			return postColor3;
		})
		.then(function(response){
			return postColors;
		})
		.then(function(response){
			done();
		})
		.catch(function(error){Collection
			done(error);
		});


	});

	//make call to delete images after tests
	after(function(done){
				
	    var deleteColor1 = got.delete(config.MulticolorEngine+'delete', {
	      json: true,
	      query: {filepath:'multicolorEngineExtractGreens.jpg'}
		});

		var deleteColor2 = got.delete(config.MulticolorEngine+'delete', {
			json: true,
			query: {filepath:'multicolorEngineExtractPurple.jpg'}
		});
		
		var deleteColor3 = got.delete(config.MulticolorEngine+'delete', {
			json: true,
			query: {filepath:'multicolorEngineExtractBlue.jpg'}
		});

		var deleteColors = got.delete(config.MulticolorEngine+'delete', {
			json: true,
			query: {filepath:'multicolorEngineExtractColors.jpg'}
		});

		deleteColor1.then(function(response){
			return deleteColor2;
		})
		.then(function(response){
			return deleteColor3;
		})
		.then(function(response){
			return deleteColors;
		})
		.then(function(response){
			done();
		})
		.catch(function(error){
			done(new Error('After hook failed to delete added images'));
		});

	});


	// //serach with file
	describe('Extract colors by image file', function() {
		
		it('Should return a call with status "ok" and 9 colors', function(done) {

			multicolorengine.extractImageColors({images:[colorsPath]}, function(err, data) {
	    		if(err)
	    			done(new Error(JSON.stringify(err,null, 4)));
				else if (data.result.length === 9){
	    			done();
				}else
	    			done(new Error('Result returned:' + JSON.stringify(data,null, 4)));

			});

		});

	});


	// //serach with file
	describe('Extract colors by image files', function() {
		
		it('Should return a call with status "ok" and 11 colors', function(done) {

			multicolorengine.extractImageColors({images:[colorsPath,bluePath]}, function(err, data) {
	    		if(err)
	    			done(new Error(JSON.stringify(err,null, 4)));
				else if (data.result.length === 11){
	    			done();
				}else
	    			done(new Error('Result returned:' + JSON.stringify(data,null, 4)));

			});

		});

	});

		// //serach with file
	describe('Extract colors by url', function() {
		
		it('Should return a call with status "ok" and 10 colors', function(done) {

			multicolorengine.extractImageColors({urls:[url]}, function(err, data) {
	    		if(err)
	    			done(new Error(JSON.stringify(err,null, 4)));
				else if (data.result.length === 10){
	    			done();
				}else
	    			done(new Error('Result returned:' + JSON.stringify(data,null, 4)));

			});

		});

	});

			// //serach with file
	describe('Extract colors by urls', function() {
		
		it('Should return a call with status "ok" and 18 colors', function(done) {

			multicolorengine.extractImageColors({urls:[url,url2]}, function(err, data) {
	    		if(err)
	    			done(new Error(JSON.stringify(err,null, 4)));
				else if (data.result.length === 18){
	    			done();
				
				}else
	    			done(new Error('Result returned:' + JSON.stringify(data,null, 4)));

			});

		});

	});

});