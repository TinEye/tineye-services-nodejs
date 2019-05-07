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

describe("MatchEngine List", function() {
  // Set timeout to 5s
  this.timeout(5000);

  // Post an image to the collection manually
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream(__dirname + "/../image.jpg"));
    form.append("filepath", "matchEngineListTest.jpg");

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

  // Delete manually
  after(function(done) {
    axios
      .delete(config.MatchEngine.url + "delete", {
        auth: {
          username: config.MatchEngine.user,
          password: config.MatchEngine.pass
        },
        params: { filepath: "matchEngineListTest.jpg" }
      })
      .then(response => {
        if (response.data.status === "ok") {
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
    it('Should return a call with status "ok" and list matchEngineListTest.jpg', function(done) {
      matchengine.list(null, function(err, data) {
        if (err) {
          done();
        } else if (data.result.contains("matchEngineListTest.jpg")) {
          done(err);
        } else {
          done(new Error("Response does not contain image.jpg"));
        }
      });
    });
  });
});
