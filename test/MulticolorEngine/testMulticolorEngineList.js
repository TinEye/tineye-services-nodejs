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

describe("MulticolorEngine List", function() {
  //Set timeout to 5s
  this.timeout(10000);

  //post an image to the collection manually
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream(__dirname + "/../image.jpg"));
    form.append("filepath", "multicolorEngineListTest.jpg");

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

  //delete manually
  after(function(done) {
    axios
      .delete(config.MulticolorEngine.url + "delete", {
        auth: {
          username: config.MulticolorEngine.user,
          password: config.MulticolorEngine.pass
        },
        params: { filepath: "multicolorEngineListTest.jpg" }
      })
      .then(response => {
        if (response.data.status === "ok") {
          done();
        } else {
          done(new Error("After hook failed to delete image"));
        }
      })
      .catch(err => {
        done(new Error("After hook failed to delete image"));
      });
  });

  describe("Get list of collection", function() {
    it('Should return a call with status "ok" and list multicolorEngineListTest.jpg', function(done) {
      multicolorengine.list(null, function(err, data) {
        if (err) {
          done();
        } else if (data.result.contains("multicolorEngineListTest.jpg")) {
          done(err);
        } else {
          done(new Error("Response does not contain image.jpg"));
        }
      });
    });
  });
});
