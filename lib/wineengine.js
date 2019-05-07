const TineyeServices = require('./tineyeServices.js');

/**
 * WineEngine Class
 * @extends TineyeServices
 */
module.exports = class WineEngine extends TineyeServices {

/**
 * Create a WineEngine instance
 * @param {string}  username - API username for basic auth
 * @param {string}  password - API password for basic auth
 * @param {string}  companyName - Company name for the endpoint
 * @param {string}  baseUrl - URL of MobileEngine instance
 */

    constructor(username, password, companyName, baseUrl) {

        var url = baseUrl || 
            'https://wineengine.tineye.com/' + companyName + '/rest/';
        super(username, password, url);

    }

};