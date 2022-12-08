import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, label, value, className, ...rest }) => (
  <React.Fragment>
    <label htmlFor={name}>{label}</label>
    <input
      type="text"
      className={className}
      id={name}
      placeholder={label}
      name={name}
      value={value}
      autoComplete="off"
      {...rest}
    />
  </React.Fragment>
);

export default Input;

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
