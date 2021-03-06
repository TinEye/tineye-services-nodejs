const chai = require("chai");
const config = require("../testConfig.js");
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
const { MatchEngine } = require("../../../tineye-services");
const mocha = require("mocha");

const matchengine = new MatchEngine(
  config.MatchEngine.user,
  config.MatchEngine.pass,
  "",
  config.MatchEngine.url
);

describe("MatchEngine Compare:", function() {
  // Set timeout to 5s
  this.timeout(5000);

  var melonCatUrl = "http://tineye.com/images/meloncat.jpg";
  var melonCatFilePath = __dirname + "/../image2.jpg";
  var birdFilePath = __dirname + "/../image2.jpg";

  // Post an image to the collection manually
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream(birdFilePath));
    form.append("filepath", "matchEngineCompareTest.jpg");

    axios
      .post(config.MatchEngine.url + "add", form, {
        auth: {
          username: config.MatchEngine.user,
          password: config.MatchEngine.pass
        },
        headers: form.getHeaders()
      })
      .then(response => {
        headers: form.getHeaders();
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

  // Make call to delete image after each add
  after(function(done) {
    axios
      .delete(config.MatchEngine.url + "delete", {
        auth: {
          username: config.MatchEngine.user,
          password: config.MatchEngine.pass
        },
        params: { filepath: "matchEngineCompareTest.jpg" }
      })
      .then(response => {
        if (response.data.status === "ok") {
          done();
        } else {
          done(new Error("After hook failed to delete added image"));
        }
      })
      .catch(err => {
        done();
      });
  });

  describe("Compare the same image by URL", function() {
    it('Should return a call with status "ok" and a non-empty result', function(done) {
      matchengine.compare({ url1: melonCatUrl, url2: melonCatUrl }, function(
        err,
        data
      ) {
        try {
          chai.assert.isOk(data, "Data not returned");
          chai.assert(
            data.status === "ok",
            "Status not ok: " + JSON.stringify(data)
          );
          chai.assert.isOk(data.result, "Result not returned");
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });

  describe("Compare the same image by URL and filepath", function() {
    it('Should return a call with status "ok" and a empty result', function(done) {
      matchengine.compare(
        { url1: melonCatUrl, filepath2: "matchEngineCompareTest.jpg" },
        function(err, data) {
          try {
            chai.assert.isOk(data, "Data not returned");
            chai.assert(
              data.status === "ok",
              "Status not ok: " + JSON.stringify(data)
            );
            chai.assert.isNotOk(data.result[0], "Result returned");
            done();
          } catch (err) {
            done(err);
          }
        }
      );
    });
  });

  describe("Compare 2 images by File and filepath", function() {
    it('Should return a call with status "ok" and a non-empty result', function(done) {
      matchengine.compare(
        { image1: birdFilePath, filepath2: "matchEngineCompareTest.jpg" },
        function(err, data) {
          try {
            chai.assert.isOk(data, "Data not returned");
            chai.assert(
              data.status === "ok",
              "Status not ok: " + JSON.stringify(data)
            );
            chai.assert.isOk(data.result, "Result not returned");
            done();
          } catch (err) {
            done(err);
          }
        }
      );
    });
  });
});
