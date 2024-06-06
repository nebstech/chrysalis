import React from 'react';
import PropTypes from 'prop-types';
import styles from './FieldEditor.module.css';

const CheckboxFieldEditor = ({ field, onChange }) => {
  const handleOptionChange = (index) => (event) => {
    const newOptions = [...field.options];
    newOptions[index] = event.target.value;
    onChange({ ...field, options: newOptions });
  };

  const addOption = () => {
    const newOptions = [...field.options, ''];
    onChange({ ...field, options: newOptions });
  };

  const removeOption = (index) => () => {
    const newOptions = field.options.filter((_, i) => i !== index);
    onChange({ ...field, options: newOptions });
  };

  return (
    <div>
      <label>
        {field.prompt}
        {(field.options || []).map((option, index) => (
          <div key={index} className={styles.option}>
            <input
              type="text"
              value={option}
              onChange={handleOptionChange(index)}
            />
            <button onClick={removeOption(index)}>✕</button>
          </div>
        ))}
        <button onClick={addOption}>Add Option</button>
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
