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

describe("MatchEngine Delete:", function() {
  // Set timeout to 5s
  this.timeout(5000);

  // Post an image to the collection for deletion
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream(__dirname + "/../image.jpg"));
    form.append("filepath", "matchEngineDeleteTest.jpg");

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

  // Post an image to the collection for deletion
  after(function(done) {
    axios
      .delete(config.MatchEngine.url + "delete", {
        auth: {
          username: config.MatchEngine.user,
          password: config.MatchEngine.pass
        },
        params: { filepath: "matchEngineDeleteTest.jpg" }
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
      matchengine.delete({ filepath: "matchEngineDeleteTest.jpg" }, function(
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
