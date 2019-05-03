const config = require("../testConfig.js");
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
const { WineEngine } = require("../../../tineye-services");

var wineengine = new WineEngine(
  config.WineEngine.user,
  config.WineEngine.pass,
  "",
  config.WineEngine.url
);

describe("WineEngine Search:", function() {
  //Set timeout to 5s
  this.timeout(10000);

  var birdFilePath = __dirname + "/../image2.jpg";
  var melonCatFilePath = __dirname + "/../image3.jpg";

  //post an image to the collection manually
  before(function(done) {
    var form = new FormData();

    form.append("image", fs.createReadStream(birdFilePath));
    form.append("filepath", "wineEngineSearchTest1.jpg");

    axios
      .post(config.WineEngine.url + "add", form, {
        auth: {
          username: config.WineEngine.user,
          password: config.WineEngine.pass
        },
        headers: form.getHeaders()
      })
      .then(response => {
        if (response.data.status !== "ok") {
          done(
            new Error("Error Adding Image: " + JSON.stringify(response.data))
          );
        } else {
          done();
        }
      })
      .catch(error => {
        done(error);
      });
  });

  //make call to delete images after tests
  after(function(done) {
    axios
      .delete(config.WineEngine.url + "delete", {
        auth: {
          username: config.WineEngine.user,
          password: config.WineEngine.pass
        },
        params: { filepath: "wineEngineSearchTest1.jpg" }
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

  describe("Search Image by filepath", function() {
    it('Should return a call with status "ok" and a result', function(done) {
      wineengine.search({ filepath: "wineEngineSearchTest1.jpg" }, function(
        err,
        data
      ) {
        if (err) {
          done(new Error(err));
        } else if (data.result.length > 0) {
          done();
        } else {
          done(new Error("No Result was returned"));
        }
      });
    });
  });

  describe("Search Image by file", function() {
    it('Should return a call with status "ok" and a result', function(done) {
      wineengine.search({ image: birdFilePath }, function(err, data) {
        if (err) {
          done(err);
        } else if (data.result.length > 0) {
          done();
        } else {
          done(new Error("No Result was returned"));
        }
      });
    });
  });

  describe("Search for image that is not in collection by File", function() {
    it('Should return a call with status "ok" and no result', function(done) {
      wineengine.search({ image: melonCatFilePath }, function(err, data) {
        if (err) {
          done(new Error(err));
        } else if (data.result.length === 0) {
          done();
        } else {
          done(new Error("A non error status was returned"));
        }
      });
    });
  });
});
