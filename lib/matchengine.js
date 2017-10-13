const TineyeServices = require('./tineyeServices.js');
const FormData = require('form-data');

/**
 * MatchEngine Class
 * @extends TineyeServices
 */
module.exports = class MatchEngine extends TineyeServices {

    /**
     * Create a MatchEngine .
     * @constructor
     * @param {string}  username - API Username for basic auth.
     * @param {string}  password - API Password for basic auth.
     * @param {string}  companName - Company name for the endpoint
     * @param {string}  baseUrl - Url of MobileEngine Instance
     */
    constructor(username, password, companyName, baseUrl) {

        var url = baseUrl || 
        'https://matchengine.tineye.com/' + companyName + '/rest/';

        super(username,password,baseUrl);

    }

};