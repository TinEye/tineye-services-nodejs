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

describe("WineEngine Count:", function() {
  //Set timeout to 5s
  this.timeout(10000);

  //post an image to the collection manually
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream(__dirname + "/../image.jpg"));
    form.append("filepath", "wineEngineCountTest.jpg");

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

  //make call to delete image after each add
  after(function(done) {
    axios
      .get(config.WineEngine.url + "delete", {
        auth: {
          username: config.WineEngine.user,
          password: config.WineEngine.pass
        },
        params: { filepath: "wineEngineCountTest.jpg" }
      })
      .then(response => {
        if (response.data.status !== "ok") {
          done(
            new Error("Error Deleting Image: " + JSON.stringify(response.data))
          );
        } else {
          done();
        }
      })
      .catch(err => {
        done(new Error("Failed to Delete Image in after hook: " + err));
      });
  });

  describe("Get a count of total images", function() {
    it('Should return a call with status "ok" and a result > 0', function(done) {
      wineengine.count(null, function(err, data) {
        if (err) {
          done(err);
        } else if (data.result[0] > 0) {
          done();
        } else {
          done(
            new Error(
              "Response does not contain image.jpg: " + JSON.stringify(data)
            )
          );
        }
      });
    });
  });
});
