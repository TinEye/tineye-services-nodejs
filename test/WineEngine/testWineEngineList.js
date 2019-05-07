var config = require("../testConfig.js");
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
const { WineEngine } = require("../../../tineye-services");

var wineengine = new WineEngine(
  config.WineEngine.user,
  config.WineEngine.pass,
  "",
  config.WineEngine.url
);

describe("WineEngine List", function() {
  // Set timeout to 5s
  this.timeout(10000);

  // Post an image to the collection manually
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream(__dirname + "/../image.jpg"));
    form.append("filepath", "wineEngineListTest.jpg");

    axios
      .post(config.WineEngine.url + "add", form, {
        auth: {
          username: config.WineEngine.user,
          password: config.WineEngine.pass
        },
        headers: form.getHeaders()
      })
      .then(response => {
        if (response.data.status !== "ok") {
          done(
            new Error("Error Adding Image: " + JSON.stringify(response.data))
          );
        } else {
          done();
        }
      })
      .catch(error => {
        done(error);
      });
  });

  // Delete manually
  after(function(done) {
    axios
      .delete(config.WineEngine.url + "delete", {
        auth: {
          username: config.WineEngine.user,
          password: config.WineEngine.pass
        },
        params: { filepath: "wineEngineListTest.jpg" }
      })
      .then(response => {
        if (response.body.status === "ok") {
          done();
        } else {
          done(new Error("After hook failed to delete image"));
        }
      })
      .catch(err => {
        done();
      });
  });

  describe("Get list of collection", function() {
    it('Should return a call with status "ok" and list wineEngineListTest.jpg', function(done) {
      wineengine.list(null, function(err, data) {
        if (err) {
          done();
        } else if (data.result.contains("wineEngineListTest.jpg")) {
          done(err);
        } else {
          done(new Error("Response does not contain image.jpg"));
        }
      });
    });
  });
});
