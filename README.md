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

## MatchEngine
Once TinEye Services is installed you can include and configure MatchEngine 
```node
const { MatchEngine } = require('tineye-services')

// url is optional, if none is specified then defualt is https://matchengine.tineye.com/
matchengine = new MatchEngine('user_name', 'password', 'company_name', 'url')
```
### Methods
Below are methods available for MatchEngine, for more information on parameters and responses go to https://services.tineye.com/developers/matchengine/
#### Count
```node
/**
 * Counts Images in collection
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
matchengine.list({options, function(err, data) {
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
 * List Images in collection
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
#### Ping
```node
/**
 * Pings Server
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
matchengine.list({options, function(err, data) {
	data = {
	  "status": "ok",
	  "error": [],
	  "method": "ping",
	  "result": []
	}
});
```
## MobileEngine
Once TinEye Services is installed you can include and configure MobileEngine 
```node
const { MobileEngine } = require('tineye-services')

// url is optional, if none is specified then defualt is https://mobileengine.tineye.com/
mobileengine = new MobileEngine('user_name', 'password', 'company_name', 'url')
```
### Methods
Below are methods available for MobileEngine, for more information on parameters and responses go to https://services.tineye.com/developers/mobileengine/
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
## WineEngine
Once TinEye Services is installed you can include and configure WineEngine 
```node
const { WineEngine } = require('tineye-services')

// url is optional, if none is specified then defualt is https://wineengine.tineye.com/
wineengine = new WineEngine('user_name', 'password', 'company_name', 'url')
```
### Methods
Below are methods available for WineEngine, for more information on parameters and responses go to https://services.tineye.com/developers/wineengine/
#### Add URL
```node
/**
 * Add an image to an image collection
 * @param params.rl - Required URL of an image.
 * @param params.filepath - Optional remote filepath for the image
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
wineengine.add(params, options, function callback (err, data) {
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
wineengine.add(paramdd an Image to an image collections, options, function callback (err, data) {
	data = {
	  "status": "ok",
	  "error": [],
	  "method": "add",
	  "result": []
	}
})
```
#### Count
```node
/**
 * Counts images in collection
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
wineengine.count({options, function(err, data) {
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
wineengine.delete(params, options, function callback(err, data) {
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
wineengine.list({params, options, function(err, data) {
	data = {
	  "status": "ok",
	  "method": "list",
	  "error": [],
	  "result": [
	    "path/folder/2.jpg",
	    "path/folder/3.jpg"
	  ]
	}
});
```
#### Search
```node
/**
 * Search images in collection
 * @param params.url
 * @param params.image
 * @param params.filepath
 * @param params.limit - Optional limits the results to this many images, defaults to 20. 
 * @param params.generate_overlay
 * @param options - Optional object containing common parameters
 * @param callback - callback function returing err or data
 */
wineengine.search({params, options, function(err, data) {
	data = {
	  "status": "ok",
	  "method": "search",
	  "error": [],
	  "query_image": {
	    "filepath": "query_image.jpg",
	    "metadata": {
	      "vintage_year": 2013,
	      "vintage_rect": {
		"top": 364,
		"right": 277,
		"bottom": 391,
		"left": 237
	      },
	      "label_rect": {
		"top": 256,
		"right": 384,
		"bottom": 704,
		"left": 48
	      }
	    }
	  },
	  "result": [
	    {
	      "filepath": "h&b_label.jpg",
	      "score": 34,
	      "match_percent": 49.15,
	      "query_overlap_percent": 49.35,
	      "target_overlap_percent": 80.82,
	      "overlay": "overlay/?query=query_image.jpg&target=h%26b_label.jpg&sc_2=0.625942&\
	      tr_2_x=162.408&tr_2_y=534.414&  fd_2_z=1262.32&fd_2_x=299.411&fd_2_y=342.536&\
	      rot_1_y=-0.349066&rot_1_x=-0.523599&rot_1_z=0.0&rot_2_z=0.163794&rot_2_x=-0.599223&\
	      rot_2_y=-0.282812&fd_1_y=480.25&fd_1_x=216.0&fd_1_z=784.5",
	      "metadata": {
		"vintage_year": "2013",
		"vintage_rect": {
		  "top": 151,
		  "right": 354,
		  "bottom": 192,
		  "left": 288
		},
		"label_rect": {
		  "top": 0,
		  "right": 552,
		  "bottom": 685,
		  "left": 0
		}
	      }
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
wineengine.ping({options, function(err, data) {
	data = {
	  "status": "ok",
	  "error": [],
	  "method": "ping",
	  "result": []
	}
});
```
# Testing
Tests are written with mocha and stored in the tests folder

To run the tests first install the dependencies 
```shell
npm install
```
Then run the tests using 
```shell
npm test
```
# Todo
* Add asserts to tests
* Refactor compare to remove duplicate code

