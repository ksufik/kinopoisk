import React from 'react';
import Filters from '../Filters/Filters';
import { withMovies } from '../HOC/withMovies';
import MoviesList from '../Movies/MoviesList';

class MoviesPage extends React.Component {

  componentDidUpdate(prevProps) {
    const {
      moviesObj: { filters, page },
      moviesActions: { getMovies, updatePage },
    } = this.props;

    if (filters !== prevProps.moviesObj.filters) {
      updatePage(1);
      getMovies(filters, 1);
    }
    if (page !== prevProps.moviesObj.page) {
      getMovies(filters, page);
    }
  }

  // emptyFavoriteAll = () => {
  //   this.setState({
  //     favorites_all: [],
  //   });
  // };

  // onGetFavorites = (value) => {
  //   this.setState({
  //     getFavoritesIsClicked: value,
  //   });
  // };

  render() {
    const { moviesObj } = this.props;
    const { filters, page, total_pages } = moviesObj;
    return (
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
                  //  getFavoritesIsClicked={getFavoritesIsClicked}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList />
          </div>
        </div>
      </div>
    );
  }
}

export default withMovies(MoviesPage);
