import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false,
    };
    
    // you might have to do something important here!
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  getMovies(movieGenre) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios.get(`/search/${movieGenre}`)
    .then((movieList) => {
      this.setState({movies: movieList.data});
    })
    .catch((err) => {
      console.log(err);
    });
    console.log('selected genre: ' + movieGenre);
  }

  saveMovie(movieObj) {
    // same as above but do something diff
    let sqlMovie = {
      movieId: movieObj.id,
      movieTitle: movieObj.title,
      rating: movieObj.vote_average,
      posterURL: movieObj.poster_path,
      descrip: movieObj.overview,
      relYear: movieObj.release_date
    };
    axios.post('/save',
      sqlMovie)
    .then(() => {
      console.log('Movie Saved');
      this.refreshFavorites();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  deleteMovie(movieObj) {
    // same as above but do something diff
    let toDelete = { movieId: movieObj.id };

    axios.post('/delete',
      toDelete)
    .then(() => {
      console.log('Movie deleted');
      this.refreshFavorites();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  refreshFavorites() {
    axios.get('/faves')
    .then((results) => {
      this.setState({favorites: results.data});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  componentDidMount() {
    this.getMovies(28);
    this.refreshFavorites();
  }

  render () {
    let scroll = {
      "overflowY": "scroll",
    };
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main" style={scroll}>
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
          <Movies saveMovie={this.saveMovie} deleteMovie={this.deleteMovie} movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));