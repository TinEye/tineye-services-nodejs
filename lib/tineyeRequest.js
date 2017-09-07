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
    got.delete(this.getUrl(endpoint), {
      auth: this.auth,
      json: true,
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
    if (typeof query === 'function') {
      callback = query;
      query = {};
    }

    got.get(this.getUrl(endpoint), {
      auth: this.auth,
      json: true,
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
 
    var postContents = {
      auth: this.auth,
      body: body,
      query:query,
    };

    //If not xml or callback set header to application/json
    //If set to true GOT will attempt to parse response as json
    if(!query.callback && query.format !== 'xml'){
      postContents.json = true;
    }

    got.post(this.getUrl(endpoint),postContents)
    .then((response) => {
      //check for errrors, excluding xml and callback returns
      if(response.body.status !== 'ok' && 
        !(postContents.query.format === 'xml' || postContents.query.callback)){
        callback({
          status:response.body.status ,
          message:response.body.error
        });
      }
      else{
        callback(null,response.body);
      }

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
