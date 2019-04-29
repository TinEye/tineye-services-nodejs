const async = require("async");
const config = require("../testConfig.js");
const FormData = require("form-data");
const fs = require("fs");
const got = require("got");
const { MulticolorEngine } = require("../../../tineye-services");
const mocha = require("mocha");
const libxmljs = require("libxmljs");
const chai = require("chai");

var multicolorengine = new MulticolorEngine(
  config.MulticolorEngine.user,
  config.MulticolorEngine.pass,
  "",
  config.MulticolorEngine.url
);

describe("MulticolorEngine Search:", function() {
  //Set timeout to 15s
  this.timeout(15000);

  var colorsPath = __dirname + "/../colors.png";
  var bluePath = __dirname + "/../blue.png";
  var purplePath = __dirname + "/../purple.png";
  var greensPath = __dirname + "/../greens.png";

  var images = {
    colorsPath: {
      imagePath: colorsPath,
      filePath: "multicolorEngineSearchColors.jpg"
    },
    bluePath: {
      imagePath: bluePath,
      filePath: "multicolorEngineSearchBlue.jpg"
    },
    greensPath: {
      imagePath: bluePath,
      filePath: "multicolorEngineSearchGreens.jpg"
    },
    purplePath: {
      imagePath: purplePath,
      filePath: "multicolorEngineSearchPurple.jpg"
    }
  };

  //post an image to the collection manually
  before(function(done) {
    async.forEachOfSeries(
      images,
      function(value, key, callback) {
        var form = new FormData();
        form.append("image", fs.createReadStream(value.imagePath));
        form.append("filepath", value.filePath);

        got
          .post(config.MulticolorEngine.url + "add", {
            auth:
              config.MulticolorEngine.user + ":" + config.MulticolorEngine.pass,
            body: form,
            json: true
          })
          .then(response => {
            if (response.body.status === "ok") {
              callback();
            } else {
              callback(
                new Error("Before hook failed to add image: " + response.body)
              );
            }
          })
          .catch(error => {
            callback(err);
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

  //make call to delete images after tests
  after(function(done) {
    async.forEachOfSeries(
      images,
      function(value, key, callback) {
        var form = new FormData();
        form.append("image", fs.createReadStream(value.imagePath));
        form.append("filepath", value.filePath);

        got
          .delete(config.MulticolorEngine.url + "delete", {
            auth:
              config.MulticolorEngine.user + ":" + config.MulticolorEngine.pass,
            json: true,
            query: { filepath: value.filePath }
          })
          .then(response => {
            if (response.body.status === "ok") {
              callback();
            } else {
              callback(
                new Error("Before hook failed to add image: " + response.body)
              );
            }
          })
          .catch(err => {
            callback(err);
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

  //serach with weights
  describe("Search with a single color green(#1abc9c)", function() {
    it('Should return a call with status "ok" and 1 result', function(done) {
      params = {
        colors: ["#1abc9c"]
      };

      multicolorengine.search(params, function(err, data) {
        if (err) {
          done(new Error(err.message[0]));
        } else if (data.result.length === 1) {
          done();
        } else {
          done(
            new Error("Result returned:" + JSON.stringify(data.result, null, 4))
          );
        }
      });
    });
  });

  //serach with weights
  describe("Search with a more than one color (#f1c40f and #e74c3c)", function() {
    it('Should return a call with status "ok" and a single result', function(done) {
      params = {
        colors: ["#f1c40f", "#e74c3c"]
      };

      multicolorengine.search(params, function(err, data) {
        try {
          chai.expect(data.result.length).to.be.at.least(1);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });

  //serach with weights
  describe("Search with a more than one color (#f1c40f and #e74c3c) and weights(30 and 70)", function() {
    it('Should return a call with status "ok" and a result', function(done) {
      params = {
        colors: ["#f1c40f", "#e74c3c"],
        weights: [30, 70]
      };

      multicolorengine.search(params, function(err, data) {
        try {
          chai.expect(data.result.length).to.be.at.least(1);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });

  // //serach with file
  describe("Search by image file", function() {
    it('Should return a call with status "ok" and 3 results', function(done) {
      multicolorengine.search({ image: bluePath }, function(err, data) {
        if (err) {
          done(new Error(err.message[0]));
        } else if (data.result.length === 3) {
          done();
        } else {
          done(
            new Error("Result returned:" + JSON.stringify(data.result, null, 4))
          );
        }
      });
    });
  });

  // //serach with file
  describe("Search by collection image filepath", function() {
    it('Should return a call with status "ok" and 3 results', function(done) {
      multicolorengine.search(
        { filepath: "multicolorEngineSearchGreens.jpg" },
        function(err, data) {
          if (err) {
            done(new Error(err.message[0]));
          } else if (data.result.length === 3) {
            done();
          } else {
            done(
              new Error(
                "Result returned:" + JSON.stringify(data.result, null, 4)
              )
            );
          }
        }
      );
    });
  });
});
