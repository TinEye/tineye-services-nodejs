const got = require('got');

module.exports = class TinEyeRequest {

  constructor(auth, baseUrl) {
    this.auth = auth;
    this.baseUrl = baseUrl;
  }

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

  post(endpoint, body, query, callback) {
 
    var postContents = {
      auth: this.auth,
      body: body,
      query:query,
    };

    if(!query.callback && query.format!=='xml'){
      postContents.json = true;
    }

    got.post(this.getUrl(endpoint),postContents)
    .then((response) => {
      //check for errrors, excluding xml and callback returns
      if(response.body.status !== 'ok' && 
        !(postContents.query.format || postContents.query.callback)){
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

  getUrl(endpoint) {
    return this.baseUrl + endpoint;
  }

};
