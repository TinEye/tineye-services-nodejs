const TineyeServices = require('./tineyeServices.js');

module.exports = class MatchEngine extends TineyeServices {

	constructor(username, password, company_name, base_url) {
		
		base_url = base_url || 
		'https://matchengine.tineye.com/' + company_name + '/rest/';
		super(username,password,base_url);

	}

	compare(params,options, callback) {
		
		if (typeof params === 'function') {
			callback = params;
			params = {};
		}

		const _options = Object.assign({}, defaults, params);

		this.request.post('compare', _options, options, callback);
	}

};