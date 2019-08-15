import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)

  }

  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  currentAction(index) {
    if (this.props.showFaves) {
      this.props.deleteMovie(this.props.movies[index]);
    } else {
      this.props.saveMovie(this.props.movies[index]);
    }

  }

  render() {
    let baseURL = `https://image.tmdb.org/t/p/w300`;
    let posterURL = '';
    let descStyle = {
      "fontSize": "1vw",
    };
    let titleStyle = {
      "fontSize": "2vw",
    };

    if (this.props.movies[0].deway) {
      return (<div></div>);
    }
    return (
      <ul className="movies">

        {this.props.movies.map((movie, index, movieArray) => {
          if (!movie.poster_path) {
            posterURL = 'https://lh3.googleusercontent.com/97gnjRiv2zIRnDupzfxYFoI-6zlIK3jKgb6KOCDf_tjWkY9epbITdSFIbiKhuccOqQ=w300';
          } else {
            posterURL = baseURL + movie.poster_path;
          }
          return (
          <li className="movie_item" key={index} onClick={() => this.currentAction(index)}>
            <img src={posterURL} value={index} />
            <div className="movie_description">
              <h1 style={titleStyle}>{movie.title}</h1>
              <h2 style={descStyle}>{movie.overview}</h2>
              <section className="movie_details">
                <div className="movie_year">
                  <span className="title">Year</span>
                  <span>{movie.release_date.slice(0,4)}</span>
                </div>
                <div className="movie_rating">
                    <span className="title">Rating</span>
                    <span>{movie.vote_average}</span>
                </div>
              </section>
            </div>
          </li>
          );
        })}

      </ul>
    );
  }
}

export default Movies;