# TinEye Services
TinEye services is a module that is designed to work with TinEye products: MatchEngine, MobileEngine, MulticolorEngine and WineEngine. 

Learn more at http://tineye.com

Official API documentation availabTinEyele at https://services.tineye.com/docs
# Contents

- [ Installation ](#installation)
- [ Basic Usage ](#basic-usage)
- [ Services ](#services)
    - [ Common Parameters ](#common-parameters)
    - [ Adding, Deleting or Updating Images ](#adding-deleteing-or-updating-an-image)
    - [ MatchEngine ](#matchengine)
        - [ Add URL ](#add-url)
        - [ Add Image File ](#add-image-file)
        - [ Compare ](#compare)
        - [ Count ](#count)
        - [ Delete ](#delete)
        - [ List ](#list)
        - [ Search ](#search)
        - [ Ping ](#ping)
    - [ MobileEngine ](#mobileengine)
        - [ Add URL ](#add-url-1)
        - [ Add Image File ](#add-image-file-1)
        - [ Compare ](#compare-1)
        - [ Count ](#count-1)
        - [ Delete ](#delete-1)
        - [ List ](#list-1)
        - [ Search ](#search-1)
        - [ Ping ](#ping-1)
    - [ MulticolorEngine ](#multicolorengine)
        - [ Add URL ](#add-url-2)
        - [ Add Image File ](#add-image-file-2)
        - [ Count ](#count-2)
        - [ Count Image Colors ](#count-image-colors)
        - [ Count Collection Colors ](#count-collection-colors)
        - [ Count Metadata](#count-metadata)
        - [ Delete ](#delete-2)
        - [ Extract Collection Colors ](#extract-collection-colors)
        - [ Extract Image Colors ](#extract-image-colors)
        - [ Get Metadata](#get-metadata)
        - [ Get Return Metadata](#get-return-metadata)
        - [ Get Search Metadata](#get-search-metadata)
        - [ List ](#list-2)
        - [ Search ](#search-2)
        - [ Ping ](#ping-2)
        - [ Update Metadata ](#update-metadata)
    - [ WineEngine ](#wineengine)
        - [ Add URL ](#add-url-3)
        - [ Add Image File ](#add-image-file-3)
        - [ Count ](#count-3)
        - [ Delete ](#delete-3)
        - [ List ](#list-3)
        - [ Search ](#search-3)
        - [ Ping ](#ping-3)
- [ Testing ](#testing)

# Installation
```shell
npm install tineye-services
```
# Basic Usage
```node
const { MatchEngine } = require('tineye-services');

// url is optional, if none is specified then default is https://matchengine.tineye.com/
matchengine = new MatchEngine('user_name', 'password', 'company_name', 'url');

// Sample Image URL
url = 'https://tineye.com/images/meloncat.jpg';

// Add an image to your index
// Requires both url and file path
matchengine.add({ url: url, filepath:'image_name'}, function (err, data) {
    if (!err)
        console.log(data);
    else
        console.log(err.message);
});
```
# Services
## Common Parameters
All of the below services accept the following optional common parameters object
```javascript
options = {
    format:'xml', // Return will be in xml format, default is json
    timeout:100, // The call will timeout after timeout seconds. Set to 0 for no timeout.
    callback:'handle_callback' // When using JSON, output will be wrapped in the callback method
}
```
## Adding, Deleting, or Updating an Image
The following APIs can perform one add, delete, or update operation at a time. For this reason it is important that images are **added or deleted one at a time**. One approach would to be use the [async](https://caolan.github.io/async/docs.html#eachOfSeries) module to ensure that images are submitted in series.

For example
```node
//Array of Images
var images = {
        image1: {
            imagePath:pathToImage1,
            filePath:'Image1'
        }, 
        image2: {
            imagePath:pathToImage2,
            filePath:'Image2'
        }
};

//object to store results
var results = {};

//Use the async module to ensure images are submitted one at a time
async.forEachOfSeries(images, function (value, key, callback) {

    multicolorengine.add({image:value.imagePath,filepath:value.filePath},  function(error, data) {
        console.log(error, data);
        
        if(data) {
            results[key] = data;
            callback();
        }
        else {
            results[key] = error;                
            calback(err);
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
Once TinEye Services is installed you can include and configure MatchEngine 
```node
const { MatchEngine } = require('tineye-services');

// url is optional, if none is specified then defualt is https://matchengine.tineye.com/
matchengine = new MatchEngine('user_name', 'password', 'company_name', 'url');
```
### Methods
Below are methods available for MatchEngine, for more information on parameters and responses go to https://services.tineye.com/developers/matchengine/
#### Add URL
Note. Only one image can be added at a time (see[ Adding, Deleting or Updating Images ](#adding-deleteing-or-updating-an-image))
```node
/**
 * Add an image to an image collection
 * @param params.url - Required
 * @param params.filepath - Optional
 * @param options - Optional
 * @param callback
 */
matchengine.add(params, options, function callback (err, data) {
    data = {
      "status": "ok",
      "error": [],
      "method": "add",
      "result": []
    };
});
```
#### Add Image File
Note. Only one image can be added at a time (see[ Adding, Deleting or Updating Images ](#adding-deleteing-or-updating-an-image))

```node
/**
 * Add an image to an image collection
 * @param params.image - Required (path to local image)
 * @param params.filepath - Required
 * @param options - Optional
 * @param callback
 */
matchengine.add(params, options, function callback (err, data) {
    data = {
      "status": "ok",
      "error": [],
      "method": "add",
      "result": []
    }
});
```
#### Compare
When comparing images you must have at least one url, image or filepath for each image being compared
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
 * @param params.minScore - Optional
 * @param params.check_horizontal_flip - Optional
 * @param params.generate_overlay - Optional
 * @param params.enhanced_score - Optional
 * @param params.color_compare - Optional
 * @param options - Optional
 * @param callback
 */
matchengine.compare(params, options, function(err, data) {
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
 * Counts Images in collection
 * @param options - Optional
 * @param callback
 */
matchengine.list(options, function(err, data) {
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
 * @param params.filepath - Required
 * @param options - Optional
 * @param callback
 */
matchengine.delete(params, options, function callback(err, data) {
    data = {
      "status": "ok",
      "error": [],
      "method": "delete",
      "result": []
    }
});
```
#### List
```node
/**
 * List Images in collection
 * @param params.offset - Optional
 * @param params.limit - Optional
 * @param options - Optional
 * @param callback
 */
matchengine.list(params, options, function(err, data) {
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
 * @param params.url - Required (if no image or filepath included)
 * @param params.image - Required (if no url or filepath included)
 * @param params.filepath - Required (if no image or url included)
 * @param params.offset - Optional
 * @param params.limit - Optional
 * @param params.minScore - Optional
 * @param params.check_horizontal_flip - Optional
 * @param params.generate_overlay - Optional
 * @param params.enhanced_score - Optional
 * @param options - Optional
 * @param callback - callback
 */
matchengine.search(params, options, function(err, data) {
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
 * @param options - Optional
 * @param callback
 */
matchengine.list(options, function(err, data) {
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
Note. Only one image can be added at a time (see[ Adding, Deleteing or Updating Images ](#adding-deleteing-or-updating-an-image))
```node
/**
 * Add an image to an image collection
 * @param params.url - Required
 * @param params.filepath - Optional
 * @param options - Optional
 * @param callback
 */
mobileengine.add(params, options, function callback (err, data) {
    data = {
      "status": "ok",
      "error": [],
      "method": "add",
      "result": []
    }
});
```
#### Add Image File
Note. Only one image can be added at a time (see[ Adding, Deleting or Updating Images ](#adding-deleteing-or-updating-an-image))
```node
/**
 * Add an image to an image collection
 * @param params.image - Required(image path)
 * @param params.filepath - Required
 * @param options - Optional
 * @param callback
 */
mobileengine.add(params, options, function callback (err, data) {
    data = {
      "status": "ok",
      "error": [],
      "method": "add",
      "result": []
    }
});
```
#### Compare
When comparing images you must have at least one url, image or filepath for each image being compared
```node
/**
 * Compare two images in collection
 * @param params.url1 - Required (if no image1 or filepath1 included)
 * @param params.image1 - Required (if no url1 or filepath1 included)
 * @param params.filepath1 - Required (if no image1 or url1 included)
 * @param params.url2 - Required (if no image2 or filepath2 included)
 * @param params.image2 - Required (if no url2 or filepath2 included)
 * @param params.filepath2 - Required (if no image2 or url2 included)
 * @param params.minScore - Optional
 * @param params.check_horizontal_flip - Optional
 * @param params.generate_overlay - Optional
 * @param params.enhanced_score - Optional
 * @param params.color_compare - Optional
 * @param options - Optional
 * @param callback
 */
mobileengine.compare(params, options, function(err, data) {
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
 * @param options - Optional
 * @param callback
 */
mobileengine.count(options, function(err, data) {
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
 * @param params.filepath - Required
 * @param options - Optional
 * @param callback
 */
mobileengine.delete(params, options, function callback(err, data) {
    data = {
      "status": "ok",
      "error": [],
      "method": "delete",
      "result": []
    }
});
```
#### List
```node
/**
 * List images in collection
 * @param params.offset - Optional
 * @param params.limit - Optional
 * @param options - Optional
 * @param callback
 */
mobileengine.list(params, options, function(err, data) {
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
 * @param params.url - Required (if no image or filepath included)
 * @param params.image - Required (if no url or filepath included)
 * @param params.filepath - Required (if no image or url included)
 * @param params.offset - Optional
 * @param params.limit - Optional
 * @param params.minScore - Optional
 * @param params.check_horizontal_flip - Optional
 * @param params.generate_overlay - Optional
 * @param params.enhanced_score - Optional
 * @param options - Optional
 * @param callback
 */
mobileengine.search(params, options, function(err, data) {
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
 * @param options - Optional
 * @param callback
 */
mobileengine.ping(options, function(err, data) {
    data = {
      "status": "ok",
      "error": [],
      "method": "ping",
      "result": []
    }
});
```
## MulticolorEngine
Once TinEye Services is installed you can include and configure MulticolorEngine 
```node
const { MulticolorEngine } = require('tineye-services');

// url is optional, if none is specified then default is https://multicolorengine.tineye.com/
multicolorengine = new MulticolorEngine('user_name', 'password', 'company_name', 'url');
```
### Methods
Below are methods available for MobileEngine, for more information on parameters and responses go to https://services.tineye.com/developers/multicolorengine/

#### Add URL
Note. Only one image can be added at a time (see[ Adding, Deleting or Updating Images ](#adding-deleteing-or-updating-an-image))
```node
/**
 * Add an image to an image collection
 * @param params.url - Required
 * @param params.filepath - Optional 
 * @param params.ignore_background - Optional 
 * @param params.ignore_interior_background - Optional
 * @param params.metadata - Optional
 * @param options - Optional
 * @param callback
 */
multicolorengine.add(params, options, function callback (err, data) {
    data = {
      "status": "ok",
      "error": [],
      "method": "add",
      "result": []
    }
})
```
#### Add Image File
Note. Only one image can be added at a time (see[ Adding, Deleting or Updating Images ](#adding-deleteing-or-updating-an-image))
```node
/**
 * Add an image to an image collection
 * @param params.image - Required (path to local image)
 * @param params.filepath - Optional
 * @param params.ignore_background - Optional 
 * @param params.ignore_interior_background - Optional
 * @param params.metadata - Optional
 * @param options - Optional
 * @param callback
 */
multicolorengine.add(params, options, function callback (err, data) {
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
 * @param options - Optional
 * @param callback
 */
multicolorengine.count({options, function(err, data) {
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
#### Count Image Colors 
```node
/**
 * Count colors from an Image
 *There are two ways to count image colors: images and urls
 * @param images.images[] - Required (array of image paths)
 * @param images.count_colors[] - Required
 * @param images.ignore_background - Optional
 * @param images.ignore_interior_background - Optional
 * @param urls.urls[] - Required
 * @param urls.count_colors[] - Required
 * @param urls.ignore_background - Optional
 * @param urls.ignore_interior_background - Optional
 * @param options - Optional
 * @param callback
 */
multicolorengine.countImageColors(params, options function(err, data) {
    data = {
        "status": "ok",
        "error": [],
        "method": "count_image_colors",
        "result": [
        {
            "color": [
            255,
            112,
            223
            ],
            "num_images_full_area": 0,
            "name": "Pale Magenta",
            "num_images_partial_area": 0,
            "class": "Violet"
        },
        {
            "color": [
            95,
            136,
            165
            ],
            "num_images_full_area": 0,
            "name": "Air Force Blue",
            "num_ images_partial_area": 0,
            "class": "Blue"
        },
        {
            "color": "df4f23",
            "num_images_full_area": 1,
            "name": "Cinnabar",
            "num_images_partial_area": 1,
            "class": "Red"
        }
        ]
    }
});
```
#### Count Collection Colors 
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
 * @param options - Optional
 * @param callback
 */
multicolorengine.countCollectionColors(params, options function(err, data) {
    data = {
    "status": "ok",
    "error": [],
    "method": "count_collection_colors",
    "result": [
        {
            "color": [
                255,
                112,
                223
            ],
            "num_images_full_area": 1,
            "name": "Pale Magenta",
            "num_images_partial_area": 2,
            "class": "Violet"
        },
        {
            "color": [
                95,
                136,
                165
            ],
            "num_images_full_area": 0,
            "name": "Air Force Blue",
            "num_images_partial_area": 0,
            "class": "Blue"
        },
        {
            "color": "df4f23",
            "num_images_full_area": 0,
            "name": "Cinnabar",
            "num_images_partial_area": 1,
            "class": "Red"
        }
    ]
}
});
```
#### Count Metadata
```node
/**
 * There are 4 ways to count collection colors: collection, metadata, colors and filepaths
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
 * @param options - Optional
 * @param callback
 */
multicolorengine.countMetadata(params, options function(err, data) {
    data = {
        "status": "ok",
        "error": [],
        "method": "count_metadata",
        "result": [
            {
                "metadata": [
                    {
                        "count-metadata": {
                            "count": "1",
                            "": {
                                "keywords": "dog"
                            }
                        }
                    },
                    {
                        "count-metadata": {
                            "count": "4",
                            "": {
                                "_or_operator_": [
                                    {
                                        "keywords": "whale"
                                    },
                                    {
                                        "keywords": "shark"
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    }
});
```
#### Delete 
```node
/**
 * Delete an image from the collection
 * @param params.filepath - Required
 * @param options - Optional
 * @param callback
 */
multicolorengine.delete(params, options, function callback(err, data) {
    data = {
      "status": "ok",
      "error": [],
      "method": "delete",
      "result": []
    }
})
```
#### Extract Collection Colors 
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
 * @param options - Optional
 * @param callback
 */
multicolorengine.extractCollectionColors(params, options function(err, data) {
    data = {
        "status": "ok",
        "error": [],
        "method": "extract_collection_colors",
        "result": [
            {
                "color": [
                    141,
                    125,
                    83
                ],
                "weight": 76.37,
                "name": "Clay Creek",
                "rank": 1,
                "class": "Grey"
            },
            {
                "color": [
                    35,
                    22,
                    19
                ],
                "weight": 23.63,
                "name": "Seal Brown",
                "rank": 2,
                "class": "Black"
            }
        ]
    }
});
```
#### Extract Image Colors 
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
 * @param options - Optional
 * @param callback
 */
multicolorengine.extractImageColors(params, options function(err, data) {
    data = {
        "status": "ok",
        "error": [],
        "method": "extract_image_colors",
        "result": [
        {
            "color": [
            194,
            66,
            28
            ],
            "weight": 76.37,
            "name": "Rust",
            "rank": 1,
            "class": "Red"
        },
        {
            "color": [
            141,
            125,
            83
            ],
            "weight": 23.63,
            "name": "Clay Creek",
            "rank": 2,
            "class": "Grey"
        }
        ]
    }
});
```
#### Get Metadata
```node
/**
 * Get Metadata for collection images
 * @param params.filepaths[] - Required
 * @param options - Optional
 * @param callback
 */
multicolorengine.getMetadata(params, options, function(err, data) {
    data = {
        "status": "ok",
        "error": [],
        "method": "get_metadata",
        "result": []
    }
});
```
#### Get Return Metadata
```node
/**
 * Get Return Metadata for collection images
 * @param options - Optional
 * @param callback
 */
multicolorengine.getReturnMetadata(options, function(err, data) {
    data = {
        "status": "ok",
        "error": [],
        "method": "get_return_metadata",
        "result": [
            {
                "metadata": {
                    "id": {
                        "count": "2",
                        "": null,
                        "type": "uint"
                    },
                }
            }
        ]
    }
});
```
#### Get Search Metadata
```node
/**
 * Get Search Metadata for collection images
 * @param options - Optional
 * @param callback
 */
multicolorengine.getSearchMetadata(options, function(err, data) {
    data = {
        "status": "ok",
        "error": [],
        "method": "get_search_metadata",
        "result": [
            {
                "metadata": {
                    "keywords": {
                        "count": "4",
                        "type": "string",
                        "": {
                           "dog": {
                                "count": "1",
                                "": null
                            },
                            "cat": {
                                "count": "1",
                                "": null
                            }
                            //...
                        }
                    }
                }
            }
        ]
    }
});
```
#### List
```node
/**
 * List images in collection
 * @param params.offset - Optional
 * @param params.limit - Optional
 * @param options - Optional
 * @param callback
 */
multicolorengine.list(params, options, function(err, data) {
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
 * @param options - Optional
 * @param callback
 */
multicolorengine.search(params, options, function(err, data) {
    data = {
        "count": "2",
        "status": "ok",
        "error": [],
        "method": "color_search",
        "result": [
        {
            "metadata-score": 3.0,
            "metadata": {
            "id": "67890"
            },
            "filepath": "path/folder/2.jpg"
        },
        {
            "metadata-score": 3.0,
            "metadata": {
            "id": "12345"
            },
            "filepath": "path/folder/1.jpg"
        }
        ]
    }
});
```
#### Ping
```node
/**
 * Pings Server
 * @param options - Optional
 * @param callback
 */
multicolorengine.ping(options, function(err, data) {
    data = {
      "status": "ok",
      "error": [],
      "method": "ping",
      "result": []
    }
});
```
#### Update Metadata
```node
/**
 * Update Metadata for collection image
 * @param params.filepath - Required
 * @param params.metadata - Required
 * @param options - Optional
 * @param callback
 */
multicolorengine.updateMetadata(options, function(err, data) {
    data = {
        "status": "ok",
        "error": [],
        "method": "update_metadata",
        "result": []
    }
});
```
## WineEngine
Once TinEye Services is installed you can include and configure WineEngine 
```node
const { WineEngine } = require('tineye-services');

// url is optional, if none is specified then default is https://wineengine.tineye.com/
wineengine = new WineEngine('user_name', 'password', 'company_name', 'url');
```
### Methods
Below are methods available for WineEngine, for more information on parameters and responses go to https://services.tineye.com/developers/wineengine/
#### Add URL
Note. Only one image can be added at a time (see[ Adding, Deleting or Updating Images ](#adding-deleteing-or-updating-an-image))
```node
/**
 * Add an image to an image collection
 * @param params.url - Required
 * @param params.filepath - Optional
 * @param options - Optional
 * @param callback
 */
wineengine.add(params, options, function callback (err, data) {
    data = {
      "status": "ok",
      "error": [],
      "method": "add",
      "result": []
    }
});
```
#### Add Image File
Note. Only one image can be added at a time (see[ Adding, Deleting or Updating Images ](#adding-deleteing-or-updating-an-image))
```node
/**
 * Add an image to an image collection
 * @param params.image - Required(path to local file)
 * @param params.filepath - Required
 * @param options - Optional
 * @param callback
 */
wineengine.add(params, options, function callback (err, data) {
    data = {
      "status": "ok",
      "error": [],
      "method": "add",
      "result": []
    }
});
```
#### Count
```node
/**
 * Counts images in collection
 * @param options - Optional
 * @param callback
 */
wineengine.count(options, function(err, data) {
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
 * @param params.filepath - Required
 * @param options - Optional
 * @param callback
 */
wineengine.delete(params, options, function callback(err, data) {
    data = {
      "status": "ok",
      "error": [],
      "method": "delete",
      "result": []
    }
});
```
#### List
```node
/**
 * List images in collection
 * @param params.offset - Optional
 * @param params.limit - Optional
 * @param options - Optional
 * @param callback
 */
wineengine.list(params, options, function(err, data) {
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
 * @param params.url - Required (if no image or filepath included)
 * @param params.image - Required (if no url or filepath included)
 * @param params.filepath - Required (if no image or url included)
 * @param params.limit - Optional
 * @param params.generate_overlay - Optional
 * @param options - Optional
 * @param callback
 */
wineengine.search(params, options, function(err, data) {
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
 * @param options - Optional
 * @param callback
 */
wineengine.ping(options, function(err, data) {
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

Test must run on an empty collection of images

To run the tests first install the dependencies 
```shell
npm install
```
Add test servers to the /test/testConfig.js file
```
module.exports = {
    MatchEngine:{
        url:'<host>/rest/',
        user:'username'
        pass:'password'
    },
    MobileEngine:{
    //...
    }
};
```
Then run the tests using 
```shell
npm test
```
# Todo
* Add asserts to tests
* Add more comprehensive tests
* Re-factor compare to remove duplicate code
* Alter extractCollectionColors to make optional params object
* Alter methods to return promises if no callback is provided
