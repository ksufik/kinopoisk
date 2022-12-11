import React, { PureComponent } from 'react';
import { API_URL, API_KEY_3, LANGUAGE_RU } from '../../constants';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import MoviesList from './MoviesList';

//! нигде не используется (заменили на MoviesHOC), просто напоминание про контейнеры и презентационные компоненты

export default class MoviesContainer extends PureComponent {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  static propTypes = {
    onChangePage: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
  };

  getMovies = (filters, page) => {
    // строка ниже идентична const sort_by = this.props.filters.sort_by
    const { sort_by, primary_release_year, with_genres } = filters;
    // со всеми параметрами получается огромная строка, поэтому используем библиотеку query-string, которая преобразует объект в строку
    const queryParams = {
      api_key: API_KEY_3,
      language: LANGUAGE_RU,
      sort_by: sort_by,
      page: page,
      primary_release_year: primary_release_year,
    };
		
    if (with_genres.length > 0) {
      queryParams.with_genres = with_genres.join(',');
    }
    const link = `${API_URL}/discover/movie?${queryString.stringify(
      queryParams
    )}`;

    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        this.props.onChangePage({
          page: data.page,
          total_pages: data.total_pages,
        });
        this.setState({
          movies: data.results,
        });
      });
  };
  // данные по умолчанию
  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }
  componentDidUpdate(prevProps) {
    // из-за иммутабельности в onChangeFilters (мы при любом изменении в фильтрах создаем новую ссылку на filters) можно сравнивать просто ссылки(!) на них, а не каждый ключ фильтра ( sort_by, primary_release_year, with_genres)
    if (this.props.filters !== prevProps.filters) {
      this.getMovies(this.props.filters, 1);
      this.props.onChangePage(1);
    }
    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }
  }
  render() {
    const { movies } = this.state;
    console.log('MoviesContainer render');
    return <MoviesList movies={movies} />;
  }
}
