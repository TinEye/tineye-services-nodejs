const fs = require("fs");
const TinEyeRequest = require("./tineyeRequest.js");

/**
 * TineyeServices Class
 * Parent class, holds common methods among Match,
 * Mobile, Multicolor and Wine Engines
 */
module.exports = class TineyeServices {
  /**
   * Create Tineye Services instance
   * @constructor
   * @param {string}  username - API username for basic auth
   * @param {string}  password - API password for basic auth
   * @param {string}  baseUrl - URL of API instance
   */
  constructor(username, password, baseUrl) {
    this.auth = { username: username, password: password };
    this.baseUrl = baseUrl;
    this.request = new TinEyeRequest(this.auth, this.baseUrl);
  }

  /**
   * Add Image to the collection
   */
  add(params, callback) {
    this.request.post("/add", this._composeForm(params), callback);
  }

  /**
   * Delete image from the collection
   */
  delete(params, callback) {
    this.request.delete("/delete", params, callback);
  }

  /**
   * Search image from the collection
   */
  search(params, callback) {
    this.request.post("/search", this._composeForm(params), callback);
  }

  /**
   * Count number of images in the collection
   */
  count(params, callback) {
    this.request.get("/count", params, callback);
  }

  /**
   * List images in the collection
   */
  list(params, callback) {
    this.request.get("/list", params, callback);
  }

  /**
   * Ping instance
   */
  ping(callback) {
    this.request.get("/ping", {}, callback);
  }

  /**
   * Compare two images
   */
  compare(params, callback) {
    this.request.post("/compare", this._composeForm(params), callback);
  }

  /**
   * Compile the parameters into a Form-Data Form Object and return the form
   * Opens file stream for image objects to be used by formData plugin
   */
  _composeForm(params) {
    var form = {};

    for (var key in params) {
      if (key === "image" || key === "image1" || key === "image2") {
        params[key] = fs.createReadStream(params[key]);
      }

      form[key] = params[key];
    }

    return form;
  }
};
