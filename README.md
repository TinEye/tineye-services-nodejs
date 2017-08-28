# Tineye Services

Tineye services is a module that is designed to work with tineye products: Match Engine, Mobile Engine, Multicolor Engine and Wine Engine. 

## Installation
```shell
npm install tineye-services
```
## Basic Usage

```node
const { MobileEngine } = require('../../tineye-services')
const fs = require('fs')

//url is optional, if none is specified then defualt is https://matchengine.tineye.com/
matchengine = new MobileEngine('userName', 'password', 'companyName', 'url')

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
