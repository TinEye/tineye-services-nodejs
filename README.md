# Tineye Services

Tineye services is a module that is designed to work with tineye products: Match Engine, Mobile Engine, Multicolor Engine and Wine Engine. 

Learn more at www.tineye.

Official Documentation Available at https://services.tineye.com/docs

## Installation
```shell
npm install tineye-services
```
## Basic Usage

```node
const { MatchEngine } = require('tineye-services')

//url is optional, if none is specified then defualt is https://matchengine.tineye.com/
matchengine = new MatchEngine('user_name', 'password', 'company_name', 'url')

//Sample Image URL
url = 'http://tineye.com/images/meloncat.jpg'

// Add an image to your index
//Requires both url and file path
matchengine.add({ url: url, filepath:'image_name'}, function (err, data) {
    if (!err)
        console.log(data)
    else
        console.log(err.message)
})
```
## Services
All of the below services accept the following optional common parameters object
```javascript
options = {
    format:'xml', //return will be in xml format, default is json
    timeout:100, // The call will timeout after timeout seconds. Set to 0 for no timeout.
    callback:'handle_callback' //When using JSON, output will be wrapped in the callback method
}
```

### Match Engine
Once Tineye Services is installed you can include and configure Match Engine 
```node
const { MatchEngine } = require('tineye-services')

//url is optional, if none is specified then defualt is https://matchengine.tineye.com/
matchengine = new MatchEngine('user_name', 'password', 'company_name', 'url')
```

#### Methods
Below are methods available for Match Engine
##### Add URL
```node
/**
 * Add an image to an image collection
 * @param params - Object containing required parameters for
 * @param params.url - Required URL of an image.
 * @param params.filepath - Optional remote filepath for the image
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
matchengine.add(params, options, function callback (err, data) {
    //...
})
```
##### Add Image File
```node
/**
 * Add an image to an image collection
 * @param params - Object containing required parameters for
 * @param params.image - Required path to an image file 
 * @param params.filepath - Required remote filepath for the image
 * @param options - Optional object containing common parameters
 * @param callback - Callback function returing err or data
 */
matchengine.add(paramdd an Image to an image collections, options, function callback (err, data) {
    //...
})
```
##### Delete 
```node
/**
 * Delete an image from the collection
 * @param params - Object containing required parameters for
 * @param params.filepath - Required remote filepath for the image
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
matchengine.delete(params, options, function callback(err, data) {
    //...
})
