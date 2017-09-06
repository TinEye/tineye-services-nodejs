const TineyeServices = require('./tineyeServices.js');
const FormData = require('form-data');
const fs = require('fs');

module.exports = class MulticolorEngine extends TineyeServices {

	constructor(username, password, companyName, baseUrl) {
		
		var url = baseUrl || 
		'https://multicolorengine.tineye.com/' + companyName + '/rest/';
		super(username,password,baseUrl);

	}

	//Stubs
	search(params,options, callback) {
		//check for options
		if(typeof(options)==='function'){
		  callback = options;
		  options = {};
		}
		
		var form = this._composeForm(params);
		
		this.request.post('color_search', form, options, callback);
	
	}

	countImageColors(params,options, callback) {
		//check for options
		if(typeof(options)==='function'){
		  callback = options;
		  options = {};
		}
		
		var form = this._composeForm(params);
		
		this.request.post('count_image_colors', form, options, callback);
	
	}

	extractImageColors(params,options, callback) {
		//check for options
		if(typeof(options)==='function'){
		  callback = options;
		  options = {};
		}
		
		var form = this._composeForm(params);
		
		this.request.post('extract_image_colors', form, options, callback);
	
	}

	countCollectionColors(params,options, callback) {
		//check for options
		if(typeof(options)==='function'){
		  callback = options;
		  options = {};
		}
		
		var form = this._composeForm(params);
		
		this.request.post('count_collection_colors', form, options, callback);
	
	}

	extractCollectionColors(params,options, callback) {
		//check for options
		if(typeof(options)==='function'){
		  callback = options;
		  options = {};
		}

		var form = this._composeForm(params);
		
		this.request.post('extract_collection_colors', form, options, callback);
	
	}

	updateMetadata(params,options, callback) {
		//check for options
		if(typeof(options)==='function'){
		  callback = options;
		  options = {};
		}

		var form = this._composeForm(params);
		
		this.request.post('update_metadata', form, options, callback);
	
	}

	countMetadata(params,options, callback) {
		//check for options
		if(typeof(options)==='function'){
		  callback = options;
		  options = {};
		}

		var form = this._composeForm(params);
		
		this.request.post('count_metadata', form, options, callback);
	
	}

	getMetadata(params,options, callback) {
		//check for options
		if(typeof(options)==='function'){
		  callback = options;
		  options = {};
		}

		var form = this._composeForm(params);
		
		this.request.post('get_metadata', form, options, callback);
	
	}

	getSearchMetadata(options, callback) {
		//check for options
		if(typeof(options)==='function'){
		  callback = options;
		  options = {};
		}
		
		this.request.post('get_search_metadata', {}, options, callback);
	
	}

	getReturnMetadata(options, callback) {
		//check for options
		if(typeof(options)==='function'){
		  callback = options;
		  options = {};
		}
		
		this.request.post('get_return_metadata', {}, options, callback);
	
	}

	_composeForm(params){
		
		var form = new FormData();
				
		for (var key in params) {

			//convert arrays into individual parameters and 
			//create file streams for images
			if(key !== 'images' && Array.isArray(params[key])){
				for (var i = 0; i<params[key].length; i++){
					form.append(key + '[' + i + ']',params[key][i]);
				}
			}else if(key === 'images'){    
				for (i = 0; i < params[key].length; i++){
					form.append(key + '[' + i + ']', fs.createReadStream(params[key][i]));
				}
			}else if(key === 'image'){        
				params[key] = fs.createReadStream(params[key]);  
				form.append(key,params[key]);
			}else{
				form.append(key, params[key]);
			}

		}
	
		return form;

	}

};