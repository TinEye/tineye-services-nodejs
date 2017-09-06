const TineyeServices = require('./tineyeServices.js');
const FormData = require('form-data');
const fs = require('fs');

module.exports = class MatchEngine extends TineyeServices {

	constructor(username, password, companyName, baseUrl) {
		
		var url = baseUrl || 
		'https://matchengine.tineye.com/' + companyName + '/rest/';
		super(username,password,baseUrl);

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