const config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { MulticolorEngine }= require('../../../tineye-services');
const mocha = require('mocha');
const libxmljs = require('libxmljs');

var multicolorengine = new MulticolorEngine('', '', '', config.MulticolorEngine);

describe('MulticolorEngine Search:', function() {

	//Set timeout to 5s
	this.timeout(10000);

   	var colorsPath = __dirname + '/../colors.png';
	var bluePath = __dirname + '/../blue.png';
	var purplePath = __dirname + '/../purple.png';
	var greensPath = __dirname + '/../greens.png';
	   
	var form = new FormData();
	form.append('image', fs.createReadStream(greensPath));
	form.append('filepath', 'multicolorEngineSearchGreens.jpg');

	var form2 = new FormData();
	form2.append('image', fs.createReadStream(purplePath));
	form2.append('filepath', 'multicolorEngineSearchPurple.jpg');

	var form3 = new FormData();
	form3.append('image', fs.createReadStream(bluePath));
	form3.append('filepath', 'multicolorEngineSearchBlue.jpg');

	var form4 = new FormData();
	form4.append('image', fs.createReadStream(colorsPath));
	form4.append('filepath', 'multicolorEngineSearchColors.jpg');

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
		.catch(function(error){
			done(error);
		});


	});

	//make call to delete images after tests
	after(function(done){
				
	    var deleteColor1 = got.delete(config.MulticolorEngine+'delete', {
	      json: true,
	      query: {filepath:'multicolorEngineSearchGreens.jpg'}
		});

		var deleteColor2 = got.delete(config.MulticolorEngine+'delete', {
			json: true,
			query: {filepath:'multicolorEngineSearchPurple.jpg'}
		});
		
		var deleteColor3 = got.delete(config.MulticolorEngine+'delete', {
			json: true,
			query: {filepath:'multicolorEngineSearchBlue.jpg'}
		});

		var deleteColors = got.delete(config.MulticolorEngine+'delete', {
			json: true,
			query: {filepath:'multicolorEngineSearchColors.jpg'}
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


	//serach with weights
	describe('Search with a single color green(#1abc9c)', function() {
		
		it('Should return a call with status "ok" and 2 results', function(done) {

			params = {
				colors:['#1abc9c']
			};

			multicolorengine.search(params, function(err, data) {
				
	    		if(err)
	    			done(new Error(err.message[0]));
	    		else if (data.result.length == 2)
	    			done();
	    		else
	    			done(new Error('Result returned:' + JSON.stringify(data.result,null, 4)));

			});

		});

	});


	//serach with weights
	describe('Search with a more than one color (#f1c40f and #e74c3c)', function() {
		
		it('Should return a call with status "ok" and a single result', function(done) {

			params = {
				colors:['#f1c40f','#e74c3c']
			};

			multicolorengine.search(params, function(err, data) {
				
	    		if(err)
	    			done(new Error(err.message[0]));
	    		else if (data.result.length == 1)
	    			done();
	    		else
	    			done(new Error('Result returned:' + JSON.stringify(data.result,null, 4)));

			});

		});

	});

	//serach with weights
	describe('Search with a more than one color (#f1c40f and #e74c3c) and weights(30 and 70', function() {
		
		it('Should return a call with status "ok" and a result', function(done) {

			params = {
				colors:['#f1c40f','#e74c3c'],
				weights:[30,70]
			};

			multicolorengine.search(params, function(err, data) {

				if(err)
	    			done(new Error(err.message[0]));
				else if (data.result.length === 1)
					done();
				else
	    			done(new Error('Result returned:' + JSON.stringify(data.result,null, 4)));

			});

		});

	});


	// //serach with file
	describe('Search by image file', function() {
		
		it('Should return a call with status "ok" and 2 results', function(done) {

			multicolorengine.search({image:bluePath}, function(err, data) {
				
	    		if(err)
	    			done(new Error(err.message[0]));
				else if (data.result.length === 2){
	    			done();
				}else
	    			done(new Error('Result returned:' + JSON.stringify(data.result,null, 4)));

			});

		});

	});

	// //serach with file
	describe('Search by collection image filepath', function() {
		
		it('Should return a call with status "ok" and a result', function(done) {

			multicolorengine.search({filepath:'multicolorEngineSearchGreens.jpg'}, function(err, data) {

	    		if(err)
	    			done(new Error(err.message[0]));
				else if (data.result.length === 2){
	    			done();
				}else
	    			done(new Error('Result returned:' + JSON.stringify(data.result,null, 4)));

			});

		});

	});

});
