import React from 'react';
import MovieItem from './MovieItem';
//import PropTypes from 'prop-types';
//import { withAuth } from '../HOC/withAuth';
import { withMovies } from '../HOC/withMovies';

class MoviesList extends React.PureComponent {
  // static propTypes = {
  //   movies: PropTypes.array.isRequired,
  // };

  handleIsFavorite(movieId) {
    let test = null;
    this.props.favorites.forEach((favorite) => {
      test = favorite.id === movieId;
    });
    console.log('handleIsFavorite', test);
  }

  render() {
    const { moviesObj } = this.props;
    const { movies } = moviesObj;
    // const array = getFavoritesIsClicked ? favorites : movies;
    const array = movies;
    // console.log('MoviesList render');
    return (
      <div className="row">
        {
          // getFavoritesIsClicked && array.length === 0 ? (
          //   <h6>В списке нет фильмов</h6>
          // ) : (
          array.map((movie) => {
            return (
              <div key={movie.id} className="col-6 mb-4">
                <MovieItem
                  item={movie}
                  // favorited={
                  //   favorites_all.find((favorite) => favorite.id === movie.id)
                  //     ? true
                  //     : false
                  // }
                  //    getFavorites={getFavorites}
                />
              </div>
            );
          })
          // )
        }
      </div>
    );
  }
}

export default withMovies(MoviesList);
