const axios = require("axios");
const FormData = require("form-data");
const { MobileEngine } = require("../../../tineye-services");
const fs = require("fs");
var config = require("../testConfig.js");

var mobileengine = new MobileEngine(
  config.MobileEngine.user,
  config.MobileEngine.pass,
  "",
  config.MobileEngine.url
);

describe("MobileEngine List:", function() {
  // Set timeout to 5s
  this.timeout(10000);

  // Post an image to the collection
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream("./test/image.jpg"));
    form.append("filepath", "mobileEngineListTest.jpg");

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
        console.log(error);
        done(error);
      });
  });

  // Delete manually
  after(function(done) {
    axios
      .delete(config.MobileEngine.url + "delete", {
        auth: {
          username: config.MobileEngine.user,
          password: config.MobileEngine.pass
        },
        params: { filepath: "mobileEngineListTest.jpg" }
      })
      .then(response => {
        if (response.body.status === "ok") {
          done();
        } else {
          done(new Error("After hook failed to delete added image"));
        }
      })
      .catch(err => {
        done();
      });
  });

  describe("Get list of collection", function() {
    it('Should return a call with status "ok" and list mobileEngineListTest.jpg', function(done) {
      mobileengine.list({ filepath: "mobileEngineListTest.jpg" }, function(
        err,
        data
      ) {
        if (err) {
          done();
        } else if (data.result.contains("mobileEngineListTest.jpg")) {
          done(err);
        } else {
          done(new Error("Response does not contain image.jpg"));
        }
      });
    });
  });
});
