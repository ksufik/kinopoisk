import React from 'react';
import PropTypes from 'prop-types';
import { API_KEY_3, API_URL, LANGUAGE_RU } from '../../constants';
import queryString from 'query-string';
import Genres from './Genres';

// из-за PureComponent (=shouldComponentUpdate) лишние рендеры компонента при взаимодействии с другими частями фильтра не происходят
export default class GenresContainer extends React.PureComponent {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    with_genres: PropTypes.array.isRequired,
  };

  constructor() {
    super();
    this.state = {
      genres: [],
    };
  }

  getGenres = () => {
    const queryParams = {
      api_key: API_KEY_3,
      language: LANGUAGE_RU,
    };

    //! везде проследить отработку ошибки статус код 404
    const link = `${API_URL}/genre/movie/list?${queryString.stringify(
      queryParams
    )}`;

    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          genres: data.genres,
        });
      });
  };

  componentDidMount() {
    this.getGenres();
  }

  onChange = (event) => {
    this.props.onChangeFilters({
      target: {
        name: 'with_genres',
        value: event.target.checked
          ? [...this.props.with_genres, event.target.value]
          : this.props.with_genres.filter(
              (genre) => genre !== event.target.value
            ),
      },
    });
    console.log('event:', event);
  };

  resetGenres = () => {
    this.props.onChangeFilters({
      target: {
        name: 'with_genres',
        value: [],
      },
    });
  };

  render() {
    const { genres } = this.state;
    const { with_genres } = this.props;
    console.log('GenresContainer render');

    return (
      <Genres
        resetGenres={this.resetGenres}
        genres={genres}
        onChange={this.onChange}
        with_genres={with_genres}
      />
      // <React.Fragment>
      //   <button
      //     type="button"
      //     className="btn btn-outline-info mb-2"
      //     onClick={this.resetGenres}
      //   >
      //     Сбросить жанры
      //   </button>

      //   <div className="form-group">
      //     {genres.map((genre) => (
      //       <div key={genre.id} className="form-check">
      //         <input
      //           className="form-check-input "
      //           type="checkbox"
      //           value={genre.id}
      //           id={`genre${genre.id}`}
      //           onChange={this.onChange}
      //           checked={with_genres.includes(String(genre.id))}
      //         />
      //         <label className="form-check-label" htmlFor={`genre${genre.id}`}>
      //           {genre.name}
      //         </label>
      //       </div>
      //     ))}
      //   </div>
      // </React.Fragment>
    );
  }
}
