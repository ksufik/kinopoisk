import React, { createContext } from 'react';
import Header from './Header/Header';
import CallApi from './api';
import MoviesPage from './pages/MoviesPage';
import MoviePage from './pages/MoviePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { logOut, updateAuth } from './store/user/user.actions';
import { connect } from 'react-redux';

export const AppContext = createContext();

class App extends React.PureComponent {
  //! при логауте обнулять любимые фильмы
  // onLogOut = () => {
  //   this.props.store.dispatch(logOut());
  // };

  emptyFavoriteAll = () => {
    this.setState({
      favorites_all: [],
    });
  };

  onGetFavorites = (value) => {
    this.setState({
      getFavoritesIsClicked: value,
    });
  };

  componentDidMount() {
    const { session_id } = this.props;

    if (session_id) {
      CallApi.get('account', { params: { session_id: session_id } }).then(
        (user) => {
          this.props.updateAuth({user, session_id});
        }
      );
    }
  }

  render() {
    const {
      user,
      getFavoritesIsClicked,
      session_id,
      updateAuth,
      logOut: onLogOut,
    } = this.props;

    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            updateAuth,
            onLogOut,
            onGetFavorites: this.onGetFavorites,
            getFavoritesIsClicked,
            emptyFavoriteAll: this.emptyFavoriteAll,
          }}
        >
          <React.Fragment>
            <Header user={user} onGetFavorites={this.onGetFavorites} />
          </React.Fragment>
          {console.log('render')}
          <Routes>
            {/* //! public and private */}
            {/* <Route path="/" element={<PublicRoute />}> */}
            <Route path="" element={<MoviesPage />} />
            {/* </Route> */}
            <Route path="/movie/:movie_id" element={<MoviePage />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

//selector
const mapStateToProps = (state, ownProps) => {
  //возвращаем из стора то, что нам нужно в этом компоненте (возвращается в качестве пропсов)

  return state.user;
};
// происходит автоматический диспатч
const mapDispatchToProps = { updateAuth, logOut };

////а вот что происходит поод капотом
//   return {
//     updateAuth: (user, session_id) =>
//       dispatch(updateAuth(user, session_id)),
//     onLogOut: () => dispatch(logOut()),
//   };

export default connect(mapStateToProps, mapDispatchToProps)(App);
