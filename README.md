# TinEye Services
**tineye-services** is the official Node.js library for [TinEye Services APIs](https://services.tineye.com/),
 which includes [MatchEngine](https://services.tineye.com/MatchEngine),
 [MobileEngine](https://services.tineye.com/MobileEngine), [MulticolorEngine](https://services.tineye.com/MulticolorEngine)
 and [WineEngine](https://services.tineye.com/WineEngine). The Node library for the [TinEye API](https://services.tineye.com/TinEyeAPI)
can be found [here](https://github.com/TinEye/tineye_api_node).

Learn more at https://tineye.com

Official API documentation is available at https://services.tineye.com/docs
# Contents
- [ Installation ](#installation)
- [ Getting started ](#getting-started)
- [ Services ](#services)
    - [ Common parameters ](#common-parameters)
    - [ Adding, deleting or updating images ](#adding-deleting-and-updating-images)
    - [ MatchEngine ](#matchengine)
        - [ Add URL ](#add-url)
        - [ Add image file ](#add-image-file)
        - [ Compare ](#compare)
        - [ Count ](#count)
        - [ Delete ](#delete)
        - [ List ](#list)
        - [ Search ](#search)
        - [ Ping ](#ping)
    - [ MobileEngine ](#mobileengine)
        - [ Add URL ](#add-url-1)
        - [ Add image file ](#add-image-file-1)
        - [ Compare ](#compare-1)
        - [ Count ](#count-1)
        - [ Delete ](#delete-1)
        - [ List ](#list-1)
        - [ Search ](#search-1)
        - [ Ping ](#ping-1)
    - [ MulticolorEngine ](#multicolorengine)
        - [ Add URL ](#add-url-2)
        - [ Add image file ](#add-image-file-2)
        - [ Count ](#count-2)
        - [ Count image colors ](#count-image-colors)
        - [ Count collection colors ](#count-collection-colors)
        - [ Count metadata](#count-metadata)
        - [ Delete ](#delete-2)
        - [ Extract collection colors ](#extract-collection-colors)
        - [ Extract image colors ](#extract-image-colors)
        - [ Get metadata](#get-metadata)
        - [ Get return metadata](#get-return-metadata)
        - [ Get search metadata](#get-search-metadata)
        - [ List ](#list-2)
        - [ Search ](#search-2)
        - [ Ping ](#ping-2)
        - [ Update metadata ](#update-metadata)
    - [ WineEngine ](#wineengine)
        - [ Add URL ](#add-url-3)
        - [ Add image file ](#add-image-file-3)
        - [ Count ](#count-3)
        - [ Delete ](#delete-3)
        - [ List ](#list-3)
        - [ Search ](#search-3)
        - [ Ping ](#ping-3)
- [ Testing ](#testing)

# Installation
Install the latest version of the library using npm:

```shell
npm install tineye-services
```
# Getting started
After installing, `require` the library to start using it:
```node
const { MatchEngine } = require('tineye-services');
```

Now that you've required the library, you can use it to create an instance of the relevant API object.
For example, if you're using MatchEngine and you want to add an image:
```node
var matchengine = new MatchEngine('user_name', 'password', 'company_name');

// Sample image URL
var url = 'https://tineye.com/images/meloncat.jpg';

// Add an image to your index
// Required URL and optional remote file path
matchengine.add({url: url, filepath: 'image_name'}, function callback(err, data) {
    if(!err)
        console.log(data);
    else
        console.log(err.message);
});
```
Be sure to populate the `user_name`, `password`, `company_name` and `url` parameters with the appropriate
values for your API installation.

# Services
## Common parameters
All TinEye Services accept these optional common parameters in addition to the parameters listed in the params object:
```javascript
var params = {
    format: 'xml', // Return will be in xml format, default is json
    timeout: 100,  // The call will timeout after timeout seconds. Set to 0 for no timeout.
};
```
## Adding, deleting and updating an image
TinEye Services APIs can only perform one add, delete or update operation at a time.
Attempting to do multiple add, delete or update operations simultaneously will cause your
performance to degrade. To achieve the best possible performance, we recommend using the
[async](https://caolan.github.io/async/docs.html#eachOfSeries) module to ensure that these
operations are submitted in series.

For example:
```node
// Array of images
var images = {
    image1: {
        imagePath: pathToImage1,
        filePath: 'Image1'
    },
    image2: {
        imagePath: pathToImage2,
        filePath: 'Image2'
    }
};

// Object to store results
var results = {};

// Use the async module to ensure images are submitted one at a time
async.forEachOfSeries(images, function (value, key, callback) {

    multicolorengine.add({image:value.imagePath,filepath:value.filePath},  function (error, data) {
        console.log(error, data);

        if(data) {
            results[key] = data;
            callback();
        }
        else {
            results[key] = error;
            callback(err);
        }

    });

}, function (error) {

    if(error)
        console.log(error);
    else
        console.log(results);
});
```

## MatchEngine
To use MatchEngine, include `tineye-services` and then create a `MatchEngine` object using your
own `user_name`, `password` and `company_name`:
```node
const { MatchEngine } = require('tineye-services');

// URL is optional, if none is specified then default is https://multicolorengine.tineye.com/<company_name>/rest/
matchengine = new MatchEngine('user_name', 'password', 'company_name');
```
### Methods
Please refer to the full [MatchEngine documentation](https://services.tineye.com/developers/matchengine/) for
more details.
#### Add URL
**Note**: Only one image operation can be performed at a time (see [ Adding, deleting or updating images ](#adding-deleting-or-updating-an-image)).
```node
/**
 * Add an image to an image collection
 * @param params.url - Required
 * @param params.filepath - Required
 * @param callback
 */
var params = {
    url: 'https://aurltoanimage.com/image.jpg',
    filepath: 'path/to/store/image/on/server'
};
matchengine.add(params, function callback (err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "add",
    //     "result": []
    // };
});
```
#### Add image file
**Note**: Only one image operation can be performed at a time (see [ Adding, deleting or updating images ](#adding-deleting-or-updating-an-image)).
```node
/**
 * Add an image to an image collection
 * @param params.image - Required (path to local image)
 * @param params.filepath - Optional
 * @param callback
 */
var params = {
    image: '/path/to/local/image.jpg',
    filepath: 'path/to/store/image/on/server'
};
matchengine.add(params, function callback (err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "add",
    //     "result": []
    // };
});
```
#### Compare
The compare operation requires that you submit two images.
Each image can be submitted as a URL, image data or a filepath.
The two images do not need to be submitted in the same method
(for example, you can upload one image and use a filepath
for the second).
```node
/**
 * Compare two images in collection
 *
 * @param params.url1 - Required (if no image1 or filepath1 included)
 * @param params.image1 - Required (if no url1 or filepath1 included)
 * @param params.filepath1 - Required (if no image1 or url1 included)
 * @param params.url2 - Required (if no image2 or filepath2 included)
 * @param params.image2 - Required (if no url2 or filepath2 included)
 * @param params.filepath2 - Required (if no image2 or url2 included)
 * @param params.min_score - Optional
 * @param params.check_horizontal_flip - Optional
 * @param params.generate_overlay - Optional
 * @param params.enhanced_score - Optional
 * @param params.color_compare - Optional
 * @param callback
 */
var params = {
    image1: '/path/to/local/image.jpg',
    filepath2: 'path/to/image/on/server',
    enhanced_score: true
};
matchengine.compare(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "compare",
    //     "result": [
    //         {
    //             "target_overlap_percent": 99.22,
    //             "query_overlap_percent": 98.59,
    //             "filepath": "match.jpg",
    //             "score_enhanced": 68.2,
    //             "score": 65.9,
    //             "match_percent": 92.11
    //         }
    //     ]
    // }
});
```
#### Count
```node
/**
 * Counts images in collection
 * @param params - Common Parameters
 * @param callback
 */
var params = {};
matchengine.count(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "count",
    //     "result": [
    //         4
    //     ]
    // }
});
```
#### Delete
**Note**: Only one image operation can be performed at a time (see [ Adding, deleting or updating images ](#adding-deleting-or-updating-an-image)).
```node
/**
 * Delete an image from the collection
 * @param params.filepath - Required
 * @param callback
 */
var params = {
    filepath: 'path/to/image/on/server'
};
matchengine.delete(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "delete",
    //     "result": []
    // }
});
```
#### List
```node
/**
 * List images in collection
 * @param params.offset - Optional
 * @param params.limit - Optional
 * @param callback
 */
var params = {};
matchengine.list(params, function callback(err, data) {
   // data = {
   //     "status": "ok",
   //     "error": [],
   //     "method": "list",
   //     "result": [
   //         "melonCat",
   //         "limeCat.jpg",
   //         "meloncat.jpg",
   //         "image.jpg"
   //     ]
   // }
});
```
#### Search
```node
/**
 * Search images in collection
 * @param params.url - Required (if no image or filepath included)
 * @param params.image - Required (if no url or filepath included)
 * @param params.filepath - Required (if no image or url included)
 * @param params.offset - Optional
 * @param params.limit - Optional
 * @param params.min_score - Optional
 * @param params.check_horizontal_flip - Optional
 * @param params.generate_overlay - Optional
 * @param params.enhanced_score - Optional
 * @param callback - callback
 */
var params = {
    url: 'https://aurltoanimage.com/image.jpg',
};
matchengine.search(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "search",
    //     "result": [
    //         {
    //             "match_percent": 89.52,
    //             "score": 97.2,
    //             "target_overlap_percent": 95.62,
    //             "query_overlap_percent": 72.37,
    //             "filepath": "path/folder/match1.png"
    //         },
    //         {
    //             "match_percent": 82.83,
    //             "score": 94.5,
    //             "target_overlap_percent": 87.13,
    //             "query_overlap_percent": 97.17,
    //             "filepath": "path/folder/match2.png"
    //         }
    //     ]
    // }
});
```
#### Ping
```node
/**
 * Pings API
 * @param callback
 */
matchengine.ping(function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "ping",
    //     "result": []
    // }
});
```
## MobileEngine
To use MobileEngine, include `tineye-services` and then create a `MobileEngine` object using your
own `user_name`, `password` and `company_name`:
```node
const { MobileEngine } = require('tineye-services')

// URL is optional, if none is specified then default is https://mobileengine.tineye.com/<company_name>/rest/
mobileengine = new MobileEngine('user_name', 'password', 'company_name');
```
### Methods
Please refer to the full [MobileEngine documentation](https://services.tineye.com/developers/mobileengine/)
for more details.
#### Add URL
**Note**: Only one image operation can be performed at a time (see [ Adding, deleting or updating images ](#adding-deleting-or-updating-an-image)).
```node
/**
 * Add an image to an image collection
 * @param params.url - Required
 * @param params.filepath - Required
 * @param callback
 */
var params = {
    url: 'https://aurltoanimage.com/image.jpg',
    filepath: 'path/to/store/image/on/server'
};
mobileengine.add(params, function callback (err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "add",
    //     "result": []
    // }
});
```
#### Add image file
**Note**: Only one image operation can be performed at a time (see [ Adding, deleting or updating images ](#adding-deleting-or-updating-an-image)).
```node
/**
 * Add an image to an image collection
 * @param params.image - Required(image path)
 * @param params.filepath - Optional
 * @param callback
 */
var params = {
    image: '/path/to/local/image.jpg',
    filepath: 'path/to/store/image/on/server'
};
mobileengine.add(params, function callback (err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "add",
    //     "result": []
    // }
});
```
#### Compare
The compare operation requires that you submit two images.
Each image can be submitted as a URL, image data or a filepath.
The two images do not need to be submitted in the same method
(for example, you can upload one image and use a filepath
for the second).
```node
/**
 * Compare two images in collection
 * @param params.url1 - Required (if no image1 or filepath1 included)
 * @param params.image1 - Required (if no url1 or filepath1 included)
 * @param params.filepath1 - Required (if no image1 or url1 included)
 * @param params.url2 - Required (if no image2 or filepath2 included)
 * @param params.image2 - Required (if no url2 or filepath2 included)
 * @param params.filepath2 - Required (if no image2 or url2 included)
 * @param params.min_score - Optional
 * @param params.check_horizontal_flip - Optional
 * @param params.generate_overlay - Optional
 * @param params.enhanced_score - Optional
 * @param params.color_compare - Optional
 * @param callback
 */
var params = {
    image1: '/path/to/local/image.jpg',
    filepath2: 'path/to/image/on/server',
    enhanced_score: true
};
mobileengine.compare(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "compare",
    //     "result": [
    //         {
    //             "target_overlap_percent": 99.22,
    //             "query_overlap_percent": 98.59,
    //             "filepath": "match.jpg",
    //             "listscore_enhanced": 68.2,
    //             "score": 65.9,
    //             "match_percent": 92.11
    //         }
    //     ]
    // }
});
```
#### Count
```node
/**
 * Counts images in collection
 * @param params - Common Parameters
 * @param callback
 */
var params = {};
mobileengine.count(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "count",
    //     "result": [
    //         4
    //     ]
    // }
});
```
#### Delete
**Note**: Only one image operation can be performed at a time (see [ Adding, deleting or updating images ](#adding-deleting-or-updating-an-image)).
```node
/**
 * Delete an image from the collection
 * @param params.filepath - Required
 * @param callback
 */
var params = {
    filepath: 'path/to/image/on/server'
};
mobileengine.delete(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "delete",
    //     "result": []
    // }
});
```
#### List
```node
/**
 * List images in collection
 * @param params.offset - Optional
 * @param params.limit - Optional
 * @param callback
 */
var params = {};
mobileengine.list(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "list",
    //     "result": [
    //         "melonCat",
    //         "limeCat.jpg",
    //         "meloncat.jpg",
    //         "image.jpg"
    //     ]
    // }
});
```
#### Search
```node
/**
 * Search images in collection
 * @param params.url - Required (if no image or filepath included)
 * @param params.image - Required (if no url or filepath included)
 * @param params.filepath - Required (if no image or url included)
 * @param params.offset - Optional
 * @param params.limit - Optional
 * @param params.min_score - Optional
 * @param params.check_horizontal_flip - Optional
 * @param params.generate_overlay - Optional
 * @param params.enhanced_score - Optional
 * @param callback
 */
var params = {
  image: '/path/to/local/image.jpg',
};
mobileengine.search(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "search",
    //     "result": [
    //         {
    //             "match_percent": 89.52,
    //             "score": 97.2,
    //             "target_overlap_percent": 95.62,
    //             "query_overlap_percent": 72.37,
    //             "filepath": "path/folder/match1.png"
    //         },
    //         {
    //             "match_percent": 82.83,
    //             "score": 94.5,
    //             "target_overlap_percent": 87.13,
    //             "query_overlap_percent": 97.17,
    //             "filepath": "path/folder/match2.png"
    //         }
    //     ]
    // }
});
```
#### Ping
```node
/**
 * Pings API
 * @param params - Common Parameters
 * @param callback
 */
mobileengine.ping(function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "ping",
    //     "result": []
    // }
});
```
## MulticolorEngine
To use MulticolorEngine, include `tineye-services` and then create a `MulticolorEngine` object using your
own `user_name`, `password` and `company_name`:
```node
const { MulticolorEngine } = require('tineye-services');

// URL is optional, if none is specified then default is https://multicolorengine.tineye.com/<company_name>/rest/
multicolorengine = new MulticolorEngine('user_name', 'password', 'company_name');
```
### Methods
Please refer to the full [MulticolorEngine documentation](https://services.tineye.com/developers/multicolorengine/)
for more information.

#### Add URL
**Note**: Only one image operation can be performed at a time (see [ Adding, deleting or updating images ](#adding-deleting-or-updating-an-image)).
```node
/**
 * Add an image to an image collection
 * @param params.url - Required
 * @param params.filepath - Required
 * @param params.ignore_background - Optional
 * @param params.ignore_interior_background - Optional
 * @param params.metadata - Optional
 * @param callback
 */
var params = {
    url: 'https://aurltoanimage.com/image.jpg',
    filepath: 'path/to/store/image/on/server'
};
multicolorengine.add(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "add",
    //     "result": []
    // }
});
```
#### Add image file
**Note**: Only one image operation can be performed at a time (see [ Adding, deleting or updating images ](#adding-deleting-or-updating-an-image)).
```node
/**
 * Add an image to an image collection
 * @param params.image - Required (path to local image)
 * @param params.filepath - Optional
 * @param params.ignore_background - Optional
 * @param params.ignore_interior_background - Optional
 * @param params.metadata - Optional
 * @param callback
 */
var params = {
    image: '/path/to/local/image.jpg',
    filepath: 'path/to/store/image/on/server'
};
multicolorengine.add(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "add",
    //     "result": []
    // }
})
```
#### Count
```node
/**
 * Counts images in collection
 * @param params - Common Parameters
 * @param callback
 */
var params = {};
multicolorengine.count(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "count",
    //     "result": [
    //         4
    //     ]
    // }
});
```
#### Count image colors
```node
/**
 * Count colors from an image
 *There are two ways to count image colors: images and urls
 * @param images.images[] - Required (array of image paths)
 * @param images.count_colors[] - Required
 * @param images.ignore_background - Optional
 * @param images.ignore_interior_background - Optional
 * @param urls.urls[] - Required
 * @param urls.count_colors[] - Required
 * @param urls.ignore_background - Optional
 * @param urls.ignore_interior_background - Optional
 * @param callback
 */
var params = {
    images:[
        'local/path/to/image1.jpg',
        'local/path/to/image2.jpg'
    ],
    count_colors:[
        '255,112,223',
        '95,136,165',
        '#DF4F23'
    ]
};
multicolorengine.countImageColors(params, function callback(err, data) {
    // data ={
    //     "status": "ok",
    //     "error": [],
    //     "method": "count_image_colors",
    //     "result": [
    //         {
    //             "color": [
    //                 255,
    //                 112,
    //                 223
    //             ],
    //             "num_images_full_area": 0,
    //             "name": "Pale Magenta",
    //             "num_images_partial_area": 0,
    //             "class": "Violet"
    //         },
    //         {
    //             "color": [
    //                 95,
    //                 136,
    //                 165
    //             ],
    //             "num_images_full_area": 0,
    //             "name": "Air Force Blue",
    //             "num_ images_partial_area": 0,
    //             "class": "Blue"
    //         },
    //         {
    //             "color": "df4f23",
    //             "num_images_full_area": 1,
    //             "name": "Cinnabar",
    //             "num_images_partial_area": 1,
    //             "class": "Red"
    //         }
    //     ]
    // }
});
```
#### Count collection colors
```node
/**
 * There are 4 ways to count collection colors: collection, metadata, colors and filepaths
 * @param collection.count_colors[] - Required
 * @param metadata.metadata - Required
 * @param metadata.count_colors[] - Required
 * @param colors.colors[] - Required
 * @param colors.weights[] - Required
 * @param colors.count_colors[] - Required
 * @param filepaths.filepaths[] - Required
 * @param filepaths.count_colors[] - Required
 * @param callback
 */
var params = {
    count_colors: [
        '255,112,223',
        '95,136,165',
        '#DF4F23'
    ]
};
multicolorengine.countCollectionColors(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "count_collection_colors",
    //     "result": [
    //         {
    //             "color": [
    //                 255,
    //                 112,
    //                 223
    //             ],
    //             "num_images_full_area": 1,
    //             "name": "Pale Magenta",
    //             "num_images_partial_area": 2,
    //             "class": "Violet"
    //         },
    //         {
    //             "color": [
    //                 95,
    //                 136,
    //                 165
    //             ],
    //             "num_images_full_area": 0,
    //             "name": "Air Force Blue",
    //             "num_images_partial_area": 0,
    //             "class": "Blue"
    //         },
    //         {
    //             "color": "df4f23",
    //             "num_images_full_area": 0,
    //             "name": "Cinnabar",
    //             "num_images_partial_area": 1,
    //             "class": "Red"
    //         }
    //     ]
    // }
});
```
#### Count metadata
```node
/**
 * There are 4 ways to count collection colors: collection, metadata, colors and filepaths. See official documentation for more information on metadata queries.
 * @param collection.count_metadata[] - Required
 * @param metadata.metadata - Required
 * @param metadata.count_metadata[] - Required
 * @param metadata.min_score - Optional
 * @param colors.colors[] - Required
 * @param colors.weights[] - Required
 * @param colors.count_metadata[] - Required
 * @param colors.min_score - Optional
 * @param filepaths.filepaths[] - Required
 * @param filepaths.count_metadata[] - Required
 * @param callback
 */

var params = {
    count_metadata = {
        "_or_operator_": [
            {
                "keywords":"dog"
            },
            {
                "keywords":"cheetah"
            }
        ]
    }
};
multicolorengine.countMetadata(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "count_metadata",
    //     "result": [
    //         {
    //             "metadata": [
    //                 {
    //                     "count-metadata": {
    //                         "count": "1",
    //                         "": {
    //                             "keywords": "dog"
    //                         }
    //                     }
    //                 }
    //             ]
    //         }
    //     ]
    // }
});
```
#### Delete
**Note**: Only one image operation can be performed at a time (see [ Adding, deleting or updating images ](#adding-deleting-or-updating-an-image)).
```node
/**
 * Delete an image from the collection
 * @param params.filepath - Required
 * @param params - Common Parameters
 * @param callback
 */
var params = {
    filepath: 'path/to/image/on/server'
};
multicolorengine.delete(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "delete",
    //     "result": []
    // }
})
```
#### Extract collection colors
```node
/**
 * There are 4 ways to extract collection colors: collection, metadata, colors and filepaths
 * @param collection.count_colors[] - Required
 * @param metadata.metadata - Required
 * @param metadata.count_colors[] - Required
 * @param colors.colors[] - Required
 * @param colors.weights[] - Required
 * @param colors.limit - Optional
 * @param colors.color_format - Optional
 * @param filepaths.filepaths[] - Required
 * @param filepaths.limit - Optional
 * @param filepaths.color_format - Optional
 * @param callback
 */
var params = {
    colors: ['212,123,225','126,135,150'],
    weights: [70,30,],
    limit: 50,
    color_format: 'hex'
};
multicolorengine.extractCollectionColors(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "extract_collection_colors",
    //     "result": [
    //         {
    //             "color": [
    //                 141,
    //                 125,
    //                 83
    //             ],
    //             "weight": 76.37,
    //             "name": "Clay Creek",
    //             "rank": 1,
    //             "class": "Grey"
    //         },
    //         {
    //             "color": [
    //                 35,
    //                 22,
    //                 19
    //             ],
    //             "weight": 23.63,
    //             "name": "Seal Brown",
    //             "rank": 2,
    //             "class": "Black"
    //         }
    //     ]
    // }
});
```
#### Extract image colors
```node
/**
 * There are two ways to extract colors from an image: images and urls
 * @param images.images[] - Required (array of image paths)
 * @param images.ignore_background - Optional
 * @param images.ignore_interior_background - Optional
 * @param images.target_number_colors - Optional
 * @param images.limit - Optional
 * @param images.color_format - Optional
 * @param urls.urls[] - Required (array of image urls)
 * @param urls.ignore_background - Optional
 * @param urls.ignore_interior_background - Optional
 * @param urls.target_number_colors - Optional
 * @param urls.limit - Optional
 * @param urls.color_format - Optional
 * @param callback
 */
var params = {
    images: [
        'local/path/to/image1.jpg',
        'local/path/to/image2.jpg'
    ]
};
multicolorengine.extractImageColors(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "extract_image_colors",
    //     "result": [
    //         {
    //             "color": [
    //                 194,
    //                 66,
    //                 28
    //             ],
    //             "weight": 76.37,
    //             "name": "Rust",
    //             "rank": 1,
    //             "class": "Red"
    //         },
    //         {
    //             "color": [
    //                 141,
    //                 125,
    //                 83
    //             ],
    //             "weight": 23.63,
    //             "name": "Clay Creek",
    //             "rank": 2,
    //             "class": "Grey"
    //         }
    //     ]
    // }
});
```
#### Get metadata
```node
/**
 * Get Metadata for collection images
 * @param params.filepaths[] - Required
 * @param callback
 */
var params = {
    filepaths: [
        'remote/path/to/image1.jpg',
        'remote/path/to/image2.jpg'
    ]
};
multicolorengine.getMetadata(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "get_metadata",
    //     "result": []
    // }
});
```
#### Get return metadata
```node
/**
 * Get Return Metadata for collection images
 * @param params - Common Parameters
 * @param callback
 */
var params = {};
multicolorengine.getReturnMetadata(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "get_return_metadata",
    //     "result": [
    //         {
    //             "metadata": {
    //                 "id": {
    //                     "count": "2",
    //                     "": null,
    //                     "type": "uint"
    //                 },
    //             }
    //         }
    //     ]
    // }
});
```
#### Get search metadata
```node
/**
 * Get Search Metadata for collection images
 * @param params - Common Parameters
 * @param callback
 */
var params = {};
multicolorengine.getSearchMetadata(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "get_search_metadata",
    //     "result": [
    //         {
    //             "metadata": {
    //                 "keywords": {
    //                     "count": "4",
    //                     "type": "string",
    //                     "": {
    //                        "dog": {
    //                             "count": "1",
    //                             "": null
    //                         },
    //                         "cat": {
    //                             "count": "1",
    //                             "": null
    //                         }
    //                         //...
    //                     }
    //                 }
    //             }
    //         }
    //     ]
    // }
});
```
#### List
```node
/**
 * List images in collection
 * @param params.offset - Optional
 * @param params.limit - Optional
 * @param callback
 */
var params = {};
multicolorengine.list(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "list",
    //     "result": [
    //         "melonCat",
    //         "limeCat.jpg",
    //         "meloncat.jpg",
    //         "image.jpg"
    //     ]
    // }
});
```
#### Search
```node
/**
 * Search colors in collection
 * @param params.url - Required (if no image or filepath included)
 * @param params.image - Required (if no url or filepath included)
 * @param params.filepath - Required (if no image or url included)
 * @param params.colors[] - Required
 * @param params.ignore_background - Optional
 * @param params.ignore_interior_background - Optional
 * @param params.metadata - Optional
 * @param params.return_metadata - Optional
 * @param params.sort_metadata - Optional
 * @param params.weights[] - Optional
 * @param params.limit - Optional
 * @param params.min_score - Optional
 * @param params.offset - Optional
 * @param callback
 */
var params = {
  image: '/path/to/local/image.jpg',
  colors: ['#1abc9c']
};
multicolorengine.search(params, function callback(err, data) {
    // data = {
    //     "count": "2",
    //     "status": "ok",
    //     "error": [],
    //     "method": "color_search",
    //     "result": [
    //         {
    //             "metadata-score": 3.0,
    //             "metadata": {
    //             "id": "67890"
    //             },
    //             "filepath": "path/folder/2.jpg"
    //         },
    //         {
    //             "metadata-score": 3.0,
    //             "metadata": {
    //             "id": "12345"
    //             },
    //             "filepath": "path/folder/1.jpg"
    //         }
    //     ]
    // }
});
```
#### Ping
```node
/**
 * Pings API
 * @param params - Common Parameters
 * @param callback
 */
var params = {};
multicolorengine.ping(params, function(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "ping",
    //     "result": []
    // }
});
```
#### Update metadata
```node
/**
 * Update Metadata for collection image
 * @param params.filepath - Required
 * @param params.metadata - Required
 * @param params - Common Parameters
 * @param callback
 */
params = {
    filepath: 'path/to/image/on/server',
    metadata: {
        "price": {
        "action": "mixed",
        "type": "float",
        "": "120.89"
        }
    }
};
multicolorengine.updateMetadata(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "update_metadata",
    //     "result": []
    // }
});
```
## WineEngine
To use WineEngine, include `tineye-services` and then create a `WineEngine` object using your
own `user_name`, `password` and `company_name`:
```node
const { WineEngine } = require('tineye-services');

// URL is optional, if none is specified then default is https://wineengine.tineye.com/<company_name>/rest/
wineengine = new WineEngine('user_name', 'password', 'company_name');
```
### Methods
Please refer to the full [WineEngine documentation](https://services.tineye.com/developers/wineengine/) for more information.
#### Add URL
**Note**: Only one image operation can be performed at a time (see [ Adding, deleting or updating images ](#adding-deleting-or-updating-an-image)).
```node
/**
 * Add an image to an image collection
 * @param params.url - Required
 * @param params.filepath - Optional
 * @param callback
 */
var params = {
    url: 'https://aurltoanimage.com/image.jpg',
    filepath: 'path/to/store/image/on/server'
};
wineengine.add(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "add",
    //     "result": []
    // }
});
```
#### Add image file
**Note**: Only one image operation can be performed at a time (see [ Adding, deleting or updating images ](#adding-deleting-or-updating-an-image)).
```node
/**
 * Add an image to an image collection
 * @param params.image - Required(path to local file)
 * @param params.filepath - Required
 * @param callback
 */
var params = {
    image: '/path/to/local/image.jpg',
    filepath: 'path/to/store/image/on/server'
};
wineengine.add(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "add",
    //     "result": []
    // }
});
```
#### Count
```node
/**
 * Counts images in collection
 * @param params - Common Parameters
 * @param callback
 */
var params = {};
wineengine.count(params, function(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "count",
    //     "result": [
    //         4
    //     ]
    // }
});
```
#### Delete
**Note**: Only one image operation can be performed at a time (see [ Adding, deleting or updating images ](#adding-deleting-or-updating-an-image)).

```node
/**
 * Delete an image from the collection
 * @param params.filepath - Required
 * @param callback
 */
var params = {
    filepath: 'path/to/image/on/server'
};
wineengine.delete(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "delete",
    //     "result": []
    // }
});
```
#### List
```node
/**
 * List images in collection
 * @param params.offset - Optional
 * @param params.limit - Optional
 * @param callback
 */
var params = {};
wineengine.list(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "method": "list",
    //     "error": [],
    //     "result": [
    //         "path/folder/2.jpg",
    //         "path/folder/3.jpg"
    //     ]
    // }
});
```
#### Search
```node
/**
 * Search images in collection
 * @param params.url - Required (if no image or filepath included)
 * @param params.image - Required (if no url or filepath included)
 * @param params.filepath - Required (if no image or url included)
 * @param params.limit - Optional
 * @param params.generate_overlay - Optional
 * @param callback
 */
var params = {
    filepath: 'path/to/image/on/server'
};
wineengine.search(params, function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "method": "search",
    //     "error": [],
    //     "query_image": {
    //         "filepath": "query_image.jpg",
    //         "metadata": {
    //             "vintage_year": 2013,
    //             "vintage_rect": {
    //                 "top": 364,
    //                 "right": 277,
    //                 "bottom": 391,
    //                 "left": 237
    //             },
    //             "label_rect": {
    //                 "top": 256,
    //                 "right": 384,
    //                 "bottom": 704,
    //                 "left": 48
    //             }
    //         }
    //     },
    //     "result": [
    //         {
    //             "filepath": "h&b_label.jpg",
    //             "score": 34,
    //             "match_percent": 49.15,
    //             "query_overlap_percent": 49.35,
    //             "target_overlap_percent": 80.82,
    //             "overlay": "overlay/?query=query_image.jpg&target=h%26b_label.jpg&sc_2=0.625942& \
    //                 tr_2_x=162.408&tr_2_y=534.414&  fd_2_z=1262.32&fd_2_x=299.411&fd_2_y=342.536& \
    //                 rot_1_y=-0.349066&rot_1_x=-0.523599&rot_1_z=0.0&rot_2_z=0.163794&rot_2_x=-0.599223& \
    //                 rot_2_y=-0.282812&fd_1_y=480.25&fd_1_x=216.0&fd_1_z=784.5",
    //             "metadata": {
    //                 "vintage_year": "2013",
    //                 "vintage_rect": {
    //                     "top": 151,
    //                     "right": 354,
    //                     "bottom": 192,
    //                     "left": 288
    //                 },
    //                 "label_rect": {
    //                     "top": 0,
    //                     "right": 552,
    //                    "bottom": 685,
    //                    "left": 0
    //                 }
    //             }
    //         }
    //     ]
    // }
});
```
#### Ping
```node
/**
 * Pings API
 * @param params - Common Parameters
 * @param callback
 */

wineengine.ping(function callback(err, data) {
    // data = {
    //     "status": "ok",
    //     "error": [],
    //     "method": "ping",
    //     "result": []
    // }
});
```
# Testing
Tests are run with mocha and stored in the tests folder.

Test must run on an empty collection of images.

To run the tests first install the dependencies.
```shell
npm install
```
Add test servers to the /test/testConfig.js file.
```
module.exports = {
    MatchEngine: {
        url: '<host>/rest/',
        user: 'username',
        pass: 'password',
        companyName:''
    },
    MobileEngine:{
        //...
    }
};
```
Then run the tests using the below command.
```shell
npm test
```
# Todo
* Add asserts to tests
* Move Test Server info to an environment variable
* Add more comprehensive tests
* Re-factor compare to remove duplicate code
* Alter extractCollectionColors to make optional params object
* Alter methods to return promises if no callback is provided
