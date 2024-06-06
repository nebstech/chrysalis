import React from 'react';
import PropTypes from 'prop-types';
import styles from './TaskTextFieldEditor.module.css';

export default function TaskTextFieldEditor({ field, currentRequestField, onUpdate }) {
  function handleChange(evt) {
    onUpdate({
      ...currentRequestField,
      value: evt.currentTarget.value,
    });
  }

  return (
    <textarea
      className={styles.textArea}
      placeholder="Type response here..."
      value={currentRequestField.value}
      onChange={handleChange}
    />
  );
}

TaskTextFieldEditor.propTypes = {
  field: PropTypes.shape({
    prompt: PropTypes.string.isRequired,
  }).isRequired,
  currentRequestField: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
