# TinEye Services
TinEye services is a module that is designed to work with TinEye products: MatchEngine, MobileEngine, MulticolorEngine and WineEngine. 

Learn more at www.tineye.com

Official API documentation available at https://services.tineye.com/docs
# Installation
```shell
npm install tineye-services
```
# Basic Usage
```node
const { MatchEngine } = require('tineye-services')

// url is optional, if none is specified then default is https://matchengine.tineye.com/
matchengine = new MatchEngine('user_name', 'password', 'company_name', 'url')

// Sample Image URL
url = 'http://tineye.com/images/meloncat.jpg'

// Add an image to your index
// Requires both url and file path
matchengine.add({ url: url, filepath:'image_name'}, function (err, data) {
    if (!err)
        console.log(data)
    else
        console.log(err.message)
})
```
# Services
All of the below services accept the following optional common parameters object
```javascript
options = {
    format:'xml', // Return will be in xml format, default is json
    timeout:100, // The call will timeout after timeout seconds. Set to 0 for no timeout.
    callback:'handle_callback' // When using JSON, output will be wrapped in the callback method
}
```

## Match Engine
Once TinEye Services is installed you can include and configure MatchEngine 
```node
const { MatchEngine } = require('tineye-services')

// url is optional, if none is specified then defualt is https://matchengine.tineye.com/
matchengine = new MatchEngine('user_name', 'password', 'company_name', 'url')
```
### Methods
Below are methods available for 
#### Count
```node
/**
 * Counts Images in collection
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
matchengine.list({options, function(err, data) {
		// ...		
});
```
#### Add URL
```node
/**
 * Add an image to an image collection
 * @param params.url - Required URL of an image.
 * @param params.filepath - Optional remote filepath for the image
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
matchengine.add(params, options, function callback (err, data) {
    // ...
})
```
#### Add Image File
```node
/**
 * Add an image to an image collection
 * @param params.image - Required path to an image file 
 * @param params.filepath - Required remote filepath for the image
 * @param options - Optional object containing common parameters
 * @param callback - Callback function returing err or data
 */
matchengine.add(paramdd an Image to an image collections, options, function callback (err, data) {
    // ...
})
```
#### Delete 
```node
/**
 * Delete an image from the collection
 * @param params.filepath - Required remote filepath for the image
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
matchengine.delete(params, options, function callback(err, data) {
    // ...
})
```
#### List
```node
/**
 * List Images in collection
 * @param params.offset - Optional skips that many images in the collection, defaults to 0.
 * @param params.limit - Optional limits the results to this many images, defaults to 20. 
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
matchengine.list({params, options, function(err, data) {
		// ...		
});
