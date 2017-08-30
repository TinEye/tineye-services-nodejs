const TineyeServices = require('./tineyeServices.js');

module.exports = class MulticolorEngine extends TineyeServices {

	constructor(username, password, company_name, base_url) {
		
		base_url = base_url || 
		'https://multicolorengine.tineye.com/' + company_name + '/rest/';
		super(username,password,base_url);

	}

};