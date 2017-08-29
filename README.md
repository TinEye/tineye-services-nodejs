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
Below are methods available for MatchEngine, for more information on parameters and responses go to https://services.tineye.com/developers/matchengine/
#### Add URL
```node
/**
 * Add an image to an image collection
 * @param params.rl - Required URL of an image.
 * @param params.filepath - Optional remote filepath for the image
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
matchengine.add(params, options, function callback (err, data) {
	data = {
	  "status": "ok",
	  "error": [],
	  "method": "add",
	  "result": []
	}
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
	data = {
	  "status": "ok",
	  "error": [],
	  "method": "add",
	  "result": []
	}
})
```
#### Compare
When comparing images you must have at least one url, image or filepath for each image being compared
```node
/**
 * Compare two images in collection
 * @param params.url1 
 * @param params.image1 
 * @param params.filepath1
 * @param params.url2
 * @param params.image2
 * @param params.filepath2
 * @param params.minScore
 * @param params.check_horizontal_flip
 * @param params.generate_overlay
 * @param params.enhanced_score
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
matchengine.compare({params, options, function(err, data) {
	data = {
	    "status": "ok",
	    "error": [],
	    "method": "compare",
	    "result": [
		{
		    "target_overlap_percent": 99.22,
		    "query_overlap_percent": 98.59,
		    "filepath": "match.jpg",
		    "listscore_enhanced": 68.2,
		    "score": 65.9,
		    "match_percent": 92.11
		}
	    ]
	}
});
```
#### Count
```node
/**
 * Counts images in collection
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
matchengine.count({options, function(err, data) {
	data = {
	  "status": "ok",
	  "error": [],
	  "method": "count",
	  "result": [
	    4
	  ]
	}
});
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
	data = {
	  "status": "ok",
	  "error": [],
	  "method": "delete",
	  "result": []
	}
})
```
#### List
```node
/**
 * List images in collection
 * @param params.offset - Optional skips that many images in the collection, defaults to 0.
 * @param params.limit - Optional limits the results to this many images, defaults to 20. 
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
matchengine.list({params, options, function(err, data) {
	data = {
	  "status": "ok",
	  "error": [],
	  "method": "list",
	  "result": [
	    "melonCat",
	    "limeCat.jpg",
	    "meloncat.jpg",
	    "image.jpg"
	  ]
	}
});
```
#### Search
```node
/**
 * Search images in collection
 * @param params.url1 
 * @param params.image1 
 * @param params.filepath1
 * @param params.offset - Optional skips that many images in the collection, defaults to 0.
 * @param params.limit - Optional limits the results to this many images, defaults to 20. 
 * @param params.minScore
 * @param params.check_horizontal_flip
 * @param params.generate_overlay
 * @param params.enhanced_score
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
matchengine.search({params, options, function(err, data) {
	data = {
	    "status": "ok",
	    "error": [],
	    "method": "search",
	    "result": [
		{
		    "match_percent": 89.52,
		    "score": 97.2,
		    "target_overlap_percent": 95.62,
		    "query_overlap_percent": 72.37,
		    "filepath": "path/folder/match1.png"
		},
		{
		    "match_percent": 82.83,
		    "score": 94.5,
		    "target_overlap_percent": 87.13,
		    "query_overlap_percent": 97.17,
		    "filepath": "path/folder/match2.png"
		}
	    ]
	}
});
```
#### Ping
```node
/**
 * Pings Server
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
matchengine.ping({options, function(err, data) {
	data = {
	  "status": "ok",
	  "error": [],
	  "method": "ping",
	  "result": []
	}
});
## MobileEngine
Once TinEye Services is installed you can include and configure MobileEngine 
```node
const { MobileEngine } = require('tineye-services')

// url is optional, if none is specified then defualt is https://matchengine.tineye.com/
mobileengine = new MobileEngine('user_name', 'password', 'company_name', 'url')
```
### Methods
Below are methods available for MatchEngine, for more information on parameters and responses go to https://services.tineye.com/developers/matchengine/
#### Add URL
```node
/**
 * Add an image to an image collection
 * @param params.rl - Required URL of an image.
 * @param params.filepath - Optional remote filepath for the image
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
mobileengine.add(params, options, function callback (err, data) {
	data = {
	  "status": "ok",
	  "error": [],
	  "method": "add",
	  "result": []
	}
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
mobileengine.add(paramdd an Image to an image collections, options, function callback (err, data) {
	data = {
	  "status": "ok",
	  "error": [],
	  "method": "add",
	  "result": []
	}
})
```
#### Compare
When comparing images you must have at least one url, image or filepath for each image being compared
```node
/**
 * Compare two images in collection
 * @param params.url1 
 * @param params.image1 
 * @param params.filepath1
 * @param params.url2
 * @param params.image2
 * @param params.filepath2
 * @param params.minScore
 * @param params.check_horizontal_flip
 * @param params.generate_overlay
 * @param params.enhanced_score
 * @param params.color_compare
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
mobileengine.compare({params, options, function(err, data) {
	data = {
	    "status": "ok",
	    "error": [],
	    "method": "compare",
	    "result": [
		{
		    "target_overlap_percent": 99.22,
		    "query_overlap_percent": 98.59,
		    "filepath": "match.jpg",
		    "listscore_enhanced": 68.2,
		    "score": 65.9,
		    "match_percent": 92.11
		}
	    ]
	}
});
```
#### Count
```node
/**
 * Counts images in collection
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
mobileengine.count({options, function(err, data) {
	data = {
	  "status": "ok",
	  "error": [],
	  "method": "count",
	  "result": [
	    4
	  ]
	}
});
```
#### Delete 
```node
/**
 * Delete an image from the collection
 * @param params.filepath - Required remote filepath for the image
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
mobileengine.delete(params, options, function callback(err, data) {
	data = {
	  "status": "ok",
	  "error": [],
	  "method": "delete",
	  "result": []
	}
})
```
#### List
```node
/**
 * List images in collection
 * @param params.offset - Optional skips that many images in the collection, defaults to 0.
 * @param params.limit - Optional limits the results to this many images, defaults to 20. 
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
mobileengine.list({params, options, function(err, data) {
	data = {
	  "status": "ok",
	  "error": [],
	  "method": "list",
	  "result": [
	    "melonCat",
	    "limeCat.jpg",
	    "meloncat.jpg",
	    "image.jpg"
	  ]
	}
});
```
#### Search
```node
/**
 * Search images in collection
 * @param params.url1 
 * @param params.image1 
 * @param params.filepath1
 * @param params.offset - Optional skips that many images in the collection, defaults to 0.
 * @param params.limit - Optional limits the results to this many images, defaults to 20. 
 * @param params.minScore
 * @param params.check_horizontal_flip
 * @param params.generate_overlay
 * @param params.enhanced_score
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
mobileengine.search({params, options, function(err, data) {
	data = {
	    "status": "ok",
	    "error": [],
	    "method": "search",
	    "result": [
		{
		    "match_percent": 89.52,
		    "score": 97.2,
		    "target_overlap_percent": 95.62,
		    "query_overlap_percent": 72.37,
		    "filepath": "path/folder/match1.png"
		},
		{
		    "match_percent": 82.83,
		    "score": 94.5,
		    "target_overlap_percent": 87.13,
		    "query_overlap_percent": 97.17,
		    "filepath": "path/folder/match2.png"
		}
	    ]
	}
});
```
#### Ping
```node
/**
 * Pings Server
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
mobileengine.ping({options, function(err, data) {
	data = {
	  "status": "ok",
	  "error": [],
	  "method": "ping",
	  "result": []
	}
});
```