require("dotenv").config();

var keys = require("./keys.js");
var moment = require('moment');
moment().format();
var spotify = require('node-spotify-api');
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
        
        console.log("OK" + user.commando + user.searcher.split(' ').join('+'));

    });