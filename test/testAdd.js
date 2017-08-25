var chai = require('chai');
var assert = chai.assert;
var mocha = require('mocha');
const { MatchEngine }= require('../../tineye-services');
const fs = require('fs');
const libxmljs = require('libxmljs')

matchengine = new MatchEngine('', '', '', 'staging02.tc:5000/rest/');


describe('MatchEngine Add', function() {

	describe('Add Image by URL', function() {
		it('Should return a call with status "ok"', function(done) {
		    	// Search your index for an image
		    	var url = 'http://tineye.com/images/meloncat.jpg';

		    	matchengine.add({url: url, filepath: "meloncat.jpg"}, function(err, data) {

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

		    	matchengine.add({url: url},  function(err, data) {

		    		if(err.status === 'fail'&&err.message[0] === 'Missing matching filepath')
		    			done();
		    		else
		    			done(new Error('Image was added by URL without filepath'));

		    	});

		    });

	});

	describe('Add Image by File with no optional params', function() {
		it('Should return a call with status "ok"', function(done) {

			var imagePath = __dirname + '/image.jpg';
			matchengine.add({ image: imagePath, filepath: 'testImage222' }, function (err, data) {
				if(err)
					done(err);
				else
					done();
			});

		});

	});

	describe('Add Image by File with optional param format:xml', function() {
		it('Return a string of xml that cam successfully be parsed ', function(done) {

			var imagePath = __dirname + '/image.jpg';
			matchengine.add({ image: imagePath, filepath: 'testImage222' },{format:'xml'}, function (err, data) {
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

			var imagePath = __dirname + '/image.jpg';
			matchengine.add({ image: imagePath, filepath: 'testImage222' },{callback:'JSON.parse'}, function (err, data) {
				if(err)
					done(new Error(err.message));
				else
					done();
			});

		});

	});

	describe('Add Image by File with optional param timeout', function() {
		it('Return a status of "ok"', function(done) {

			var imagePath = __dirname + '/image.jpg';
			matchengine.add({ image: imagePath, filepath: 'testImage222' },{timeout:100}, function (err, data) {
				if(err)
					done(new Error(err.message));
				else
					done();
			});

		});

	});

});
