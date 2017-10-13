const chai = require('chai');
const config = require('../testConfig.js');
const fs = require('fs');
const got = require('got');
const { MatchEngine }= require('../../../tineye-services');
const mocha = require('mocha');
const libxmljs = require('libxmljs');

var matchengine = new MatchEngine(
    config.MatchEngine.user, 
    config.MatchEngine.pass, 
    '', 
    config.MatchEngine.url
    );

describe('MatchEngine Add:', function() {

    //Set timeout to 5s
    this.timeout(15000);

    //make call to delete image after each add
    after(function(done){

        got.delete(config.MatchEngine.url+'delete', {
          auth:config.MatchEngine.user + ':' + config.MatchEngine.pass,
          json: true,
          query: {filepath:'matchEngineAdd.jpg'}
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

    describe('Add Image by URL', function() {

        it('Should return a call with status "ok"', function(done) {
            // Search your index for an image
            var url = 'http://tineye.com/images/meloncat.jpg';

            matchengine.add({url: url, filepath: 'matchEngineAdd.jpg'}, function(error, data) {

                try {
                    chai.assert.isOk(data, 'Data not returned');
                    chai.assert(data.status, 'ok','Status not ok');
                    done();
                } catch(err) {
                    done(err);
                }

            });

        });

    });

    describe('Add Image by URL without Filepath', function() {

        it('Should return a call with status fail and message "Missing matching filepath"', function(done) {
            // Search your index for an image
            var url = 'http://tineye.com/images/meloncat.jpg';

            matchengine.add({url: url},  function(err, data) {

                try {
                    chai.assert.isOk(data, 'Error not returned');
                    chai.assert(data.status !== 'ok', 'Error not returned');
                    done();
                } catch(err) {
                    done(err);
                }

            });

        });

    });

    describe('Add Image by File with no optional params', function() {

        it('Should return a call with status "ok"', function(done) {

            matchengine.add({ image: __dirname + '/../image2.jpg', filepath: 'matchEngineAdd.jpg'}, function (err, data) {

                try {
                    chai.assert.isOk(data, 'Data not returned');
                    chai.assert(data.status === 'ok', 'Status Return not "ok"');
                    done();
                } catch(err) {
                    done(err);
                }

            });

        });

    });

    describe('Add Image by File with optional param format:xml', function() {

        it('Return a string of xml that cam successfully be parsed', function(done) {

            matchengine.add({image: __dirname + '/../image.jpg', filepath: 'matchEngineAdd.jpg', format:'xml'}, function (err, data) {
                
                if(err){
                    done(new Error(err.message));
                }
                else{
                    try{
                        var obj = libxmljs.parseXmlString(data);
                        done();
                    }catch(e){
                        done(new Error('Failed to parse return string'));
                    }
                }

            });

        });

    });

    describe('Add Image by File with optional param timeout', function() {

        it('Return a status of "ok"', function(done) {

            matchengine.add({ image: __dirname + '/../image.jpg', filepath: 'matchEngineAdd.jpg',timeout:100 }, function (err, data) {
                    
                try {
                    chai.assert.isOk(data, 'Data not returned');
                    chai.assert(data.status === 'ok', 'Status Return not "ok"');
                    done();
                } catch(err) {
                    done(err);
                }

            });

        });

    });

});
