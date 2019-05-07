const TineyeServices = require("./tineyeServices.js");

/**
 * MobileEngine Class
 * @extends TineyeServices
 */
module.exports = class MobileEngine extends TineyeServices {
  /**
   * Create a MobileEngine instance
   * @constructor
   * @param {string}  username - API username for basic auth
   * @param {string}  password - API password for basic auth
   * @param {string}  companyName - Company name for the endpoint
   * @param {string}  baseUrl - URL of MobileEngine instance
   */
  constructor(username, password, companyName, baseUrl) {
    var url =
      baseUrl || "https://mobileengine.tineye.com/" + companyName + "/rest/";

    super(username, password, url);
  }
};
