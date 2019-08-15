var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
const axios = require('axios');
const config = require('../config.js');
const { sqlGet, sqlSave } = require('./models/movieModel.js')

// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup


//Helpers
var apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));


//OPTION 1: Use regular routes

app.get('/genres', function(req, res) {
  // console.log(config.API_KEY);
  // make an axios request to get the official list of genres from themoviedb
  axios({
    method: 'GET',
    url: 'https://api.themoviedb.org/3/genre/movie/list' + config.API_URL
    })
  .then((genreList) => {
    res.send(JSON.stringify(genreList.data));
  })
  .catch((err) => {
    console.log(err);
  });
  // use this endpoint. you will need your API key from signup: https://api.themoviedb.org/3/genre/movie/list

  // send back
});

app.get('/search/:genre', function(req, res) {
  // use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
  axios({
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie' + config.API_URL,
    with_genres: req.params.genre + '',
    sort_by: 'popularity.asc'
    })
  .then((movieList) => {
    // console.log('appget: ');
    // console.log('typeof: ' + typeof genreList);
    // console.log(genreList.data);
    res.send(JSON.stringify(movieList.data.results));
  })
  .catch((err) => {
    console.log(err);
  });
  // and sort them by votes (worst first) using the search parameters in themoviedb API
});

app.get('/test', function(req, res) {
  sqlGet((err, results) => {
    res.status(200).send(results);
  })
});

app.post('/save', function(req, res) {
  console.log(req.body);
  //save movie as favorite

});

app.post('/delete', function(req, res) {

  //remove movie from favorites

});


//OPTION 2: Use Express Router

//IF you decide to go with this option, delete OPTION 1 to continue

//Routes

// const movieRoutes = require('./routes/movieRoutes.js');

// //Use routes
// app.use('/movies', movieRoutes);


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
