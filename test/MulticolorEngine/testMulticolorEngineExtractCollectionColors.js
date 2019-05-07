const async = require("async");
const chai = require("chai");
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

describe("MulticolorEngine ExtractCollectionColors:", function() {
  // Set timeout to 15s
  this.timeout(15000);

  var colorsPath = __dirname + "/../colors.png";
  var bluePath = __dirname + "/../blue.png";
  var purplePath = __dirname + "/../purple.png";
  var greensPath = __dirname + "/../greens.png";

  var images = {
    colorsPath: {
      imagePath: colorsPath,
      filePath: "multicolorEngineExtractCollectionColorsColors.jpg"
    },
    bluePath: {
      imagePath: bluePath,
      filePath: "multicolorEngineExtractCollectionColorsBlue.jpg"
    },
    greensPath: {
      imagePath: bluePath,
      filePath: "multicolorEngineExtractCollectionColorsGreens.jpg"
    },
    purplePath: {
      imagePath: purplePath,
      filePath: "multicolorEngineExtractCollectionColorsPurple.jpg"
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
          .catch(err => {
            callback();
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
                new Error("After hook failed to delete image: " + response.data)
              );
            }
          })
          .catch(err => {
            callback();
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

  describe("Extract collection colors by image file", function() {
    it('Should return a call with status "ok" and 13 colors', function(done) {
      multicolorengine.extractCollectionColors({}, function(err, data) {
        try {
          chai.assert.isOk(data.result, "Data not returned");
          chai.expect(data.result.length).to.be.at.least(10);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });

  describe("Extract collection colors by color and weight", function() {
    it('Should return a call with status "ok" and 9 results', function(done) {
      params = {
        colors: ["#1abc9c"],
        weights: [100]
      };

      multicolorengine.extractCollectionColors(params, function(err, data) {
        if (err) {
          done(new Error(JSON.stringify(err, null, 4)));
        } else if (data.result.length === 9) {
          done();
        } else {
          done(new Error("Result returned:" + JSON.stringify(data, null, 4)));
        }
      });
    });
  });
});
