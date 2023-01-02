import React, { PureComponent } from 'react';
import { withMovies } from '../HOC/withMovies';

class Reset extends PureComponent {
  render() {
    const { moviesActions } = this.props;
    const { resetFilters } = moviesActions;
    return (
      <button
        type="button"
        className="btn btn-outline-info mb-2"
        onClick={resetFilters}
      >
        Сбросить фильтры
      </button>
    );
  }
}

export default withMovies(Reset);
