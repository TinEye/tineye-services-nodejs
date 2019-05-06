const config = require("../testConfig.js");
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

describe("MobileEngine Compare:", function() {
  //Set timeout to 5s
  this.timeout(5000);

  var melonCatUrl = "http://tineye.com/images/meloncat.jpg";
  var birdFilePath = __dirname + "/../image2.jpg";

  //post an image to the collection manually
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream(birdFilePath));
    form.append("filepath", "mobileEngineCompareTest.jpg");

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

  //make call to delete image after each add
  after(function(done) {
    axios
      .delete(config.MobileEngine.url + "delete", {
        auth: {
          username: config.MobileEngine.user,
          password: config.MobileEngine.pass
        },
        params: { filepath: "mobileEngineCompareTest.jpg" }
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
      mobileengine.compare({ url1: melonCatUrl, url2: melonCatUrl }, function(
        err,
        data
      ) {
        if (err) {
          done(err);
        } else if (data.result) {
          done();
        } else {
          done(new Error("No Result was returned"));
        }
      });
    });
  });

  describe("Compare the same image by URL and filepath", function() {
    it('Should return a call with status "ok" and a empty result', function(done) {
      mobileengine.compare(
        { url1: melonCatUrl, filepath2: "mobileEngineCompareTest.jpg" },
        function(err, data) {
          if (err) {
            done(err);
          } else if (!data.result[0]) {
            done();
          } else {
            done(new Error("No Result was returned"));
          }
        }
      );
    });
  });

  describe("Compare 2 images by File and filepath", function() {
    it('Should return a call with status "ok" and a non-empty result', function(done) {
      mobileengine.compare(
        { image1: birdFilePath, filepath2: "mobileEngineCompareTest.jpg" },
        function(err, data) {
          if (err) {
            done(err);
          } else if (data.result) {
            done();
          } else {
            done(new Error("No Result was returned"));
          }
        }
      );
    });
  });
});
