var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
const axios = require('axios');
const config = require('../config.js');
const { sqlGet, sqlSave, sqlDelete } = require('./models/movieModel.js')

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

app.get('/faves', function(req, res) {
  sqlGet((err, results) => {
    // console.log(results);
    let temp = [];
    for (let i = 0; i < results.length; i++) {
      let obj = {
        id: results[i].movieId,
        poster_path: results[i].posterURL,
        title: results[i].movieTitle,
        overview: results[i].descrip,
        release_date: results[i].relYear,
        vote_average: results[i].rating
      };
      temp.push(obj);
    }
    res.status(200).send(temp);
  });
});

app.get('/search/:genre', function(req, res) {
  // use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
  let genre = req.params.genre + '';
  console.log('genre in get: ', genre);
  axios({
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie' + config.API_URL,
    params: {
      with_genres: genre,
      sort_by: 'vote_average.asc'
    }
    })
  .then((movieList) => {
    res.send(JSON.stringify(movieList.data.results));
  })
  .catch((err) => {
    console.log(err);
  });
  // and sort them by votes (worst first) using the search parameters in themoviedb API
});

app.post('/save', function(req, res) {
  //save movie as favorite
  sqlSave(req.body, (err, results) => {
    res.status(200).send('done');
  });
});

app.post('/delete', function(req, res) {
  //remove movie from favorites
  sqlDelete(req.body, (err, results) => {
    res.status(201).send('deleted');
  });
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
