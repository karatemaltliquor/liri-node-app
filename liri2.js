require("dotenv").config();

var keys = require("./keys.js");
var moment = require('moment');
moment().format();
var Spotify = require('node-spotify-api');
var axios = require("axios");
// var omdbApi = require('omdb-client');
var bandsintown = require('bandsintown');
var inquirer = require('inquirer');
var fs = require("fs");

var userCommando = (process.argv[2])

var userSearcher = (process.argv[2])

// inquirer.prompt([

//     {
//         type: "list",
//         name: "commando",
//         message: "What type of search would you like me to perform?",
//         choices: ["movie-this", "concert-this", "spotify-this-song", "do-what-it-says"]
//       },
          
//     {
//         type: "input",
//         name: "searcher",
//         message: "Tell me what to search for:"
//       },
    

//     ]).then(function(user) {
        
        // console.log("OK" + user.commando + user.searcher.split(' ').join('+'));

        
        if (userCommando === "do-what-it-says") {

            fs.readFile("random.txt", "utf8", function(error, data) {

                // If the code experiences any errors it will log the error to the console.
                if (error) {
                  return console.log(error);
                }
              
                // We will then print the contents of data
                // console.log(data);
              
                // Then split it by commas (to make it more readable)
                var output = data.split(",");
              
                // We will then re-display the content as an array for later use.
                // console.log(dataArr);
                for (var j = 0; j < output.length; j++) {

                    // Print each element (item) of the array/
                    // console.log(output[j]);
                    userCommando = output[0]
                  userSearcher = output[1]
                  }

                  var spotify = new Spotify({
                    id: process.env.SPOTIFY_ID,
                    secret: process.env.SPOTIFY_SECRET,
                  });
        
                if (userCommando === "spotify-this-song") {
                    spotify.search({ type: 'track', query: userSearcher || "the sign ace", limit: 1 }, function(err, data) {
                        if (err) {
                          return console.log('Error occurred: ' + err);
                        }
                       
                    //   console log of Spotify info             
                      console.log("Artists : " + data.tracks.items[0].album.artists[0].name); 
                       console.log("Song Title : " + data.tracks.items[0].name);
                      console.log("Link to Song on Spotify : " + data.tracks.items[0].album.artists[0].external_urls.spotify);
                      console.log("Album Title : " + data.tracks.items[0].album.name); 
                      });
                }
         

                
              
              });

            var nodeArgs = process.argv;

            // Create an empty variable for holding the movie name
            var movieName = "";
            
            // Loop through all the words in the node argument
            // And do a little for-loop magic to handle the inclusion of "+"s
            for (var q = 3; q < nodeArgs.length; q++) {
            
              if (q > 3 && q < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[q];
              }
              else {
                movieName += nodeArgs[q];
            
              }
              var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=8ed0831";
            }

         if (userCommando === "movie-this") {

            var nodeArgs = process.argv;

            // Create an empty variable for holding the movie name
            var movieName = "";
            
            // Loop through all the words in the node argument
            // And do a little for-loop magic to handle the inclusion of "+"s
            for (var q = 3; q < nodeArgs.length; q++) {
            
              if (q > 3 && q < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[q];
              }
              else {
                movieName += nodeArgs[q];
            
              }
              var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=8ed0831";
            }

            // var movieName = (userSearcher || "mr+nobody");
            
            // console.log(queryUrl);
            axios.get(queryUrl).then(
                function(response) {
                console.log("Title : " + response.data.Title);
                console.log("Release Year : " + response.data.Year);

                // fixing error for films or shows with no rotten tomatoes rating
                for (var i = 0; i < response.data.Ratings.length; i++) {
                    if (i == 0){console.log("IDMB Rating : " + response.data.Ratings[0].Value); } 
                    else if (i === 1){console.log("Rotten Tomatoes Rating : " + response.data.Ratings[1].Value);} }; 
                //  -------------------------------------------------------------------//
                console.log("Country : " + response.data.Country);
                console.log("Language : " + response.data.Language);
                console.log("Plot : " + response.data.Plot);
                console.log("Actors : " + response.data.Actors);
                }
              );
             

               
              };
            }
    ;