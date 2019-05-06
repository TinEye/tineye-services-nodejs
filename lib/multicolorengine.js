const TineyeServices = require("./tineyeServices.js");
const fs = require("fs");

/**
 * MulticolorEngine Class
 * @extends TineyeServices
 */
module.exports = class MulticolorEngine extends TineyeServices {
  /**
   * Create a MulticolorEngine .
   * @constructor
   * @param {string}  username - API Username for basic auth.
   * @param {string}  password - API Password for basic auth.
   * @param {string}  companName - Company name for the endpoint
   * @param {string}  baseUrl - Url of MobileEngine Instance
   */
  constructor(username, password, companyName, baseUrl) {
    var url =
      baseUrl ||
      "https://multicolorengine.tineye.com/" + companyName + "/rest/";

    super(username, password, url);
  }

  search(params, callback) {
    var form = this._composeForm(params);

    this.request.post("color_search", form, callback);
  }

  countImageColors(params, callback) {
    var form = this._composeForm(params);

    this.request.post("count_image_colors", form, callback);
  }

  extractImageColors(params, callback) {
    var form = this._composeForm(params);

    this.request.post("extract_image_colors", form, callback);
  }

  countCollectionColors(params, callback) {
    var form = this._composeForm(params);

    this.request.post("count_collection_colors", form, callback);
  }

  extractCollectionColors(params, callback) {
    var form = this._composeForm(params);

    this.request.post("extract_collection_colors", form, callback);
  }

  updateMetadata(params, callback) {
    var form = this._composeForm(params);

    this.request.post("update_metadata", form, callback);
  }

  countMetadata(params, callback) {
    var form = this._composeForm(params);

    this.request.post("count_metadata", form, callback);
  }

  getMetadata(params, callback) {
    var form = this._composeForm(params);

    this.request.post("get_metadata", form, callback);
  }

  getSearchMetadata(params, callback) {
    this.request.post("get_search_metadata", params, callback);
  }

  getReturnMetadata(params, callback) {
    this.request.post("get_return_metadata", params, callback);
  }

  /*
   * Convert arrays into individual parameters of the form 'key[0]' 'key[1]'
   * and  create file streams for images
   */

  _composeForm(params) {
    var form = {};

    for (var key in params) {
      if (key !== "images" && Array.isArray(params[key])) {
        for (var i = 0; i < params[key].length; i++) {
          form[key + "[" + i + "]"] = params[key][i];
        }
      } else if (key === "images") {
        for (i = 0; i < params[key].length; i++) {
          form[key + "[" + i + "]"] = fs.createReadStream(params[key][i]);
        }
      } else if (key === "image") {
        params[key] = fs.createReadStream(params[key]);
        form[key] = params[key];
      } else {
        form[key] = params[key];
      }
    }

    return form;
  }
};
