const TineyeServices = require('./tineyeServices.js');
const FormData = require('form-data');
const fs = require('fs');

module.exports = class MulticolorEngine extends TineyeServices {

	constructor(username, password, company_name, base_url) {
		
		base_url = base_url || 
		'https://multicolorengine.tineye.com/' + company_name + '/rest/';
		super(username,password,base_url);

	}

	//search
	search(params,options, callback) {
		//check for options
		if(typeof(options)==='function'){
		  callback = options;
		  options = {};
		}
		
		var form = this._composeForm(params);
		
		this.request.post('color_search', form, options, callback);
	
	}

	//handle color array 
	_composeForm(params){
		
		var  form = new FormData();
				
		for (var key in params) {

			if(key === 'colors' || key === 'weights'){
				for (var i = 0; i<params[key].length; i++){
					form.append(key + '[' + i + ']',params[key][i]);
				}
			}else if(key === 'images'){    
				for (var i = 0; i < params[key].length; i++){
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