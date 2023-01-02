import React from 'react';
//import PropTypes from 'prop-types';
import * as moviesActions from '../store/movies/movies.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//selector
const mapStateToProps = (state, ownProps) => {
  //возвращаем из стора то, что нам нужно в этом компоненте (возвращается в качестве пропсов)
  return { moviesObj: state.movies };
};
// происходит автоматический диспатч
const mapDispatchToProps = (dispatch) => ({
  moviesActions: bindActionCreators(moviesActions, dispatch),
});

export const withMovies = (Component) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class withMovies extends React.PureComponent {
      constructor() {
        super();
        this.state = {
          favorites: [],
          favorites_all: [],
          favorites_total_results: null,
          favorites_total_pages: null,
        };
      }

      // getFavorites = (filters = this.props.filters, page = this.props.page) => {
      //   const { sort_by } = filters;
      //   // со всеми параметрами получается огромная строка, поэтому используем библиотеку query-string, которая преобразует объект в строку
      //   const queryParams = {
      //     session_id: this.props.session_id,
      //     sort_by: sort_by,
      //     page: page,
      //   };
      //   CallApi.get('/account/{account_id}/favorite/movies', {
      //     params: queryParams,
      //   }).then((data) => {
      //     if (this.props.getFavoritesIsClicked) {
      //       this.props.onChangePage({
      //         page: data.page,
      //         total_pages: data.total_pages,
      //       });
      //     }
      //     this.setState((prev) => ({
      //       //! сделать так, чтобы при добавлении/удалении favorite movie весь массив не добавлялся в существующий
      //       favorites_all: [...prev.favorites_all, ...data.results],
      //       favorites: data.results,
      //       favorites_total_pages: data.total_pages,
      //       favorites_total_results: data.total_results,
      //     }));
      //   });
      // };

      getMovies = (filters, page) => {
        this.props.moviesActions.getMovies(filters, page);
      };

      // данные по умолчанию
      componentDidMount() {
        const { filters, page } = this.props.moviesObj;
        this.getMovies(filters, page);
        //здесь не вызываем, т.к. нужно ждать получения session_id
        //this.getFavorites(this.props.filters, 1);
      }

      //  componentDidUpdate(prevProps, prevState) {
      //  const { filters, page } = this.props.moviesObj;

      // if (
      //   this.props.session_id &&
      //   this.props.session_id !== prevProps.session_id
      // ) {
      //   this.getFavorites(this.props.filters, 1);
      // }

      // if (
      //   this.state.favorites_total_results !==
      //   prevState.favorites_total_results
      // ) {
      //   for (let i = 2; i < this.state.favorites_total_pages + 1; i++) {
      //     this.getFavorites(this.props.filters, i);
      //   }
      // }

      // если мы взаимодействуем с favorite movies (переход по ссылкам, фильтры)
      // if (this.props.getFavoritesIsClicked) {
      //   if (
      //     this.props.getFavoritesIsClicked !==
      //       prevProps.getFavoritesIsClicked ||
      //     (this.props.session_id &&
      //       this.props.session_id !== prevProps.session_id)
      //   ) {
      //     // если мы со всех фильмов переходим к favorite movies и ждем получения session_id
      //     this.getFavorites(this.props.filters, 1);
      //   }
      // if (this.props.filters !== prevProps.filters) {
      //   this.getFavorites(this.props.filters, 1);
      //   this.props.onChangePage({ page: 1 });
      // }

      //   if (this.props.page !== prevProps.page) {
      //     this.getFavorites(this.props.filters, this.props.page);
      //   }
      //   // если мы взаимодействуем со всеми фильмами (переход по ссылкам, фильтры)
      // } else {
      // если мы с favorite movies переходим ко всем фильмам
      //!initialState
      // if (
      //   this.props.getFavoritesIsClicked !== prevProps.getFavoritesIsClicked
      // ) {
      //   this.getMovies(initialState.filters, 1);
      // }
      // из-за иммутабельности в onChangeFilters (мы при любом изменении в фильтрах создаем новую ссылку на filters) можно сравнивать просто ссылки(!) на них, а не каждый ключ фильтра (sort_by, primary_release_year, with_genres)
      // }
      // }

      render() {
        // console.log('MoviesHOC render');
        return <Component {...this.props} />;
      }
    }
  );
