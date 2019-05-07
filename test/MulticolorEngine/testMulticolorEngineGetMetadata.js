const async = require("async");
const config = require("../testConfig.js");
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

describe("MulticolorEngine Search and Return Metadata:", function() {
  // Set timeout to 5s
  this.timeout(15000);

  var colorsPath = __dirname + "/../colors.png";
  var bluePath = __dirname + "/../blue.png";
  var purplePath = __dirname + "/../purple.png";
  var greensPath = __dirname + "/../greens.png";

  var images = {
    colorsPath: {
      imagePath: colorsPath,
      filePath: "multicolorEngineGetMetadataColors.jpg"
    },
    bluePath: {
      imagePath: bluePath,
      filePath: "multicolorEngineGetMetadataBlue.jpg"
    },
    greensPath: {
      imagePath: bluePath,
      filePath: "multicolorEngineGetMetadataGreens.jpg"
    },
    purplePath: {
      imagePath: purplePath,
      filePath: "multicolorEngineGetMetadataPurple.jpg"
    }
  };

  // Post an image to the collection manually
  before(function(done) {
    async.forEachOfSeries(
      images,
      function(value, key, callback) {
        var form = new FormData();
        form.append("image", fs.createReadStream(value.imagePath));
        form.append("filepath", value.filePath);

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
              callback();
            } else {
              callback(
                new Error("Before hook failed to add image: " + response.data)
              );
            }
          })
          .catch(error => {
            callback(error);
          });
      },
      function(err, results) {
        if (err) {
          done(err);
        } else {
          done();
        }
      }
    );
  });

  // Make call to delete images after tests
  after(function(done) {
    async.forEachOfSeries(
      images,
      function(value, key, callback) {
        axios
          .delete(config.MulticolorEngine.url + "delete", {
            auth: {
              username: config.MulticolorEngine.user,
              password: config.MulticolorEngine.pass
            },
            params: { filepath: value.filePath }
          })
          .then(response => {
            if (response.data.status === "ok") {
              callback();
            } else {
              callback(
                new Error("Before hook failed to add image: " + response.data)
              );
            }
          })
          .catch(err => {
            callback(err);
          });
      },
      function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      }
    );
  });

  describe("Call getMetadata", function() {
    it('Should return a call with status "ok"', function(done) {
      multicolorengine.getMetadata(
        { filepaths: ["multicolorEngineGetMetadataGreens.jpg"] },
        function(err, data) {
          if (err) {
            done(new Error(JSON.stringify(err, null, 4)));
          } else if (data.status === "ok") {
            done();
          } else {
            done(new Error("Result returned:" + JSON.stringify(data, null, 4)));
          }
        }
      );
    });
  });

  describe("Call getSearchMetaData", function() {
    it('Should return a call with status "ok"', function(done) {
      multicolorengine.getSearchMetadata(null, function(err, data) {
        if (err) {
          done(new Error(JSON.stringify(err, null, 4)));
        } else if (data.status === "ok") {
          done();
        } else {
          done(new Error("Result returned:" + JSON.stringify(data, null, 4)));
        }
      });
    });
  });

  describe("Call getReturnMetaData", function() {
    it('Should return a call with status "ok"', function(done) {
      multicolorengine.getReturnMetadata(null, function(err, data) {
        if (err) {
          done(new Error(JSON.stringify(err, null, 4)));
        } else if (data.status === "ok") {
          done();
        } else {
          done(new Error("Result returned:" + JSON.stringify(data, null, 4)));
        }
      });
    });
  });
});
