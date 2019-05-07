const axios = require("axios");
const FormData = require("form-data");

/**
 * TinEyeRequest Class
 * Composes GET, POST, DELETE and inserts authentication
 */
module.exports = class TinEyeRequest {
  /**
   * TinEyeRequest Class
   * @constructor
   * Composes GET, POST, DELETE and inserts authentication
   */
  constructor(auth, baseUrl) {
    this.axios = axios.create({
      baseURL: baseUrl,
      auth: auth,
      timeout: 300000
    });
  }

  /**
   * Compose and send DELETE request to baseUrl
   */
  delete(endpoint, queryParams, callback) {
    var options = this._compose_options(queryParams);

    this.axios
      .delete(endpoint, options)
      .then(response => {
        callback(null, response.data);
      })
      .catch(err => {
        callback(err);
      });
  }

  /**
   * Compose and send GET request to baseUrl
   */
  get(endpoint, queryParams, callback) {
    var options = this._compose_options(queryParams);

    this.axios
      .get(endpoint, options)
      .then(response => {
        callback(null, response.data);
      })
      .catch(err => {
        callback(err);
      });
  }

  /**
   * Compose and send POST request to baseUrl
   */
  post(endpoint, bodyParams, callback) {
    var options = this._compose_options(bodyParams);

    if (options) {
      var form = new FormData();

      for (var param in bodyParams) {
        form.append(param, bodyParams[param]);
        delete bodyParams[param];
      }

      options = {
        ...options,
        headers: form.getHeaders()
      };
    }

    this.axios
      .post(endpoint, form, options)
      .then(response => {
        callback(null, response.data);
      })
      .catch(err => {
        callback(err);
      });
  }

  /**
   * Take parameters and set them to the correct key for axios, also check for XML format
   */
  _compose_options(params) {
    if (params) {
      var options = { params: params };
      // If XML don't set response type to JSON (axios default)
      if (params.format && params.format === "xml") {
        options = { ...options, responseType: "text" };
      }
    } else {
      var options = {};
    }

    return options;
  }
};
