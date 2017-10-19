const chai = require('chai');
const config = require('../testConfig.js');
const { MobileEngine }= require('../../../tineye-services');
const mocha = require('mocha');


describe('MobileEngine URL/CompanyName Constructor:', function() {

    //Set timeout to 5s
    this.timeout(15000);

    describe('Create a Mobile Engine with URL', function() {

        it('Should return true when the server is pinged', function(done) {

            var mobileengine = new MobileEngine(
                config.MatchEngine.user, 
                config.MatchEngine.pass, 
                '', 
                config.MatchEngine.url);

            mobileengine.ping(function(err, data) {

                try {
                    chai.assert.isOk(data, 'Data not returned');
                    chai.assert(data.status === 'ok','Status not ok: ' +  JSON.stringify(data));
                    done();
                } catch(err) {
                    done(err);
                }

            });

        });

    });

   describe('Create a Mobile Engine with Compnay Name', function() {

        it('Should return true when the server is pinged', function(done) {

            var mobileengine2 = new MobileEngine(
                config.MatchEngine.user, 
                config.MatchEngine.pass, 
                config.MatchEngine.companyName );

            mobileengine2.ping(function(err, data) {

                try {
                    chai.assert.isOk(data, 'Data not returned');
                    chai.assert(data.status === 'ok','Status not ok: ' +  JSON.stringify(data));
                    done();
                } catch(err) {
                    done(err);
                }

            });

        });

    });

});
