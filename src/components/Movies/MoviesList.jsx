import React from 'react';
import MovieItem from './MovieItem';
//import PropTypes from 'prop-types';

class MoviesList extends React.PureComponent {
  // static propTypes = {
  //   movies: PropTypes.array.isRequired,
  // };

  render() {
    const {
      getFavoritesIsClicked,
      isAuth,
      movies,
      favorites,
      favorites_all,
      error,
    } = this.props;

    const array = getFavoritesIsClicked ? favorites : movies;
		const text = getFavoritesIsClicked ? 'В списке нет фильмов' : 'По вашему запросу ничего не найдено';
    return (
      <div className="row">
        {error
          ? { error }
          : array.length === 0
          ? text
          : array.map((movie) => {
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
            })}
      </div>
    );
  }
}

export default MoviesList;
