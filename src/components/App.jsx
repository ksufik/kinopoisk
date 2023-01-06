import React from 'react';
import Header from './Header/Header';
import MoviesPage from './pages/MoviesPage';
import MoviePage from './pages/MoviePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { withAuth } from './HOC/withAuth';

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

  componentDidMount() {
    const { auth, authActions } = this.props;
    authActions.getAccount(auth.session_id);
  }

  render() {
    const { auth, authActions } = this.props;

    return (
      <BrowserRouter>
        <React.Fragment>
          <Header
            user={auth.user}
            favoritesIsClicked={authActions.favoritesIsClicked}
          />
        </React.Fragment>
        <Routes>
          {/* //! public and private */}
          {/* <Route path="/" element={<PublicRoute />}> */}
          <Route path="" element={<MoviesPage />} />
          {/* </Route> */}
          <Route path="/movie/:movie_id" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default withAuth(App);
