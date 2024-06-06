import React from 'react';
import PropTypes from 'prop-types';

const ChangeServiceTypeDropdown = ({ field, onSelect }) => {
  const handleChange = (event) => {
    onSelect(event.target.value);
  };

  return (
    <select value={field.type} onChange={handleChange}>
      <option value="text">Text</option>
      <option value="radio">Radio</option>
      <option value="checkbox">Checkbox</option>
    </select>
  );
};

ChangeServiceTypeDropdown.propTypes = {
  field: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ChangeServiceTypeDropdown;
