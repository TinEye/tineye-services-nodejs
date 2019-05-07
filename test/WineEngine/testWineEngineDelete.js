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

describe("WineEngine Delete:", function() {
  // Set timeout to 5s
  this.timeout(10000);

  // Post an image to the collection for deletion
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream(__dirname + "/../image.jpg"));
    form.append("filepath", "wineEngineDeleteTest.jpg");

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

  // Post an image to the collection for deletion
  after(function(done) {
    axios
      .delete(config.WineEngine.url + "delete", {
        auth: {
          username: config.WineEngine.user,
          password: config.WineEngine.pass
        },
        params: { filepath: "wineEngineDeleteTest.jpg" }
      })
      .then(response => {
        if (response.data.status === "warn") {
          done();
        } else {
          done(
            new Error(
              "Test failed to delete image, image deleted by after hook"
            )
          );
        }
      })
      .catch(err => {
        done();
      });
  });

  describe("Delete Image by filepath", function() {
    it('Should return a call with status "ok"', function(done) {
      wineengine.delete({ filepath: "wineEngineDeleteTest.jpg" }, function(
        err,
        data
      ) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
  });
});
