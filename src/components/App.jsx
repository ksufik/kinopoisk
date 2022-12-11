import React, { createContext } from 'react';
import { resetFilters } from '../constants';
import Filters from './Filters/Filters';
import Header from './Header/Header';
import Cookies from 'universal-cookie';
import MoviesList from './Movies/MoviesList';
import CallApi from './api';

const cookies = new Cookies();

export const AppContext = createContext();

const initialState = {
  user: {},
  session_id: null,
  filters: {
    sort_by: 'popularity.desc',
    primary_release_year: new Date().getFullYear().toString(),
    with_genres: [],
  },
  page: 1,
  total_pages: 0,
  cookies_name: 'movieApp_session',
  getFavorites: false,
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // функции, которые передаются дочкам всегда в методе класса родителя, чтобы ссылки на эти методы не создавались при каждом рендере заново
  onChangeFilters = (event) => {
    //! если делать так, то вылезет ошибка name of null
    // this.setState((prev) => ({
    //   filters: {
    //     ...prev.filters, //=...this.state.filters(обновление ссылки),если без prev. Но если мы видим this.state то лучше сделать функциональное изменение (???), т.е. через prev
    //     [event.target.name]: event.target.value,
    //   },
    // }));

    const value = event.target.value;
    const name = event.target.name;
    console.log('value:', value);
    console.log('name:', name);
    if (name === resetFilters) {
      this.setState(initialState);
    } else {
      //если мы видим this.state то лучше сделать функционально(???), т.е. через prev
      this.setState((prevState) => ({
        filters: {
          //иммутабельность - возвращаем НОВУЮ ссылку filters при любом изменении в фильтрах
          ...prevState.filters,
          // в name лежит sort_by, primary_release_year or with_genres(?)
          [name]: value,
        },
      }));
    }
  };
  // функции, которые передаются дочкам всегда в методе класса родителя, чтобы ссылки на эти методы не создавались при каждом рендере заново
  onChangePage = ({
    page = this.state.page,
    total_pages = this.state.total_pages,
  }) => {
    this.setState({
      //=page: page,
      page,
      total_pages,
    });
  };

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

  onLogOut = () => {
    cookies.remove(this.state.cookies_name);
    this.setState({
      session_id: null,
      user: null,
    });
  };

  onGetFavorites = (value) => {
    this.setState({
      getFavorites: value,
    });
  };

  componentDidMount() {
    const session = cookies.get(this.state.cookies_name);
    if (session) {
      CallApi.get('account', { params: { session_id: session } }).then(
        (user) => {
          this.updateUser(user);
          this.updateSessionId(session);
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
    const { filters, page, total_pages, user, session_id, getFavorites } =
      this.state;
    return (
      <AppContext.Provider
        value={{
          user,
          session_id,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          onLogOut: this.onLogOut,
          onGetFavorites: this.onGetFavorites,
          getFavorites,
        }}
      >
        <React.Fragment>
          <Header user={user} onGetFavorites={this.onGetFavorites}/>
          <div className="container text-info">
            <div className="row mt-4">
              <div className="col-4">
                <div className="card" style={{ width: '100%' }}>
                  <div className="card-body">
                    <h3>Фильтры:</h3>
                    <Filters
                      filters={filters}
                      page={page}
                      total_pages={total_pages}
                      onChangeFilters={this.onChangeFilters}
                      onChangePage={this.onChangePage}
                    />
                  </div>
                </div>
              </div>
              <div className="col-8">
                {/* <MoviesContainer */}
                <MoviesList
                  page={page}
                  filters={filters}
                  onChangePage={this.onChangePage}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      </AppContext.Provider>
    );
  }
}
