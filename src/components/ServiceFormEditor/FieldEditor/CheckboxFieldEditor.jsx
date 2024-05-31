import React from 'react';
import PropTypes from 'prop-types';

const CheckboxFieldEditor = ({ field, onChange }) => {
  const handleOptionChange = (index) => (event) => {
    const newOptions = [...field.options];
    newOptions[index] = event.target.value;
    onChange({ ...field, options: newOptions });
  };

  return (
    <div>
      <label>
        {field.prompt}
        {(field.options || []).map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={handleOptionChange(index)}
          />
        ))}
      </label>
    </div>
  );
};

CheckboxFieldEditor.propTypes = {
  field: PropTypes.shape({
    prompt: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxFieldEditor;
