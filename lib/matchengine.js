const TineyeServices = require('./tineyeServices.js');
const FormData = require('form-data');
const fs = require('fs');


module.exports = class MatchEngine extends TineyeServices {

	constructor(username, password, company_name, base_url) {
		
		base_url = base_url || 
		'https://matchengine.tineye.com/' + company_name + '/rest/';
		super(username,password,base_url);

	}

	compare(params,options, callback) {
		
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		var  form = new FormData();
				
		for (var key in params) {
			if(key === 'image1' || key === 'image2' ){        
				params[key] = fs.createReadStream(params[key]);  
				form.append(key,params[key]);
			}else{
				form.append(key, params[key]);
			}
		}

		this.request.post('compare', form, options, callback);
		
	}

};