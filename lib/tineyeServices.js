const got = require('got');
const FormData = require('form-data');
const fs = require('fs');
const TinEyeRequest = require('./tineyeRequest.js');

module.exports = class TineyeServices {

  constructor(username, password, baseUrl){
    this.auth = username + ':' + password;
    this.baseUrl = baseUrl;
    this.request = new TinEyeRequest(this.auth, this.baseUrl);
  }

  add(params, options, callback){

    //check for options
    if(typeof(options)==='function'){
      callback = options;
      options = {};
    }

    var form = this._composeForm(params);
    this.request.post('add', form, options, callback);

  }

  delete(params, options, callback) {
    //check for options
    if(typeof(options)==='function'){
      callback = options;
      options = {};
    }

    var query = Object.assign({}, params, options);
    this.request.delete('delete', query, callback);

  }

  search(params,options, callback) {
    //check for options
    if(typeof(options)==='function'){
      callback = options;
      options = {};
    }
    
    var form = this._composeForm(params);
    this.request.post('search', form, options, callback);

  }

  count(options, callback) {
        //check for options
    if(typeof(options)==='function'){
      callback = options;
      options = {};
    }

    this.request.get('count', callback);

  }

  list(options, callback) {

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    this.request.get('list', options, callback);

  }

  ping(callback) {

    this.request.get('ping', callback);
    
  }

  _composeForm(params) {

		var  form = new FormData();
				
		for (var key in params) {
			if(key === 'image' || key === 'image1' || key === 'image2'){        
				params[key] = fs.createReadStream(params[key]);  
				form.append(key,params[key]);
			}else{
				form.append(key, params[key]);
			}
		}
    
    return form;

  }

};
