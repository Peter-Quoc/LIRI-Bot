var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var twitterFeed = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

userCommand = process.argv[2];
userInput = process.argv[3];

function twitter(){
	twitterFeed.get("statuses/user_timeline", function (error, tweets, response) {
      tweets.forEach(function(tweets){
         console.log("--------" + tweets.user.screen_name + "--------");
         console.log(tweets.text);
         console.log(tweets.created_at);
         console.log("--------------------------")
     	});
   });
};

function searchSpotify(){
	inputArray = process.argv;
	songName = "";

	for (var i = 3; i < inputArray.length; i++) {
		if (i > 3 && i < inputArray.length) {
			songName = songName + "+" + inputArray[i];
		}
		else {
			songName += inputArray[i];
		}
	}

	spotify.search({ type: 'track', query: songName, limit: 5}, function(err, data) {
	  	if (err) {
	    	return console.log('Error occurred: ' + err);
	  	}
			data.tracks.items.forEach(function(items){
				console.log("--------------------------")
				console.log("Song name: " + items.name);
				console.log("Artist(s): " + items.artists[0].name);
				console.log("Song Album: " + items.album.name);
				console.log("Preview Link: " + items.preview_url);
				console.log("--------------------------")
			});
	});
};

function movie(){
	inputArray = process.argv;
	movieName = "";

	for (var i = 3; i < inputArray.length; i++) {
	  if (i > 3 && i < inputArray.length) {
	    movieName = movieName + "+" + inputArray[i];
	  }
	  else {
	    movieName += inputArray[i];
	  }
	}

	var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
	request(queryURL, function(error, response, body) {

	  if (!error && response.statusCode === 200) {
			console.log("--------------------------")
	    console.log("Movie Titie: " + JSON.parse(body).Title);
			console.log("Year Released: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country Produced: " + JSON.parse(body).Country);
			console.log("Movie Language: " + JSON.parse(body).Language);
			console.log("Movie Plot: " + JSON.parse(body).Plot);
			console.log("Main Actors: " + JSON.parse(body).Actors);
			console.log("--------------------------")
	  }
	});

}

function textFile(){
	console.log("File Works!")
	var fs = require("fs");
	fs.readFile("random.txt", "utf8", function(err, data) {
	  	if (err) {
	   	return console.log(err);
	  	}

	  	var textFileArray = data.split(",");

	  	userCommand = textFileArray[0];
			userInput = textFileArray[1];

			runProgram();
	});
}

function error(){
	console.log("Invalid Input!")
};

function runProgram(){
	switch (userCommand) {

		case "my-tweets":
			twitter();
			break;
		case "spotify-this-song":
			searchSpotify();
			break;
		case "movie-this":
			movie();
			break;
		case "do-what-it-says":
			textFile();
			break;
		default:
			error();
			break;
	}
};

runProgram();
