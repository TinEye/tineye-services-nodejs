const config = require("../testConfig.js");
const FormData = require("form-data");
const fs = require("fs");
const got = require("got");
const { MatchEngine } = require("../../../tineye-services");
const mocha = require("mocha");

const matchengine = new MatchEngine(
  config.MatchEngine.user,
  config.MatchEngine.pass,
  "",
  config.MatchEngine.url
);

describe("MatchEngine Ping:", function() {
  //Set timeout to 5s
  this.timeout(15000);

  describe("Check Server Ping", function() {
    it('Should return a call with status "ok"', function(done) {
      matchengine.ping(function(err, data) {
        if (err) {
          done(err);
        } else if (data.status === "ok") {
          done();
        } else {
          done(new Error("Server failed to return ping response"));
        }
      });
    });
  });
});
