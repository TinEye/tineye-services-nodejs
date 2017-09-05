const config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { MulticolorEngine }= require('../../../tineye-services');
const mocha = require('mocha');
const libxmljs = require('libxmljs');

var multicolorengine = new MulticolorEngine('', '', '', config.MulticolorEngine);

describe('MulticolorEngine CountImageColors:', function() {

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
	form.append('filepath', 'multicolorEngineCountImageGreens.jpg');

	var form2 = new FormData();
	form2.append('image', fs.createReadStream(purplePath));
	form2.append('filepath', 'multicolorEngineCountImagePurple.jpg');

	var form3 = new FormData();
	form3.append('image', fs.createReadStream(bluePath));
	form3.append('filepath', 'multicolorEngineCountImageBlue.jpg');

	var form4 = new FormData();
	form4.append('image', fs.createReadStream(colorsPath));
	form4.append('filepath', 'multicolorEngineCountImageColors.jpg');

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
	      query: {filepath:'multicolorEngineCountImageGreens.jpg'}
		});

		var deleteColor2 = got.delete(config.MulticolorEngine+'delete', {
			json: true,
			query: {filepath:'multicolorEngineCountImagePurple.jpg'}
		});
		
		var deleteColor3 = got.delete(config.MulticolorEngine+'delete', {
			json: true,
			query: {filepath:'multicolorEngineCountImageBlue.jpg'}
		});

		var deleteColors = got.delete(config.MulticolorEngine+'delete', {
			json: true,
			query: {filepath:'multicolorEngineCountImageColors.jpg'}
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
	describe('Count colors by image file', function() {
		it('Should return a call with status "ok" and 2 results', function(done) {

			var params = {
				images:[colorsPath,bluePath],
				count_colors:['#f1c40f','#e74c3c']
			};

			multicolorengine.countImageColors(params, function(err, data) {
	    		if(err)
	    			done(new Error(JSON.stringify(data.err,null, 4)));
				else if (data.result.length === 2){
	    			done();
				}else
	    			done(new Error('Result returned:' + JSON.stringify(data.result,null, 4)));

			});

		});

	});

		// //serach with url
	describe('Count colors by image url', function() {
		
		it('Should return a call with status "ok" and 2 results', function(done) {

			var params = {
				urls:[url],
				count_colors:['#f1c40f','#e74c3c']
			};

			multicolorengine.countImageColors(params, function(err, data) {
	    		if(err)
	    			done(new Error(JSON.stringify(data.err,null, 4)));
				else if (data.result.length === 2){
	    			done();
				
				}else
	    			done(new Error('Result returned:' + JSON.stringify(data.result,null, 4)));

			});

		});

	});

	// //serach with url
	describe('Count colors by image urls', function() {
		
		it('Should return a call with status "ok" and 2 results', function(done) {

			var params = {
				urls:[url,url2],
				count_colors:['#f1c40f','#e74c3c']
			};

			multicolorengine.countImageColors(params, function(err, data) {
	    		if(err)
	    			done(new Error(JSON.stringify(data.err,null, 4)));
				else if (data.result.length === 2){
	    			done();
				}else
	    			done(new Error('Result returned:' + JSON.stringify(data.result,null, 4)));

			});

		});

	});
});