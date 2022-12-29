import React from 'react';
import { RESET_FILTERS } from '../../helpers/constants';
import Filters from '../Filters/Filters';
import MoviesList from '../Movies/MoviesList';

export const initialState = {
  filters: {
    sort_by: 'popularity.desc',
    primary_release_year: new Date().getFullYear().toString(),
    with_genres: [],
  },
  page: 1,
  total_pages: 0,
  getFavoritesIsClicked: false,
  favorites_all: [],
};

export default class MoviesPage extends React.Component {
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
    if (name === RESET_FILTERS) {
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

  render() {
    const { filters, page, total_pages, getFavoritesIsClicked } = this.state;
    return (
      <React.Fragment>
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
                    getFavoritesIsClicked={getFavoritesIsClicked}
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
    );
  }
}
