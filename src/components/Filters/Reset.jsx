import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { RESET_FILTERS } from '../../helpers/constants';

export default class Reset extends PureComponent {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
  };

  resetFilters = () => {
    this.props.onChangeFilters({
      target: {
        name: RESET_FILTERS,
        value: null,
      },
    });
  };
  render() {
    //  console.log('Reset render');
    return (
      <button
        type="button"
        className="btn btn-outline-info mb-2"
        onClick={this.resetFilters}
      >
        Сбросить фильтры
      </button>
    );
  }
}
