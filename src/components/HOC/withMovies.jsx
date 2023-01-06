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
          // favorites: [],
          // favorites_all: [],
          // favorites_total_results: null,
          // favorites_total_pages: null,
        };
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

      // }

      render() {
        return <Component {...this.props} />;
      }
    }
  );
