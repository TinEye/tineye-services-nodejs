const got = require('got')
const FormData = require('form-data');
const fs = require('fs')
const TinEyeRequest = require('./tineye_request')

module.exports = class TineyeServices {

  constructor(username, password, base_url){
    this.auth = username + ':' + password;
    this.base_url = base_url;
    this.request = new TinEyeRequest(this.auth, this.base_url);
  }

  add(params, options, callback){

    //check for options
    if(typeof(options)==='function'){
      callback = options;
      options = {};
    }

    var body = Object.assign({}, params);    

    if(params.image){

      var  form = new FormData();
      var rs = fs.createReadStream(params.image);      
      form.append('image',rs);
      body = Object.assign(form, options);

    }

    this.request.post('add', body, options, callback);

  };

  delete(params, callback) {
    const query = Object.assign({}, params);
    this.request.delete('delete', query, callback);
  }

  search(params, callback) {
    const body = {
      url: params.image_url
    }
    this.request.post('search', body, callback);
  }

  compare(params, callback) {
    if (typeof params === 'function') {
      callback = params
      params = {}
    };

    const defaults = {
      min_score: 0,
      check_horizontal_flip: false,
      generage_overlay: false,
      enhanced_score: false
    };
    const _options = Object.assign({}, defaults, params);

    this.request.post('compare', _options, query, callback);
  }

  count(callback) {
    this.request.get('count', callback);
  }

  list(options, callback){

    if (typeof options === 'function') {
      callback = options
      options = {}
    };

    const defaults = {
      offset: 0,
      limit: 20
    }

    const query = Object.assign({}, defaults, options)

    this.request.get('list', query, callback)

  };

  ping(callback){
    this.request.get('ping', callback);
  };

}  
