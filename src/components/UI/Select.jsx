import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  id,
  name,
  value,
  onChange,
  labelText,
  children,
  className,
}) => (
  <div className="form-group">
    {/* {console.log('Select render')} */}
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

export default Select;

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
