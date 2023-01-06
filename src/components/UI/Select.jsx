import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
    }
  }

  render() {
    const { id, name, value, onChange, labelText, children, className } =
      this.props;
    return (
      <div className="form-group" style={{ width: '100%' }}>
        {console.log('select upd')}
        <label htmlFor={id}>{labelText}</label>
        <select
          id={id}
          className={`form-control text-info border-info ${className}`}
          name={name}
          value={value}
          onChange={onChange}
        >
          {/* options */}
          {children}
        </select>
      </div>
    );
  }
}
