import React from 'react';
const axios = require('axios');

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectedGenre: null
    };
    this.handleChange = this.handleChange.bind(this);
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/genres')
    .then((genreList) => {
      this.setState({genres: genreList.data.genres, selectedGenre: genreList.data.genres[0].id})
    })
    .catch((err) => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.getGenres();
  }

  handleChange = (event) => {
    let genreSelect = event.target.value;
    this.setState({selectedGenre: genreSelect});
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.handleChange}>
          {this.state.genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <br/><br/>

        <button onClick={() => {this.props.getMovies(this.state.selectedGenre)}}>Search</button>

      </div>
    );
  }
}

export default Search;