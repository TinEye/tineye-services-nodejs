const chai = require("chai");
const config = require("../testConfig.js");
const axios = require("axios");
const { MobileEngine } = require("../../../tineye-services");
const libxmljs = require("libxmljs");

var mobileengine = new MobileEngine(
  config.MobileEngine.user,
  config.MobileEngine.pass,
  "",
  config.MobileEngine.url
);

describe("MobileEngine Add:", function() {
  // Set timeout to 5s
  this.timeout(5000);

  // Make call to delete image after each add
  after(function(done) {
    axios
      .delete(config.MobileEngine.url + "delete", {
        auth: {
          username: config.MobileEngine.user,
          password: config.MobileEngine.pass
        },
        params: { filepath: "mobileEngineAdd.jpg" }
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

  describe("Add Image by URL", function() {
    it('Should return a call with status "ok"', function(done) {
      // Search your index for an image
      var url = "http://tineye.com/images/meloncat.jpg";

      mobileengine.add({ url: url, filepath: "mobileEngineAdd.jpg" }, function(
        err,
        data
      ) {
        try {
          chai.assert.isOk(data, "Error not returned");
          chai.assert(data.status === "ok", "Error not returned");
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });

  describe("Add Image by URL without Filepath", function() {
    it('Should return a call with status fail and message "Missing matching filepath"', function(done) {
      // Search your index for an image
      var url = "http://tineye.com/images/meloncat.jpg";

      mobileengine.add({ url: url }, function(err, data) {
        try {
          chai.assert.isOk(data, "Error not returned");
          chai.assert(data.status !== "ok", "Error not returned");
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });

  describe("Add Image by File with no optional params", function() {
    it('Should return a call with status "ok"', function(done) {
      mobileengine.add(
        {
          image: __dirname + "/../image2.jpg",
          filepath: "mobileEngineAdd.jpg"
        },
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

  describe("Add Image by File with optional param format:xml", function() {
    it("Return a string of xml that cam successfully be parsed ", function(done) {
      mobileengine.add(
        {
          image: __dirname + "/../image.jpg",
          filepath: "mobileEngineAdd.jpg",
          format: "xml"
        },
        function(err, data) {
          if (err) {
            done(new Error(err.message));
          } else {
            try {
              var obj = libxmljs.parseXmlString(data);
              done();
            } catch (e) {
              done(new Error("Failed to parse return string"));
            }
          }
        }
      );
    });
  });

  describe("Add Image by File with optional param timeout", function() {
    it('Return a status of "ok"', function(done) {
      mobileengine.add(
        {
          image: __dirname + "/../image.jpg",
          filepath: "mobileEngineAdd.jpg",
          timeout: 100
        },
        function(err, data) {
          if (err) {
            done(new Error(err.message));
          } else {
            done();
          }
        }
      );
    });
  });
});
