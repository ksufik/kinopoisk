import React from 'react';
import Filters from '../Filters/Filters';
import { withAuth } from '../HOC/withAuth';
import { withMovies } from '../HOC/withMovies';
import MoviesList from '../Movies/MoviesList';

class MoviesPage extends React.Component {
  componentDidMount() {
    const { filters, page } = this.props.moviesObj;

    this.props.moviesActions.getMovies({ filters, page });
  }

  getArray = () => {
    const {
      moviesObj: { search },
      moviesActions: { getMovies, getFavorites, getSearched },
      auth: { getFavoritesIsClicked },
    } = this.props;

    if (getFavoritesIsClicked) {
      return getFavorites;
    } else if (search) {
      return getSearched;
    } else {
      return getMovies;
    }
  };

  componentDidUpdate(prevProps) {
    const {
      moviesObj: { filters, page, search },
      moviesActions: { updatePage, getSearched },
      auth: { getFavoritesIsClicked },
    } = this.props;

    const getArray = this.getArray();

    if (
      (search && search !== prevProps.moviesObj.search) ||
      (getFavoritesIsClicked &&
        getFavoritesIsClicked !== prevProps.auth.getFavoritesIsClicked) ||
      filters !== prevProps.moviesObj.filters
    ) {
      updatePage(1);
      getArray({ filters, page: 1 });
    }

    if (page !== prevProps.moviesObj.page) {
      getArray({ filters, page });
    }
  }

  render() {
    const { moviesObj, auth } = this.props;
    const {
      filters,
      page,
      total_pages,
      movies,
      favorites,
      favorites_all,
      error,
    } = moviesObj;
    const { getFavoritesIsClicked, isAuth } = auth;

    return (
      <div className="container text-info">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card w-100">
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
            <MoviesList
              getFavoritesIsClicked={getFavoritesIsClicked}
              isAuth={isAuth}
              movies={movies}
              favorites={favorites}
              favorites_all={favorites_all}
              error={error}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withMovies(withAuth(MoviesPage));
