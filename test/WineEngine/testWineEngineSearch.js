const config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { WineEngine }= require('../../../tineye-services');
const mocha = require('mocha');
const libxmljs = require('libxmljs');
var expect = require('chai').expect;

var wineengine = new WineEngine(
    config.WineEngine.user, 
    config.WineEngine.pass, 
    '', 
    config.WineEngine.url
    );

describe('WineEngine Search:', function() {

    //Set timeout to 5s
	this.timeout(10000);

    var birdFilePath = __dirname + '/../image2.jpg';
    var melonCatFilePath = __dirname + '/../image3.jpg';

    //post an image to the collection manually
    before(function(done) {
    
        var form = new FormData();
        
        form.append('image', fs.createReadStream(birdFilePath));
        form.append('filepath', 'wineEngineSearchTest1.jpg');

	   	got.post(config.WineEngine.url + 'add', {
	   	    auth:config.WineEngine.user + ':' + config.WineEngine.pass,
		  	body: form,
		  	json:true
		}).then(response => {

			if(response.body.status !== 'ok'){
				done(new Error('Error Adding Image: ' + JSON.stringify(response.body)));
			}
			else{
				done(); 
			}

		}).catch(error => {

			done(error);

		});

    });

    //make call to delete images after tests
    after(function(done){
                
        got.delete(config.WineEngine.url + 'delete', {
          auth:config.WineEngine.user + ':' + config.WineEngine.pass,
          json: true,
          query: {filepath:'wineEngineSearchTest1.jpg'}
        }).then((response) => {

            if(response.body.status === 'ok'){
                done();
            }
            else{
                done(new Error('After hook failed to delete added image')); 
            }

        }).catch((err) => {

            done();

        });

    });


    describe('Search Image by filepath', function() {
        
        it('Should return a call with status "ok" and a result', function(done) {

            wineengine.search({filepath: 'wineEngineSearchTest1.jpg'}, function(err, data) {

                if(err){
                    done(new Error(err));
                }
                else if (data.result.length > 0){
                    done();
                }
                else{
                    done(new Error('No Result was returned'));
                }

            });

        });

    });

    describe('Search Image by file', function() {
        
        it('Should return a call with status "ok" and a result', function(done) {

            wineengine.search({image:birdFilePath }, function(err, data) {
                
                if(err){
                    done(err);
                }
                else if (data.result.length > 0){
                    done();
                }
                else{
                    done(new Error('No Result was returned'));
                }

            });

        });

    });


    describe('Search for image that is not in collection by File', function() {
        
        it('Should return a call with status "ok" and no result', function(done) {

            wineengine.search({image:melonCatFilePath }, function(err, data) {

                if(err){
                    done(new Error(err));
                }
                else if (data.result.length === 0){
                    done();                     
                }
                else{
                    done(new Error('A non error status was returned'));
                }

            });

        });

    });

});
