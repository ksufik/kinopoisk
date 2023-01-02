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

  onGetFavorites = (value) => {
    this.setState({
      getFavoritesIsClicked: value,
    });
  };

  componentDidMount() {
    const { auth, authActions } = this.props;

    authActions.getAccount(auth.session_id);
  }

  render() {
    const { auth } = this.props;

    return (
      <BrowserRouter>
        <React.Fragment>
          <Header user={auth.user} onGetFavorites={this.onGetFavorites} />
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
