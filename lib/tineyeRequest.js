const got = require('got');
const FormData = require('form-data');

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
  delete(endpoint, queryParams, callback) {

    if(queryParams === null){
        queryParams = {};
    }
    //If not xml or callback set header to application/json
    //If set to true GOT will attempt to parse response as json
    var setJsonHeader = false;
    if(queryParams.format !== 'xml'){
      setJsonHeader = true;
    }

    got.delete(this.getUrl(endpoint), {
      auth: this.auth,
      json: setJsonHeader,
      query: queryParams
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
  get(endpoint, queryParams, callback) {

    if(queryParams === null){
        queryParams = {};
    }

    //If not xml or callback set header to application/json
    //If set to true GOT will attempt to parse response as json
    var setJsonHeader = false;
    if(queryParams.format !== 'xml'){
      setJsonHeader = true;
    }

    got.get(this.getUrl(endpoint), {
      auth: this.auth,
      json: setJsonHeader,
      query: queryParams
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
  post(endpoint, bodyParams, callback) {

    if(bodyParams === null){
        bodyParams = {};
    }

    //If not xml or callback set header to application/json
    //If set to true GOT will attempt to parse response as json
    var setJsonHeader = false;
    if(bodyParams.format !== 'xml'){
      setJsonHeader = true;
    }

    //use form-data to handle file submission streams
    var form = new FormData();

    for(var param in bodyParams){
      form.append(param,bodyParams[param]);
    }

    //var form = this._composeForm(bodyParams);

    got.post(this.getUrl(endpoint),{
      auth: this.auth,
      body: form,
      json: setJsonHeader,
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
