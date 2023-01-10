import React from 'react';
import Header from './Header/Header';
import MoviesPage from './pages/MoviesPage';
import MoviePage from './pages/MoviePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { withAuth } from './HOC/withAuth';
import ScrollToTop from './ScrollToTop/ScrollToTop';

class App extends React.PureComponent {
  componentDidMount() {
    const { auth, authActions } = this.props;
    authActions.getAccount(auth.session_id);
    window.addEventListener('scroll', this.toggleVisibility);
  }

  state = {
    isVisible: false,
  };

  toggleVisibility = () => {
    if (window.scrollY > 400) {
      this.setState({
        isVisible: true,
      });
    } else {
      this.setState({
        isVisible: false,
      });
    }
  };

  render() {
    const { auth, authActions } = this.props;

    return (
      <BrowserRouter>
        {/* onScroll={this.toggleVisibility} */}
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
        <ScrollToTop isVisible={this.state.isVisible} />
      </BrowserRouter>
    );
  }
}

export default withAuth(App);
