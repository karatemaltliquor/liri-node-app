require("dotenv").config();

var keys = require("./keys.js");
var moment = require('moment');
moment().format();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var omdbApi = require('omdb-client');
var bandsintown = require('bandsintown');
var inquirer = require('inquirer');

inquirer.prompt([

    {
        type: "list",
        name: "commando",
        message: "What type of search would you like me to perform?",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
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
            spotify.search({ type: 'track', query: user.searcher, limit: 1 }, function(err, data) {
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