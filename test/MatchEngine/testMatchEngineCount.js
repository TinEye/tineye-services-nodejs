const config = require("../testConfig.js");
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
const { MatchEngine } = require("../../../tineye-services");

const matchengine = new MatchEngine(
  config.MatchEngine.user,
  config.MatchEngine.pass,
  "",
  config.MatchEngine.url
);

describe("MatchEngine Count:", function() {
  // Set timeout to 5s
  this.timeout(5000);

  // Post an image to the collection manually
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream(__dirname + "/../image.jpg"));
    form.append("filepath", "matchEngineCountTest.jpg");

    axios
      .post(config.MatchEngine.url + "add", form, {
        auth: {
          username: config.MatchEngine.user,
          password: config.MatchEngine.pass
        },
        headers: form.getHeaders()
      })
      .then(response => {
        if (response.data.status === "ok") {
          done();
        } else {
          done(new Error("Before hook failed to add image: " + response.data));
        }
      })
      .catch(error => {
        done(error);
      });
  });

  // Make call to delete image after each add
  after(function(done) {
    axios
      .delete(config.MatchEngine.url + "delete", {
        auth: {
          username: config.MatchEngine.user,
          password: config.MatchEngine.pass
        },
        params: { filepath: "matchEngineCountTest.jpg" }
      })
      .then(response => {
        if (response.data.status !== "ok") {
          done(new Error("After hook failed to delete added image"));
        } else {
          done();
        }
      })
      .catch(err => {
        done();
      });
  });

  describe("Get a count of total images", function() {
    it('Should return a call with status "ok" and a result > 0', function(done) {
      matchengine.count(null, function(err, data) {
        if (err) {
          done(err);
        } else if (data.result[0] > 0) {
          done();
        } else {
          done(new Error("Response does not contain image.jpg"));
        }
      });
    });
  });
});
