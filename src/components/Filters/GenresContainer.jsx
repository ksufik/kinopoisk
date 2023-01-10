import React from 'react';
//import PropTypes from 'prop-types';
import Genres from './Genres';
import CallApi from '../../api';

// из-за PureComponent (=shouldComponentUpdate) лишние рендеры компонента при взаимодействии с другими частями фильтра не происходят
export default class GenresContainer extends React.PureComponent {
  // static propTypes = {
  //   onChangeFilters: PropTypes.func.isRequired,
  //   with_genres: PropTypes.array.isRequired,
  // };

  constructor() {
    super();
    this.state = {
      genres: [],
    };
  }

  getGenres = () => {
    CallApi.get('genre/movie/list')
      .then((data) => {
        this.setState({
          genres: data.genres,
        });
      })
      .catch((error) => {
        console.log('getGenres error', error);
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
    const { with_genres, disabled } = this.props;

    return (
      <Genres
        resetGenres={this.resetGenres}
        genres={genres}
        onChange={this.onChange}
        with_genres={with_genres}
        disabled={disabled}
      />
    );
  }
}
