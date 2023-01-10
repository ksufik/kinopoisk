import React from 'react';
import MovieItem from './MovieItem';
//import PropTypes from 'prop-types';

class MoviesList extends React.PureComponent {
  // static propTypes = {
  //   movies: PropTypes.array.isRequired,
  // };

  text = (getFavoritesIsClicked) => {
    if (getFavoritesIsClicked) {
      return <span>В списке нет фильмов</span>;
    } else {
      return (
        <span>
          По вашему запросу ничего не найдено
          <br />
          либо возникла ошибка:{' '}
          <ins>база данных не работает в вашей стране.</ins>
          <br />
          Воспользуйтесь VPN.
        </span>
      );
    }
  };

  //! не получается искать, пока в любимых находишься
  componentDidUpdate() {}

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

    return (
      <div className="row">
        {error
          ? { error }
          : array.length === 0
          ? this.text(getFavoritesIsClicked)
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
