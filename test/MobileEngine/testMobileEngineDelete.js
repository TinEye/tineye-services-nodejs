var config = require("../testConfig.js");
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
const { MobileEngine } = require("../../../tineye-services");

var mobileengine = new MobileEngine(
  config.MobileEngine.user,
  config.MobileEngine.pass,
  "",
  config.MobileEngine.url
);

describe("MobileEngine Delete:", function() {
  //Set timeout to 5s
  this.timeout(5000);

  //post an image to the collection for deletion
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream(__dirname + "/../image.jpg"));
    form.append("filepath", "mobileEngineDeleteTest.jpg");

    axios
      .post(config.MobileEngine.url + "add", form, {
        auth: {
          username: config.MobileEngine.user,
          password: config.MobileEngine.pass
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

  //post an image to the collection for deletion
  after(function(done) {
    axios
      .delete(config.MobileEngine.url + "delete", {
        auth: {
          username: config.MobileEngine.user,
          password: config.MobileEngine.pass
        },
        params: { filepath: "mobileEngineDeleteTest.jpg" }
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
      mobileengine.delete({ filepath: "mobileEngineDeleteTest.jpg" }, function(
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
