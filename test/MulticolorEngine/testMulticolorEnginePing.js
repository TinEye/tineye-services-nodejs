var config = require("../testConfig.js");
const { MulticolorEngine } = require("../../../tineye-services");

var multicolorengine = new MulticolorEngine(
  config.MulticolorEngine.user,
  config.MulticolorEngine.pass,
  "",
  config.MulticolorEngine.url
);

describe("MulticolorEngine Ping:", function() {
  //Set timeout to 5s
  this.timeout(10000);

  describe("Check Server Ping", function() {
    it('Should return a call with status "ok"', function(done) {
      multicolorengine.ping(function(err, data) {
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
