import React from 'react';
//import PropTypes from 'prop-types';
import * as moviesActions from '../../store/movies/movies.actions';
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
        };
      }

      render() {
        return <Component {...this.props} />;
      }
    }
  );
