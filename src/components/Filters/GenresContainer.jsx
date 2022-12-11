import React from 'react';
import PropTypes from 'prop-types';
import { LANGUAGE_RU } from '../../constants';
import Genres from './Genres';
import CallApi from '../api';

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
    //! везде проследить отработку ошибки статус код 404
    CallApi.get('/genre/movie/list', {
      params: { language: LANGUAGE_RU },
    }).then((data) => {
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
