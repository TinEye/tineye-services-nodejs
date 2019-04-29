var config = require("../testConfig.js");
const FormData = require("form-data");
const fs = require("fs");
const got = require("got");
const { MobileEngine } = require("../../../tineye-services");
var mocha = require("mocha");

var mobileengine = new MobileEngine(
  config.MobileEngine.user,
  config.MobileEngine.pass,
  "",
  config.MobileEngine.url
);

describe("MobileEngine Count:", function() {
  //Set timeout to 5s
  this.timeout(5000);

  //post an image to the collection manually
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream(__dirname + "/../image.jpg"));
    form.append("filepath", "mobileEngineCountTest.jpg");

    got
      .post(config.MobileEngine.url + "add", {
        auth: config.MobileEngine.user + ":" + config.MobileEngine.pass,
        body: form,
        json: true
      })
      .then(response => {
        if (response.body.status === "ok") {
          done();
        } else {
          done(new Error("Before hook failed to add image: " + response.body));
        }
      })
      .catch(error => {
        done(error);
      });
  });

  //make call to delete image after each add
  after(function(done) {
    got
      .delete(config.MobileEngine.url + "delete", {
        auth: config.MobileEngine.user + ":" + config.MobileEngine.pass,
        json: true,
        query: { filepath: "mobileEngineCountTest.jpg" }
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

  describe("Get a count of total images", function() {
    it('Should return a call with status "ok" and a result > 0', function(done) {
      mobileengine.count(null, function(err, data) {
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
