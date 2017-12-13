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
	console.log("Twitter Works!");
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
	console.log("Spotify Works!")

	spotify.search({ type: 'track', query: 'All the Small Things'}, function(err, data) {
	  	if (err) {
	    	return console.log('Error occurred: ' + err);
	  	}
	console.log(data.tracks.items[0].artists); 
	});



// Artist(s) ----- artists	

// The song's name ----- userInput

// A preview link of the song from Spotify ----- preview_url

// The album that song is from ----- album_type

// The album that the song is from ----- name

};

function movie(){
	console.log("Movie Works!")
	var queryURL = "http://www.omdbapi.com/?apikey=40e9cece&" + userInput;
    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // }).done(function(response) {
    // 	console.log("Movie Title: " + response.Title);
    // 	console.log("Year Released: " + response.Year);
    // 	console.log("IMDB Rating: " + response.imdbRating);
    // 	console.log("Rotten Tomatoes Rating: " + response.Ratings[1].Value);
    // 	console.log("Country Produced: " + response.Country);
    // 	console.log("Movie Language: " + response.Language);
    // 	console.log("Movie Plot: " + response.Plot);
    // 	console.log("Main Actors: " + response.Actors);
    // });       
}

function textFile(){
	console.log("File Works!")
	// var fs = require("fs");
	// fs.readFile("random.txt", "utf8", function(err, data) {
	//   	if (err) {
	//    	return console.log(err);
	//   	}

	//   	var output = data.split(",");

	//   	for (var i = 0; i < output.length; i++) {
	//    	console.log(output[i]);
	//   	}
	// });
}

function error(){
	console.log("Invalid Input!")
};



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
		// error();
		break;
}