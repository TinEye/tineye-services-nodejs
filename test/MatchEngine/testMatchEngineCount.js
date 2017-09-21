const config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { MatchEngine }= require('../../../tineye-services');
const mocha = require('mocha');

const matchengine = new MatchEngine(
    config.MatchEngine.user, 
    config.MatchEngine.pass, 
    '', 
    config.MatchEngine.url);

describe('MatchEngine Count:', function() {

    //Set timeout to 5s
    this.timeout(5000);

    //post an image to the collection manually
    before(function(done) {
    
        var form = new FormData();
                    
        form.append('image', fs.createReadStream(__dirname + '/../image.jpg'));
        form.append('filepath', "matchEngineCountTest.jpg");

        got.post(config.MatchEngine.url + 'add', {
           auth:config.MatchEngine.user + ':' + config.MatchEngine.pass,
           body: form
        })
        .then(response => {
            done(); 
        })
        .catch(error => {
            done(error);
        });

    });

    //make call to delete image after each add
    after(function(done){
                
        got.delete(config.MatchEngine.url+'delete', {
          auth:config.MatchEngine.user + ':' + config.MatchEngine.pass,
          json: true,
          query: {filepath:'matchEngineCountTest.jpg'}
        })
        .then((response) => {

            if(response.body.status !== 'ok'){
                done(new Error('After hook failed to delete added image')); 
            }
            else{
                done(); 
            }

        })
        .catch((err) => {
            done();
        });

    });

    describe('Get a count of total images', function() {

        it('Should return a call with status "ok" and a result > 0', function(done) {
            
            matchengine.count(function(err, data) {
                
                if(err)
                    done(err);
                else if(data.result[0]>0)
                    done();
                else
                    done(new Error("Response does not contain image.jpg"));

            });

        });

    });

});
