import React from 'react';
import MovieItem from './MovieItem';
//import PropTypes from 'prop-types';

class MoviesList extends React.PureComponent {
  // static propTypes = {
  //   movies: PropTypes.array.isRequired,
  // };

  render() {
    const { getFavoritesIsClicked, isAuth, favorites, movies, favorites_all } =
      this.props;
    const array = getFavoritesIsClicked ? favorites : movies;

    return (
      <div className="row">
        {getFavoritesIsClicked && array.length === 0 ? (
          <h6>В списке нет фильмов</h6>
        ) : (
          array.map((movie) => {
            return (
              <div key={movie.id} className="col-6 mb-4 ">
                <MovieItem
                  item={movie}
                  isAuth={isAuth}
                  favorited={
                    favorites_all.find((favorite) => favorite.id === movie.id)
                      ? true
                      : false
                  }
                />
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default MoviesList;
