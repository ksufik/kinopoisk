import React from 'react';
import MovieItem from './MovieItem';
import PropTypes from 'prop-types';
import MoviesHOC from './MoviesHOC';
import AppContextHOC from '../HOC/AppContextHOC';

const MoviesList = ({ movies, favorites, getFavorites, favorites__indx }) => {
  const array = getFavorites ? favorites : movies;
  return (
    <div className="row">
      {console.log('MoviesList render')}
      {getFavorites && array.length === 0 ? (
        <h6>В списке нет фильмов</h6>
      ) : (
        array.map((movie) => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem
                item={movie}
                favorited={favorites__indx.forEach((element) => {
                  element.id === movie.id ? true : false;
                })}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

MoviesList.defaultProps = {
  movies: [],
  favorites: [],
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default AppContextHOC(MoviesHOC(MoviesList));
