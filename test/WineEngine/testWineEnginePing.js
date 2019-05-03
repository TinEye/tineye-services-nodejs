var config = require("../testConfig.js");
const { WineEngine } = require("../../../tineye-services");

var wineengine = new WineEngine(
  config.WineEngine.user,
  config.WineEngine.pass,
  "",
  config.WineEngine.url
);

describe("WineEngine Ping:", function() {
  //Set timeout to 5s
  this.timeout(10000);

  describe("Check Server Ping", function() {
    it('Should return a call with status "ok"', function(done) {
      wineengine.ping(function(err, data) {
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
