const TineyeServices = require('./tineyeServices.js');
const FormData = require('form-data');

/**
 * MobileEngine Class
 * @extends TineyeServices
 */
module.exports = class MobileEngine extends TineyeServices {

    /**
     * Create a MobileEngine .
     * @constructor     
     * @param {string}  username - API Username for basic auth.
     * @param {string}  password - API Password for basic auth.
     * @param {string}  companName - Company name for the endpoint
     * @param {string}  baseUrl - Url of MobileEngine Instance
     */
    constructor(username, password, companyName, baseUrl) {

        var url = baseUrl || 
        'https://mobileengine.tineye.com/' + companyName + '/rest/';
        super(username,password,baseUrl);

    }
    

};