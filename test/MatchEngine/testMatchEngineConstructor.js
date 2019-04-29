const chai = require("chai");
const config = require("../testConfig.js");
const { MatchEngine } = require("../../../tineye-services");
const mocha = require("mocha");

describe("MatchEngine URL/CompanyName Constructor:", function() {
  //Set timeout to 5s
  this.timeout(15000);

  describe("Create a Match Engine with URL", function() {
    it("Should return true when the server is pinged", function(done) {
      var matchengine = new MatchEngine(
        config.MatchEngine.user,
        config.MatchEngine.pass,
        "",
        config.MatchEngine.url
      );

      matchengine.ping(function(err, data) {
        try {
          chai.assert.isOk(data, "Data not returned");
          chai.assert(
            data.status === "ok",
            "Status not ok: " + JSON.stringify(data)
          );
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });

  describe("Create a Match Engine with Compnay Name", function() {
    it("Should return true when the server is pinged", function(done) {
      var matchengine2 = new MatchEngine(
        config.MatchEngine.user,
        config.MatchEngine.pass,
        config.MatchEngine.companyName
      );

      matchengine2.ping(function(err, data) {
        try {
          chai.assert.isOk(data, "Data not returned");
          chai.assert(
            data.status === "ok",
            "Status not ok: " + JSON.stringify(data)
          );
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });
});
