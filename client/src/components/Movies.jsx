import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)

  }

  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)


  render() {
    let baseURL = `https://image.tmdb.org/t/p/w300`;
    let posterURL = '';
    let descStyle = {
      "fontSize": "1vw",
    };
    let currentAction = null;

    console.log(`here's movies.jsx`);
    console.log(this.props);

    if (this.props.showFaves) {
      currentAction = this.props.deleteMovie;
    } else {
      currentAction = this.props.saveMovie;
    }


    if (this.props.movies[0].deway) {
      return (<div></div>);
    }
    return (
      <ul className="movies">

        {this.props.movies.map((movie) => {
          if (!movie.poster_path) {
            posterURL = 'https://lh3.googleusercontent.com/97gnjRiv2zIRnDupzfxYFoI-6zlIK3jKgb6KOCDf_tjWkY9epbITdSFIbiKhuccOqQ=w300';
          } else {
            posterURL = baseURL + movie.poster_path;
          }
          return (
          <li className="movie_item" key={movie.id}>
            <img src={posterURL} />
            <div className="movie_description">
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