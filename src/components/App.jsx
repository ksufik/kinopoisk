import React, { createContext } from 'react';
import Header from './Header/Header';
import Cookies from 'universal-cookie';
import CallApi from './api';
import MoviesPage from './pages/MoviesPage';
import MoviePage from './pages/MoviePage';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

const cookies = new Cookies();

export const AppContext = createContext();

const initialState = {
  user: {},
  session_id: null,
  cookies_name: 'movieApp_session',
  getFavoritesIsClicked: false,
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  updateSessionId = (session_id) => {
    cookies.set(this.state.cookies_name, session_id, {
      path: '/',
      // 30 дней в секундах
      maxAge: 3600 * 24 * 30,
    });
    this.setState({
      session_id,
    });
  };

  updateUser = (user) => {
    this.setState({
      user,
    });
  };

  //! при логауте обнулять любимые фильмы
  onLogOut = () => {
    cookies.remove(this.state.cookies_name);
    this.setState(
      {
        session_id: null,
        user: null,
      },
      () => this.emptyFavoriteAll()
    );
  };

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
    const session = cookies.get(this.state.cookies_name);
    if (session) {
      CallApi.get('account', { params: { session_id: session } }).then(
        (user) => {
          this.updateSessionId(session);
          this.updateUser(user);
        }
      );
      // fetchApi(
      //   `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session}`
      // ).then((user) => {
      //   this.updateUser(user);
      // });
    }
  }

  render() {
    const { user, session_id, getFavoritesIsClicked } = this.state;
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            updateUser: this.updateUser,
            updateSessionId: this.updateSessionId,
            onLogOut: this.onLogOut,
            onGetFavorites: this.onGetFavorites,
            getFavoritesIsClicked,
            emptyFavoriteAll: this.emptyFavoriteAll,
          }}
        >
          <React.Fragment>
            <Header user={user} onGetFavorites={this.onGetFavorites} />
          </React.Fragment>

          <Routes>
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
