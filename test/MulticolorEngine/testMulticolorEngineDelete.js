var config = require("../testConfig.js");
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
const { MulticolorEngine } = require("../../../tineye-services");

var multicolorengine = new MulticolorEngine(
  config.MulticolorEngine.user,
  config.MulticolorEngine.pass,
  "",
  config.MulticolorEngine.url
);

describe("MulticolorEngine Delete:", function() {
  // Set timeout to 5s
  this.timeout(10000);

  // Post an image to the collection for testing
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream(__dirname + "/../image.jpg"));
    form.append("filepath", "multicolorEngineDeleteTest.jpg");

    axios
      .post(config.MulticolorEngine.url + "add", form, {
        auth: {
          username: config.MulticolorEngine.user,
          password: config.MulticolorEngine.pass
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

  // Delete files added to the collection
  after(function(done) {
    axios
      .delete(config.MulticolorEngine.url + "delete", {
        auth: {
          username: config.MulticolorEngine.user,
          password: config.MulticolorEngine.pass
        },
        params: { filepath: "multicolorEngineDeleteTest.jpg" }
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
      multicolorengine.delete(
        { filepath: "multicolorEngineDeleteTest.jpg" },
        function(err, data) {
          if (err) {
            done(err);
          } else {
            done();
          }
        }
      );
    });
  });
});
