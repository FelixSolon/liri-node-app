
//commented out, because it annoys me. But if necessary for requirements, it can be uncommented.
//console.log('this is loaded');

//Look, can we pretend that this actually says "twitterKeys" etc. in here like the spec says?
//Because I'm not 100% sure I can do more than 1 module.exports in one JS file
//As far as I can tell I can't, I'd have to throw the various keys objects inside an export object
//(And I don't care enough to start calling down a tree of objects in the liri.js file)
//And even if I could, it doesn't say anything about that in the spec
//It also doesn't say anything about having different keys.js files (renamed appropriately) to require() later
//Just this one.
//And hiding keys is a good thing in my opinion. So I did this.

var keys = {
  consumer_key: 'cOu8eU7fhitegJomPbOMnGCpA',
  consumer_secret: 'a2BotrueLz59rIe3Zj8iZpwr3YpLmnt9PZrq00WX3mt9MK68va',
  access_token_key: '911771408212119553-6nk5rHWWsSVuXjV8tAwubHgFM2EsQDI',
  access_token_secret: 'EiPSg2937q154aGoXdhbRYL8FC43h5eWL3h4rNdsPBg05',
  spotifyId: "59f0b5797ead479ea7d220778ecd7f2f",
  spotifySecret: "f29cf762dc0842568de0e18185c48658"
}

module.exports = keys;