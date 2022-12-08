import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { resetFilters } from '../../constants';

export default class Reset extends PureComponent {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
  };

  resetFilters = () => {
    this.props.onChangeFilters({
      target: {
        name: resetFilters,
        value: null,
      },
    });
  };
  render() {
    console.log('Reset render');
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
