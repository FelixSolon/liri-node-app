/*At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable.*/

var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");
 


var spotify = require('spotify');
var spotifyInput = "";

var consumerKey = (keys.consumer_key);
var consumerSecret = keys.consumer_secret;
var accessTokenKey = keys.access_token_key;
var accessTokenSecret = keys.access_token_secret;
var spotifyId = keys.spotifyId;
var spotifySecret = keys.spotifySecret;

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

var inputCommand = process.argv;

function uglySwitchStatement(inputCommand){
    switch (inputCommand[2]){
        case "my-tweets":
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
                id: spotifyId,
                secret: spotifySecret
            });
            var query = "";
            if(inputCommand[3] === undefined){
                query = "The Sign Ace of Base";
            }
            for (var i = 3; i < inputCommand.length; i++) {
                query = query + inputCommand[i] + " "
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

            break;
        case "movie-this":
            //I originally tried to be clever and just do var query;
            //Unfortunately, if you try to take an undefind variable and concatenate it with a string, it becomes a string that starts with "undefined".
            //So I'll be a good person and initalize this as a string.
            var query = "";
            for (i=3; i < inputCommand.length; i++){
                query = query + inputCommand[i] + " ";
            }
            if (query === ""){
                query = "Mr. Nobody";
            }
            //I'm not obfuscating the key because it's in the instructions and I don't care that much. Assume I threw it in the /keys.js file like all the rest of them.
            request("http://www.omdbapi.com/?apikey=40e9cece&t=" + query, function(err, response, body){
                //Because I want to work with a pretty result, rather than something that looks like I did "view source" on google.com.
                var movie = JSON.parse(body);
                //Fine. I'll use a new line in this one. In fact, I shall use ALL the new lines! Mwahaha!
                //Mostly just to prove that I can do it.
                //Realistically, this would be annoying to maintain and, unless there's some performance increase I'm not expecting from running one console.log instead of like 8 I'd just do 8 console.logs normally.
                console.log("\nMovie Title: " + movie.Title + "\nMovie Year: " + movie.Year + "\nIMDB Rating: " + movie.imdbRating + "\n" + movie.Ratings[1].Source + " rating: " + movie.Ratings[1].Value + "\nCountry: " + movie.Country + "\nLanguage: " + movie.Language + "\nPlot: " + movie.Plot + "\nActors: " + movie.Actors);

            });

            break;
        case "do-what-it-says":
            fs.readFile("../random.txt", "utf8", function(error, data) {
              if (error) {
                return console.log(error);
              }
              console.log(data);
              var dataArr = data.split(",");
              //Don't judge me for the next line.
              dataArr.unshift("","")
              console.log(dataArr);
              //figure out htf to get the data in the text file to act like process.argv[2] etc
              uglySwitchStatement(dataArr)
              });

        /*node liri.js do-what-it-says
    Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    Feel free to change the text in that document to test out the feature for other commands.*/
    };

};

uglySwitchStatement(inputCommand)



/*In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
Make sure you append each command you run to the log.txt file. 
Do not overwrite your file each time you run a command.*/