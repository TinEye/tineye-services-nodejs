# Tineye Services

Tineye services is a module that is designed to work with tineye products: Match Engine, Mobile Engine, Multicolor Engine and Wine Engine. 

Learn more at www.tineye.com
Official Documentation Available at https://services.tineye.com/docs

## Installation
```shell
npm install tineye-services
```
## Basic Usage

```node
const { MatchEngine } = require('tineye-services')
const fs = require('fs')

//url is optional, if none is specified then defualt is https://matchengine.tineye.com/
matchengine = new MatchEngine('userName', 'password', 'companyName', 'url')

//Sample Image URL
url = 'http://tineye.com/images/meloncat.jpg'

// Add an image to your index
//Requires both url and file path
matchengine.add({ url: url }, function (err, data) {
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
matchengine = new MatchEngine('userName', 'password', 'companyName', 'url')
```

#### Methods
Below are methods available for Match Engine
```node
/**
 * Add an Image to an image collection
 * @param params - Obect containing required parameters for
 * @param params.url - The URL of an image.
 * @param params.filepath - The remote filepath for the image
 * @param options - optional object containing common parameters
 * @param callback - callback function returing err or data
 */
matchengine.add(params, options, function callback (err, data) {
    //...
})
```
