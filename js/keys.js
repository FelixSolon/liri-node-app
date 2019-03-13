const spotifyKeys = {
  id: process.env.SPOTIFYID,
  secret: process.env.SPOTIFYSECRET,
}

const twitterKeys = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET, 
}

exports.twitterKeys = twitterKeys;
exports.spotifyKeys = spotifyKeys;