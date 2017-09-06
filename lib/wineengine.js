const TineyeServices = require('./tineyeServices.js');

module.exports = class WineEngine extends TineyeServices {

  constructor(username, password, companyName, baseUrl) {
    
    baseUrl = baseUrl || 
    	'https://wineengine.tineye.com/' + companyName + '/rest/';
    super(username,password,baseUrl);

  }

};