import React, { PureComponent } from 'react';
import { LANGUAGE_RU } from '../../constants';
import PropTypes from 'prop-types';
import CallApi from '../api';

export default (Component) =>
  class MoviesHOC extends PureComponent {
    constructor() {
      super();
      this.state = {
        movies: [],
        favorites: [],
        favorites__indx: [],
      };
    }

    static propTypes = {
      onChangePage: PropTypes.func.isRequired,
      filters: PropTypes.object.isRequired,
      page: PropTypes.number.isRequired,
    };

    getFavorites = (filters, page) => {
      const { sort_by } = filters;
      // со всеми параметрами получается огромная строка, поэтому используем библиотеку query-string, которая преобразует объект в строку
      const queryParams = {
        session_id: this.props.session_id,
        language: LANGUAGE_RU,
        sort_by: sort_by,
        page: page,
      };
      CallApi.get('/account/{account_id}/favorite/movies', {
        params: queryParams,
      }).then((data) => {
        this.props.onChangePage({
          page: data.page,
          total_pages: data.total_pages,
        });
        this.setState(
          {
            favorites: data.results,
          },
          () => {
            this.state.movies.forEach((movie) => this.addFullStar(movie));
          }
        );
      });
    };

    getMovies = (filters, page) => {
      // строка ниже идентична const sort_by = this.props.filters.sort_by
      const { sort_by, primary_release_year, with_genres } = filters;
      // со всеми параметрами получается огромная строка, поэтому используем библиотеку query-string, которая преобразует объект в строку
      const queryParams = {
        language: LANGUAGE_RU,
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year,
      };

      if (with_genres.length > 0) {
        queryParams.with_genres = with_genres.join(',');
      }

      CallApi.get('discover/movie', {
        params: queryParams,
      }).then((data) => {
        this.props.onChangePage({
          page: data.page,
          total_pages: data.total_pages,
        });
        this.setState({
          movies: data.results,
        });
      });
    };

    addFullStar = (movie) => {
      this.state.favorites.forEach((favorite) => {
        if (favorite.id === movie.id) {
          this.state.favorites__indx.push(movie.id);
        }
      });
    };

    // данные по умолчанию
    componentDidMount() {
      this.getMovies(this.props.filters, this.props.page);
    }

    componentDidUpdate(prevProps) {
      // из-за иммутабельности в onChangeFilters (мы при любом изменении в фильтрах создаем новую ссылку на filters) можно сравнивать просто ссылки(!) на них, а не каждый ключ фильтра (sort_by, primary_release_year, with_genres)
      if (this.props.filters !== prevProps.filters) {
        this.getMovies(this.props.filters, 1);
        this.props.onChangePage({ page: 1 });
      }
      if (this.props.page !== prevProps.page) {
        this.getMovies(this.props.filters, this.props.page);
      }

      if (
        (this.props.getFavorites &&
          this.props.getFavorites !== prevProps.getFavorites) ||
        (this.props.session_id !== prevProps.session_id &&
          this.props.session_id)
      ) {
        this.getFavorites(this.props.filters, this.props.page);
      }
    }
    render() {
      const { movies, favorites, favorites__indx } = this.state;
      console.log('MoviesHOC render');
      console.log('favorites:', favorites);
      console.log('favorites__indx', favorites__indx);
      return (
        <Component
          movies={movies}
          favorites__indx={favorites__indx}
          getFavorites={this.props.getFavorites}
          favorites={favorites}
        />
      );
    }
  };
