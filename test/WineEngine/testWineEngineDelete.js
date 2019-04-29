var config = require("../testConfig.js");
const FormData = require("form-data");
const fs = require("fs");
const got = require("got");
const { WineEngine } = require("../../../tineye-services");
var mocha = require("mocha");

var wineengine = new WineEngine(
  config.WineEngine.user,
  config.WineEngine.pass,
  "",
  config.WineEngine.url
);

describe("WineEngine Delete:", function() {
  //Set timeout to 5s
  this.timeout(10000);

  //post an image to the collection for deletion
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream(__dirname + "/../image.jpg"));
    form.append("filepath", "wineEngineDeleteTest.jpg");

    got
      .post(config.WineEngine.url + "add", {
        auth: config.WineEngine.user + ":" + config.WineEngine.pass,
        body: form,
        json: true
      })
      .then(response => {
        if (response.body.status !== "ok") {
          done(
            new Error("Error Adding Image: " + JSON.stringify(response.body))
          );
        } else {
          done();
        }
      })
      .catch(error => {
        done(error);
      });
  });

  //post an image to the collection for deletion
  after(function(done) {
    got
      .delete(config.WineEngine.url + "delete", {
        auth: config.WineEngine.user + ":" + config.WineEngine.pass,
        json: true,
        query: { filepath: "wineEngineDeleteTest.jpg" }
      })
      .then(response => {
        if (response.body.status === "warn") {
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
