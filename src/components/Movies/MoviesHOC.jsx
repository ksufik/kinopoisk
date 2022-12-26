import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CallApi from '../api';
import { initialState } from '../pages/MoviesPage';

export default (Component) =>
  class MoviesHOC extends PureComponent {
    constructor() {
      super();
      this.state = {
        movies: [],
        favorites: [],
        favorites_all: [],
        favorites_total_results: null,
        favorites_total_pages: null,
      };
    }

    static propTypes = {
      onChangePage: PropTypes.func.isRequired,
      filters: PropTypes.object.isRequired,
      page: PropTypes.number.isRequired,
    };

    getFavorites = (filters = this.props.filters, page = this.props.page) => {
      const { sort_by } = filters;
      // со всеми параметрами получается огромная строка, поэтому используем библиотеку query-string, которая преобразует объект в строку
      const queryParams = {
        session_id: this.props.session_id,
        sort_by: sort_by,
        page: page,
      };
      CallApi.get('/account/{account_id}/favorite/movies', {
        params: queryParams,
      }).then((data) => {
        if (this.props.getFavoritesIsClicked) {
          this.props.onChangePage({
            page: data.page,
            total_pages: data.total_pages,
          });
        }
        this.setState((prev) => ({
          //! сделать так, чтобы при добавлении/удалении favorite movie весь массив не добавлялся в существующий
          favorites_all: [...prev.favorites_all, ...data.results],
          favorites: data.results,
          favorites_total_pages: data.total_pages,
          favorites_total_results: data.total_results,
        }));
      });
    };

    getMovies = (filters, page) => {
      // строка ниже идентична const sort_by = this.props.filters.sort_by
      const { sort_by, primary_release_year, with_genres } = filters;
      // со всеми параметрами получается огромная строка, поэтому используем библиотеку query-string, которая преобразует объект в строку
      const queryParams = {
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
        if (!this.props.getFavoritesIsClicked) {
          this.props.onChangePage({
            page: data.page,
            total_pages: data.total_pages,
          });
        }
        this.setState({
          movies: data.results,
        });
      });
    };

    // данные по умолчанию
    componentDidMount() {
      this.getMovies(this.props.filters, this.props.page);
      //здесь не вызываем, т.к. нужно ждать получения session_id
      //this.getFavorites(this.props.filters, 1);
    }

    //! switch
    componentDidUpdate(prevProps, prevState) {
      if (
        this.props.session_id &&
        this.props.session_id !== prevProps.session_id
      ) {
        this.getFavorites(this.props.filters, 1);
      }

      if (
        this.state.favorites_total_results !== prevState.favorites_total_results
      ) {
        for (let i = 2; i < this.state.favorites_total_pages + 1; i++) {
          this.getFavorites(this.props.filters, i);
        }
      }

      // если мы взаимодействуем с favorite movies (переход по ссылкам, фильтры)
      if (this.props.getFavoritesIsClicked) {
        if (
          this.props.getFavoritesIsClicked !==
            prevProps.getFavoritesIsClicked ||
          (this.props.session_id &&
            this.props.session_id !== prevProps.session_id)
        ) {
          // если мы со всех фильмов переходим к favorite movies и ждем получения session_id
          this.getFavorites(this.props.filters, 1);
        }
        if (this.props.filters !== prevProps.filters) {
          this.getFavorites(this.props.filters, 1);
          this.props.onChangePage({ page: 1 });
        }

        if (this.props.page !== prevProps.page) {
          this.getFavorites(this.props.filters, this.props.page);
        }
        // если мы взаимодействуем со всеми фильмами (переход по ссылкам, фильтры)
      } else {
        // если мы с favorite movies переходим ко всем фильмам
        if (
          this.props.getFavoritesIsClicked !== prevProps.getFavoritesIsClicked
        ) {
          this.getMovies(initialState.filters, 1);
        }
        // из-за иммутабельности в onChangeFilters (мы при любом изменении в фильтрах создаем новую ссылку на filters) можно сравнивать просто ссылки(!) на них, а не каждый ключ фильтра (sort_by, primary_release_year, with_genres)
        if (this.props.filters !== prevProps.filters) {
          this.getMovies(this.props.filters, 1);
          this.props.onChangePage({ page: 1 });
        }
        if (this.props.page !== prevProps.page) {
          this.getMovies(this.props.filters, this.props.page);
        }
      }
    }

    render() {
      const { movies, favorites, favorites_all } = this.state;
      // console.log('MoviesHOC render');
      return (
        <Component
          movies={movies}
          getFavoritesIsClicked={this.props.getFavoritesIsClicked}
          favorites_all={favorites_all}
          favorites={favorites}
          getFavorites={this.getFavorites}
        />
      );
    }
  };
