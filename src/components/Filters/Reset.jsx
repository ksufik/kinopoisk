import React, { PureComponent } from 'react';
import { withMovies } from '../HOC/withMovies';

class Reset extends PureComponent {
  render() {
    const { moviesActions, disabled } = this.props;
    const { resetFilters } = moviesActions;
    return (
      <button
        type="button"
        className="btn btn-outline-info mb-2"
        onClick={resetFilters}
        disabled={disabled}
      >
        Сбросить фильтры
      </button>
    );
  }
}

export default withMovies(Reset);
