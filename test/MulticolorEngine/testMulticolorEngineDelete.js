var config = require("../testConfig.js");
const FormData = require("form-data");
const fs = require("fs");
const got = require("got");
const { MulticolorEngine } = require("../../../tineye-services");
var mocha = require("mocha");

var multicolorengine = new MulticolorEngine(
  config.MulticolorEngine.user,
  config.MulticolorEngine.pass,
  "",
  config.MulticolorEngine.url
);

describe("MulticolorEngine Delete:", function() {
  //Set timeout to 5s
  this.timeout(10000);

  //post an image to the collection for testing
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream(__dirname + "/../image.jpg"));
    form.append("filepath", "multicolorEngineDeleteTest.jpg");

    got
      .post(config.MulticolorEngine.url + "add", {
        auth: config.MulticolorEngine.user + ":" + config.MulticolorEngine.pass,
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

  //Delete files added to the collection
  after(function(done) {
    got
      .delete(config.MulticolorEngine.url + "delete", {
        auth: config.MulticolorEngine.user + ":" + config.MulticolorEngine.pass,
        json: true,
        query: { filepath: "multicolorEngineDeleteTest.jpg" }
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
