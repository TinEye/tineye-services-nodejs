const chai = require("chai");
const config = require("../testConfig.js");
const { WineEngine } = require("../../../tineye-services");

describe("MobileEngine URL/CompanyName Constructor:", function() {
  // Set timeout to 5s
  this.timeout(15000);

  describe("Create a Mobile Engine with URL", function() {
    it("Should return true when the server is pinged", function(done) {
      var wineengine = new WineEngine(
        config.WineEngine.user,
        config.WineEngine.pass,
        "",
        config.WineEngine.url
      );

      wineengine.ping(function(err, data) {
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

  describe("Create a Mobile Engine with Compnay Name", function() {
    it("Should return true when the server is pinged", function(done) {
      var wineengine2 = new WineEngine(
        config.WineEngine.user,
        config.WineEngine.pass,
        config.WineEngine.companyName
      );

      wineengine2.ping(function(err, data) {
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
