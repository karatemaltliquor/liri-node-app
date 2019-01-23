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

inquirer.prompt([

    {
        type: "list",
        name: "commando",
        message: "What type of search would you like me to perform?",
        choices: ["movie-this", "concert-this", "spotify-this-song", "do-what-it-says"]
      },
          
    {
        type: "input",
        name: "searcher",
        message: "Tell me what to search for:"
      },
    

    ]).then(function(user) {
        
        // console.log("OK" + user.commando + user.searcher.split(' ').join('+'));

        var spotify = new Spotify({
            id: process.env.SPOTIFY_ID,
            secret: process.env.SPOTIFY_SECRET,
          });

        if (user.commando === "spotify-this-song") {
            spotify.search({ type: 'track', query: user.searcher || "the sign ace", limit: 1 }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
               
            //   console log of Spotify info
            console.log(`===================================================================================`);             
              console.log("Artists : " + data.tracks.items[0].album.artists[0].name); 
               console.log("Song Title : " + data.tracks.items[0].name);
              console.log("Link to Song on Spotify : " + data.tracks.items[0].album.artists[0].external_urls.spotify);
              console.log("Album Title : " + data.tracks.items[0].album.name); 
              console.log(`===================================================================================`);
              });
        }

    else if (user.commando === "concert-this") {
            var artName = (user.searcher.split(' ').join('%20'));
            var queryUrl = "https://rest.bandsintown.com/artists/" + artName + "/events?app_id=codingbootcamp";
            
            
                axios.get(queryUrl).then(
                    function (response) {
                        const date = moment(response.data[0].datetime).format('MM/DD/YYYY');
                        console.log(`===================================================================================`);
                        console.log(`Venue name: ${response.data[0].venue.name}`);
                        console.log(`Venue location: ${response.data[0].venue.city}`);
                        console.log(`Date: ${date}`);
                        console.log(`===================================================================================`);
                    }
                    
                );
              
    }

        else if (user.commando === "movie-this") {
            var movieName = (user.searcher.split(' ').join('+') || "mr+nobody");
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=8ed0831";
            // console.log(queryUrl);
            axios.get(queryUrl).then(
                function(response) {
                    console.log(`===================================================================================`);
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
                console.log(`===================================================================================`);
                }
              );  
              };
        }
    );