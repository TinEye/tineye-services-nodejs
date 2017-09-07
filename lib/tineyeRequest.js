const got = require('got');

/**
 * TinEyeRequest Class
 * Composes GET, POST, DELETE using Got and inserts authentication 
 */
module.exports = class TinEyeRequest {

  /**
   * TinEyeRequest Class
   * @constructor  
   * Composes GET, POST, DELETE using Got and inserts authentication 
   */
  constructor(auth, baseUrl) {
    this.auth = auth;
    this.baseUrl = baseUrl;
  }

  /**
   * Compose and send DELETE request to baseUrl
   */
  delete(endpoint, query, callback) {

    //If not xml or callback set header to application/json
    //If set to true GOT will attempt to parse response as json
    var setJsonHeader = false;
    if(!query.callback && query.format !== 'xml'){
      setJsonHeader = true;
    }

    got.delete(this.getUrl(endpoint), {
      auth: this.auth,
      json: setJsonHeader,
      query: query
    })
    .then((response) => {

      callback(null, response.body);

    })
    .catch((err) => {
      callback(err);
    });
  }

  /**
   * Compose and send GET request to baseUrl
   */
  get(endpoint, query, callback) {

    //If not xml or callback set header to application/json
    //If set to true GOT will attempt to parse response as json
    var setJsonHeader = false;
    if(!query.callback && query.format !== 'xml'){
      setJsonHeader = true;
    }

    got.get(this.getUrl(endpoint), {
      auth: this.auth,
      json: setJsonHeader,
      query: query
    })
    .then((response) => {

        callback(null, response.body);

    })
    .catch((err) => {
      callback(err);
    });
  }

  /**
   * Compose and send POST request to baseUrl
   */
  post(endpoint, body, query, callback) {
 
    //If not xml or callback set header to application/json
    //If set to true GOT will attempt to parse response as json
    var setJsonHeader = false;
    if(!query.callback && query.format !== 'xml'){
      setJsonHeader = true;
    }

    got.post(this.getUrl(endpoint),{
      auth: this.auth,
      body: body,
      json: setJsonHeader,
      query:query,
    })
    .then((response) => {

      callback(null, response.body);

    })
    .catch((err) => {
      callback(err);
    });

  }

  /**
   * Add enpoint to baseUrl
   */
  getUrl(endpoint) {
    return this.baseUrl + endpoint;
  }

};
