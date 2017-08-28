const TineyeServices = require('./tineyeServices.js');

module.exports = class MobileEngine extends TineyeServices {

  constructor(username, password, company_name, base_url) {
    
    base_url = base_url || 
    	'https://mobileengine.tineye.com/' + company_name + '/rest/';
    super(username,password,base_url);

  }

};