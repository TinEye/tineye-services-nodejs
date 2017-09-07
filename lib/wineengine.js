const TineyeServices = require('./tineyeServices.js');

/**
 * WineEngine Class
 * @extends TineyeServices
 */
module.exports = class WineEngine extends TineyeServices {

/**
 * Create a WineEngine .
 * @param {string}  username - API Username for basic auth.
 * @param {string}  password - API Password for basic auth.
 * @param {string}  companName - Company name for the endpoint
 * @param {string}  baseUrl - Url of MobileEngine Instance
 */
  constructor(username, password, companyName, baseUrl) {
    
    baseUrl = baseUrl || 
    	'https://wineengine.tineye.com/' + companyName + '/rest/';
    super(username,password,baseUrl);

  }

};