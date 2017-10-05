/*At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable.*/

var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
 


var spotify = require('spotify');
var spotifyInput = "";

var consumerKey = (keys.consumer_key);
var consumerSecret = keys.consumer_secret;
var accessTokenKey = keys.access_token_key;
var accessTokenSecret = keys.access_token_secret;

var client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessTokenKey,
  access_token_secret: accessTokenSecret
});
/*
Make it so liri.js can take in one of the following commands:
my-tweets
spotify-this-song
movie-this
do-what-it-says*/

var inputCommand = process.argv[2];

switch (inputCommand){
    case "my-tweets":
/*node liri.js my-tweets
This will show your last 20 tweets and when they were created at in your terminal/bash window.
    
twitter api
Need .text and .created_at
Parameters: count=20*/
        var params = {user_id: "TestyStudent", count: 20}
        client.get("https://api.twitter.com/1.1/statuses/user_timeline.json", params, function(error, tweets, response){
            /*for (var i = 0; i < 20; i++) {*/
                for (var i = 0; i < tweets.length; i++) {
                    console.log("")//I could do /nl if I wanted to. But I don't.
                    console.log(tweets[i].text);
                    console.log(tweets[i].created_at);

                };
            /*}*/
        })

        break;
    case "spotify-this-song":

        var spotify = new Spotify({
            //swiper no swiping!
            id: "59f0b5797ead479ea7d220778ecd7f2f",
            secret: "f29cf762dc0842568de0e18185c48658"
        });
        var query = "";
        if(process.argv[3] === undefined){
            query = "The Sign Ace of Base";
        }
        for (var i = 3; i < process.argv.length; i++) {
            query = query + process.argv[i] + " "
        }
        spotify.search({ type: 'track', query: query }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
          }

        console.log(""); //because no one has time for /nl
        console.log("Artist: " + data.tracks.items[0].artists[0].name); 
        console.log("Song Name: " + data.tracks.items[0].name)
        console.log("Preview URL: " + data.tracks.items[0].external_urls.spotify)
        console.log("Album: " + data.tracks.items[0].album.name)
        });


/*Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from


If no song is provided then your program will default to "The Sign" by Ace of Base.
You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
Step One: Visit https://developer.spotify.com/my-applications/#!/
Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package. See the 


*/
        break;
    case "movie-this":
/*node liri.js movie-this '<movie name here>'
This will output the following information to your terminal/bash window:

   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
It's on Netflix!
You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use 40e9cece.*/
        break;
    case "do-what-it-says":
    /*node liri.js do-what-it-says
Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
Feel free to change the text in that document to test out the feature for other commands.*/
};








/*In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
Make sure you append each command you run to the log.txt file. 
Do not overwrite your file each time you run a command.*/