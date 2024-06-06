import React from 'react';
import PropTypes from 'prop-types';
import styles from './FieldEditor.module.css';

const TextFieldEditor = ({ field, onChange }) => {
  const handleChange = (e) => {
    const newField = { ...field, value: e.target.value };
    onChange(newField);
  };

  return (
    <div className={styles.box}>
      <input
        type="text"
        value={field.value}
        onChange={handleChange}
        className={styles.input}
        placeholder="Enter text"
      />
    </div>
  );
};

TextFieldEditor.propTypes = {
  field: PropTypes.shape({
    prompt: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextFieldEditor;
