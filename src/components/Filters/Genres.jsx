import React from 'react';
//import PropTypes from 'prop-types';

const Genres = ({ resetGenres, genres, onChange, with_genres }) => (
  <React.Fragment>
    <button
      type="button"
      className="btn btn-outline-info mb-2"
      onClick={resetGenres}
    >
      Сбросить жанры
    </button>

    <div className="form-group">
      {genres.map((genre) => (
        <div key={genre.id} className="form-check">
          <input
            className="form-check-input "
            type="checkbox"
            value={genre.id}
            id={`genre${genre.id}`}
            onChange={onChange}
            checked={with_genres.includes(String(genre.id))}
          />
          <label className="form-check-label" htmlFor={`genre${genre.id}`}>
            {genre.name}
          </label>
        </div>
      ))}
    </div>
  </React.Fragment>
);

export default Genres;

Genres.defaultProps = {
  genres: [],
};

// Genres.propTypes = {
//   genres: PropTypes.array.isRequired,
//   with_genres: PropTypes.array.isRequired,
//   resetGenres: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
// };
