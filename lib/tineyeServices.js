const got = require('got');
const FormData = require('form-data');
const fs = require('fs');
const TinEyeRequest = require('./tineyeRequest.js');

/**
 * TineyeServices Class
 * Parent class, holds common methods among Match,
 * Mobile, Multicolor and Wine Engines
 */
module.exports = class TineyeServices {

  /**
   * Create Tineye Services Instance
   * @constructor
   * @param {string}  username - API Username for basic auth.
   * @param {string}  password - API Password for basic auth.
   * @param {string}  baseUrl - Url of MobileEngine Instance
   */
  constructor(username, password, baseUrl){
    this.auth = username + ':' + password;
    this.baseUrl = baseUrl;
    this.request = new TinEyeRequest(this.auth, this.baseUrl);
  }

  /**
   * Add Image to the collection
   */
  add(params, options, callback){

    //check for options
    if(typeof(options) === 'function'){
      callback = options;
      options = {};
    }

    var form = this._composeForm(params);
    this.request.post('add', form, options, callback);

  }

  /**
   * Delete Image from the collection
   */
  delete(params, options, callback) {
    //check for options
    if(typeof(options) === 'function'){
      callback = options;
      options = {};
    }

    var query = Object.assign({}, params, options);
    this.request.delete('delete', query, callback);

  }

  /**
   * Search Image from the collection
   */
  search(params,options, callback) {
    //check for options
    if(typeof(options) === 'function'){
      callback = options;
      options = {};
    }
    
    var form = this._composeForm(params);
    this.request.post('search', form, options, callback);

  }

  /**
   * Count number of images in the collection
   */
  count(options, callback) {
        //check for options
    if(typeof(options) === 'function'){
      callback = options;
      options = {};
    }

    this.request.get('count',options, callback);

  }

 /**
   * List images in the collection
   */
  list(options, callback) {

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    this.request.get('list', options, callback);

  }

 /**
   * Ping Instance
   */
  ping(callback) {

    this.request.get('ping',{}, callback);
    
  }

  /**
   * Compile the parameters into a Form-Data Form Object and return the form
   */
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
