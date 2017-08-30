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

		var form = this._composeForm(params);
			
		this.request.post('compare', form, options, callback);

	}

};