const { MatchEngine } = require('../../tineye-services')
const fs = require('fs')

matchengine = new MatchEngine('', '', '', 'staging02.tc:5000/rest/')

// Search your index for an image
url = 'http://tineye.com/images/meloncat.jpg'

// Add an image to your index
//Requires both url and file path
matchengine.add({ url: url }, function (err, data) {
    if (!err)
        console.log(data)
    else
        console.log(err.message)
})

var imagePath = __dirname + '/image.jpg';

//callback formatting
matchengine.add({ image: imagePath, filepath: 'testImage222' }, { timeout: 1000, callback: 'handle_results' }, function (err, data) {
    if (!err)
        console.log(data)
    else
        console.log(err)
})

matchengine.add({ image: imagePath, filepath: 'testImage222' }, { format: 'xml' }, function (err, data) {
    if (!err)
        console.log(data)
    else
        console.log(err)
})
/*

/*
// Add an image to your 
//Needs only image but can take file path as well
matchengine.add({ image: imagePath, filepath: 'testImage222' }, function (err, data) {
    if (!err)
        console.log(data)
    else
        console.log(err)
})



//format:json 

//just image
matchengine.add({ image: imagePath }, assert('foo' !== 'bar', 'foo is not bar');
function (err, data) {
    if (!err)
        console.log(data)
    else
        console.log(err)
})


//format:xml or json 
matchengine.add({ image: imagePath, filepath: 'testImage222' }, { format: 'json' }, function (err, data) {
    if (!err)
        console.log(data)
    else
        console.log(err)
})

matchengine.add({ image: imagePath, filepath: 'testImage222' }, function (err, data) {
    if (!err)
        console.log(data)
    else
        console.log(err)
})

//just image
matchengine.add({ image: imagePath }, function (err, data) {
    if (!err)
        console.log(data)
    else
        console.log(err)
})

//format:json 
matchengine.add({ image: imagePath, filepath: 'testImage222' }, { format: 'xml' }, function (err, data) {
    if (!err)
        console.log(data)
    else
        console.log(err)
})

//format:xml or json 
matchengine.add({ image: imagePath, filepath: 'testImage222' }, { format: 'json' }, function (err, data) {
    if (!err)
        console.log(data)
    else
        console.log(err)
})


//timeout formatting
matchengine.add({ image: imagePath, filepath: 'testImage222' }, { timeout: 100 }, function (err, data) {
    if (!err)
        console.log(data)
    else
        console.log(err)
})


/*
matchengine.delete({filepath: "image.jpg"}, function(err, data) {
    console.log(data)
})

matchengine.delete({filepath: "meloncat.jpg"}, function(err, data) {
    console.log(data)
})

/*
matchengine.search({image_url: url}, function(err, data) {
    console.log(err, data)
})

// Add an image to your index
matchengine.addUrl({url: url, filepath: "meloncat.jpg"}, function(err, data) {
    console.log(err, data)
})

// Delete an image from your index
matchengine.delete({filepath: "meloncat.jpg"}, function(err, data) {
    console.log(err,data)
})

// Ping the service
matchengine.ping(function(err, data) {
    console.log(err,data)
})

// Get the number of items in the collection
matchengine.count(function(err, data) {
    console.log(err,data)
})

// List the images present in your API
matchengine.list({offset: 0, limit: 5}, function(err, data) {
    console.log(err,data)
})

*/