var config = require('../testConfig.js');
const FormData = require('form-data');
const fs = require('fs');
const got = require('got');
const { MobileEngine }= require('../../../tineye-services');
var mocha = require('mocha');

var mobileengine = new MobileEngine(
    config.MobileEngine.user, 
    config.MobileEngine.pass, 
    '', 
    config.MobileEngine.url
    );

describe('MobileEngine Delete:', function() {

    //Set timeout to 5s
    this.timeout(5000);

    //post an image to the collection for deletion
    before(function(done) {
    
        var form = new FormData();

        form.append('image', fs.createReadStream(__dirname + '/../image.jpg'));
        form.append('filepath', 'mobileEngineDeleteTest.jpg');

        got.post(config.MobileEngine.url + 'add', {
            auth:config.MobileEngine.user + ':' + config.MobileEngine.pass,
            body: form
        }).then(response => {
            done(); 
        }).catch(error => {
            done(error);
        });

    });

        //post an image to the collection for deletion
    after(function(done) {
    
        got.delete(config.MobileEngine.url + 'delete', {
          auth:config.MobileEngine.user + ':' + config.MobileEngine.pass,
          json: true,
          query: {filepath:'mobileEngineDeleteTest.jpg'}
        })
        .then((response) => {

                if(response.body.status === 'warn'){
                    done();
                }
                else{
                    done(new Error("Test failed to delete image, image deleted by after hook"));
                }


        })
        .catch((err) => {
            done();
        });


    });

    describe('Delete Image by filepath', function() {
        
        it('Should return a call with status "ok"', function(done) {

            mobileengine.delete({filepath:'mobileEngineDeleteTest.jpg'}, function(err, data) {
                
                if(err){
                    done(err);
                }
                else{
                    done();
                }

            });

        });

    });

});

