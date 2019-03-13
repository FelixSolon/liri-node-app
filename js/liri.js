// Initialize necessary variables

require('dotenv').config()
const { spotifyKeys, twitterKeys } = require('./keys.js');
var request = require('request');
var fs = require("fs");

//Because I don't feel like typing process.argv a zillion times.
var inputCommand = process.argv;

//added the "Log All The Things!" bonus.
function logToFile (logData){
    console.log(logData);
    fs.appendFile("log.txt", logData + "\n", function(err) {
        // If an error was experienced we say it.
        if (err) {
            console.log(err);
        }
    });
};
//So throwing it all in a function was a bit of a late addition when
//I figured out I needed to run the switch statement again in the
//do-what-it-says command. But it seems to work.
function uglySwitchStatement(inputCommand){

    //Is there any performance boost/convention/best practice about when to stop using if(){}else if(){} statements
    //And when to start using switch statements?
    //Because I feel like 4 commands is kinda right at that line.
    //But I like switch statements, so I'm using that here, now.
    switch (inputCommand[2]){

        case "my-tweets":
        
            const Twitter = require('twitter');
            const client = new Twitter(twitterKeys);
            //Setting up the API call through the Twitter package
            const params = {user_id: "TestyStudent", count: 20}
            client.get("https://api.twitter.com/1.1/statuses/user_timeline.json", params, function(error, tweets, response){
                //Bog-standard for loop to print everything.
                for (let i = 0; i < tweets.length; i++) {
                    logToFile("")//I could do /nl if I wanted to. But I don't.
                    logToFile(tweets[i].text);
                    logToFile(tweets[i].created_at);
                };
            })
            //Don't forget your breaks, kids! Or *everything* can run.
            break;

        case "spotify-this-song":
            //Defining the function inside the switch statement, just to be different.
            //Yeah, there's not really a reason for it to be here instead of up top.
            //ToDo: Put the client = new Twitter() thing into the my-tweets switch
            const Spotify = require('node-spotify-api');
            const spotify = new Spotify(spotifyKeys);
            //Defining query as an empty string
            //Because "undefinedNever Gonna Give You Up" doesn't return any results.
            let query = "";
            //checks to see if anyone bothered to put in a search term
            if(inputCommand[3] === undefined){
                query = "The Sign Ace of Base";
            }
            //assembles a query
            for (let i = 3; i < inputCommand.length; i++) {
                query = query + inputCommand[i] + " "
            }
            //calls the spotify search
            spotify.search({ type: 'track', query: query }, function(err, data) {
                if (err) {
                return console.log('Error occurred: ' + err);
              }
            //Refactoring the result
            const songResult = data.tracks.items[0];
            logToFile(""); //because no one has time for /nl
            logToFile("Artist: " + songResult.artists[0].name); 
            logToFile("Song Name: " + songResult.name)
            logToFile("Preview URL: " + songResult.external_urls.spotify)
            logToFile("Album: " + songResult.album.name)
            });

            break;

        case "movie-this":
            //I originally tried to be clever and just do var query;
            //Unfortunately, if you try to take an undefind variable and concatenate it with a string,
            //it becomes a string that starts with "undefined". Because Javascript.
            //So I'll be a good person and initalize this as a string.
            var query = "";
            for (i=3; i < inputCommand.length; i++){
                query = query + inputCommand[i] + " ";
            }
            //If no one put in anything, query is still empty, so use a default result.
            //I'm going to pretend that I'm doing this a different way in every switch statement on purpose
            //To demonstrate I can solve problems in a wide variety of ways
            //Not because I've done this across a couple days
            //And am actually commenting my code on a different day entirely.
            //That would be silly.
            if (query === ""){
                query = "Mr. Nobody";
            }
            //I'm not obfuscating the key because it's in the instructions and I don't care that much. Assume I threw it in the /keys.js file like all the rest of them then did var omdbkey=keys.omdbkey or something.
            //Which would probably be less work than typing these comments. Eeh.
            request("http://www.omdbapi.com/?apikey=40e9cece&t=" + query, function(err, response, body){
                //Because I want to work with a pretty result, rather than something that looks like I did "view source" on google.com.
                var movie = JSON.parse(body);
                //Fine. I'll use a new line in this one. In fact, I shall use ALL the new lines! Mwahaha!
                //Mostly just to prove that I can do it.
                //Realistically, this would be annoying to maintain and, unless there's some performance increase I'm not expecting from running one console.log instead of 9 I'd just do 9 console.logs normally.
                logToFile("\nMovie Title: " + movie.Title + "\nMovie Year: " + movie.Year + "\nIMDB Rating: " + movie.imdbRating + "\n" + movie.Ratings[1].Source + " rating: " + movie.Ratings[1].Value + "\nCountry: " + movie.Country + "\nLanguage: " + movie.Language + "\nPlot: " + movie.Plot + "\nActors: " + movie.Actors);
            });
            break;

        case "do-what-it-says":
            //Read random.txt
            fs.readFile("../random.txt", "utf8", function(error, data) {
              if (error) {
                return console.log(error);
              }
              //turn random.txt into an array so I can work with it without massive and annoying hacks.
              var dataArr = data.split(",");
              //Don't judge me for the next line.
              //It adds two empty fields to the front of the array it pulled from random.txt
              //So that code meant to run on process.argv works without having to redo *everything*.
              dataArr.unshift("","")
              uglySwitchStatement(dataArr)
              });
            break;
        default:
            console.log("I'm sorry, that's not a valid command");
    };

};

uglySwitchStatement(inputCommand)



/*In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
Make sure you append each command you run to the log.txt file. 
Do not overwrite your file each time you run a command.*/