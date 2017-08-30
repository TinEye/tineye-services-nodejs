const got = require('got');
const FormData = require('form-data');
const fs = require('fs');
const TinEyeRequest = require('./tineyeRequest.js');

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

  list(options, callback){

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    const defaults = {
      offset: 0,
      limit: 20
    };

    const query = Object.assign({}, defaults, options);

    this.request.get('list', query, callback);

  }

  ping(options, callback){

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    this.request.get('ping', callback);
  }

  _composeForm(params){

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
