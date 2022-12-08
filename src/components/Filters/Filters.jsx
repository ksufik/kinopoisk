import React from 'react';
import PropTypes from 'prop-types';
import GenresContainer from './GenresContainer';
import Pagination from './Pagination';
import PrimaryReleaseYear from './PrimaryReleaseYear';
import Reset from './Reset';
import SortBy from './SortBy';

export default class Filters extends React.PureComponent {
  static propTypes = {
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired,
    onChangeFilters: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
  };

  render() {
    // const sort_by = this.props.filters.sort_by идентична const {filters: {sort_by}} = this.props;
    const {
      filters: { sort_by, primary_release_year, with_genres },
      page,
      total_pages,
      onChangeFilters,
      onChangePage,
    } = this.props;

    console.log('Filters render');

    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <PrimaryReleaseYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />
        <GenresContainer with_genres={with_genres} onChangeFilters={onChangeFilters} />
        <Reset onChangeFilters={onChangeFilters} />
        <Pagination
          page={page}
          total_pages={total_pages}
          onChangePage={onChangePage}
        />
      </form>
    );
  }
}
