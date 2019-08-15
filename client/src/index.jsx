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
      console.log('returned list: ');
      this.setState({movies: movieList.data});
      // this.render();
      console.log(this.state.movies);
      console.log('getMovies ran');
    })
    .catch((err) => {
      console.log(err);
    });
    console.log('selected genre: ' + movieGenre);
  }

  saveMovie(movieObj) {
    // same as above but do something diff
    console.log('save:');
    console.log(movieObj);
  }

  deleteMovie(movieObj) {
    // same as above but do something diff
    console.log('delete');
    console.log(movieObj);
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  componentDidMount() {
    // console.log('CDM ran');
    this.getMovies(28);
  }

  render () {
    console.log('render ran');
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