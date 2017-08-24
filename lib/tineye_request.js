const got = require('got')

module.exports = class TinEyeRequest {

  constructor(auth, base_url) {
    this.auth = auth
    this.base_url = base_url
  }

  delete(endpoint, query, callback) {
    got.delete(this.getUrl(endpoint), {
      auth: this.auth,
      json: true,
      query: query
    })
    .then((response) => {
      callback(null, response.body)
    })
    .catch((err) => {
      callback(err)
    })
  }

  get(endpoint, query, callback) {
    if (typeof query === 'function') {
      callback = query
      query = {}
    }

    got.get(this.getUrl(endpoint), {
      auth: this.auth,
      json: true,
      query: query
    })
    .then((response) => {
      callback(null, response.body)
    })
    .catch((err) => {
      callback(err)
    })
  }

  post(endpoint, body, query, callback) {
 
    var postContents = {
      auth: this.auth,
      body: body,
      query:query,
    }
    //if there is no callback param json is true
    //otherwise it is a function in a string
    if(!query.callback)
      postContents.json = true;

    got.post(this.getUrl(endpoint),postContents)
    .then((response) => {
      callback(null, response.body)
    })
    .catch((err) => {
      callback(err)
    })
  }

  getUrl(endpoint) {
    return this.base_url + endpoint;
  }

}
