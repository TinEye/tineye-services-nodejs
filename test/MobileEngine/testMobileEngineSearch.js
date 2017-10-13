const config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { MobileEngine }= require('../../../tineye-services');
const mocha = require('mocha');
const libxmljs = require('libxmljs');

var mobileengine = new MobileEngine(
    config.MobileEngine.user, 
    config.MobileEngine.pass, 
    '', 
    config.MobileEngine.url
    );

describe('MoileEngine Search:', function() {

    //Set timeout to 5s
    this.timeout(5000);

    var birdFilePath = __dirname + '/../image2.jpg';
    var melonCatFilePath = __dirname + '/../image3.jpg';

    //post an image to the collection manually
    before(function(done) {
    
        var form = new FormData();
        
        form.append('image', fs.createReadStream(birdFilePath));
        form.append('filepath', 'mobileEngineSearchTest1.jpg');

        got.post(config.MobileEngine.url + 'add', {
            auth:config.MobileEngine.user + ':' + config.MobileEngine.pass,
            body: form,
            json:true
        }).then(response => {

            if(response.body.status === 'ok'){
                done();
            }
            else{
                done(new Error('Before hook failed to add image: ' + response.body )); 
            }

        }).catch(error => {
            done(error);
        });

    });

    //make call to delete images after tests
    after(function(done){
                
        got.delete(config.MobileEngine.url + 'delete', {
          auth:config.MobileEngine.user + ':' + config.MobileEngine.pass,
          json: true,
          query: {filepath:'mobileEngineSearchTest1.jpg'}
        })
        .then((response) => {

            if(response.body.status === 'ok'){
                done();
            }
            else{
                done(new Error('After hook failed to delete added image')); 
            }

        })
        .catch((err) => {
            done();
        });

    });

    describe('Search Image by filepath', function() {
        
        it('Should return a call with status "ok" and a result', function(done) {

            mobileengine.search({filepath: 'mobileEngineSearchTest1.jpg'}, function(err, data) {
                
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

            mobileengine.search({image:birdFilePath }, function(err, data) {
                
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

            mobileengine.search({image:melonCatFilePath }, function(err, data) {

                if(err){
                    done(new Error(err));
                }
                else if (data.result.length === 0){
                    done();
                }
                else{
                    done(new Error('A result was returned when result should === 0'));
                }

            });

        });

    });


});
