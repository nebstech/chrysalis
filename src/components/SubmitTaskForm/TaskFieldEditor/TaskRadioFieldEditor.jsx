import React from 'react';
import PropTypes from 'prop-types';
import styles from './TaskRadioFieldEditor.module.css';

export default function TaskRadioFieldEditor({ field, currentRequestField, onUpdate }) {
  function handleChange(evt) {
    onUpdate({
      ...currentRequestField,
      selection: Number(evt.target.value),
    });
  }

  return (
    <select
      className={styles.radioDropdown}
      value={currentRequestField.selection}
      onChange={handleChange}
    >
      {field.choices.map((choice, idx) => (
        <option key={idx} value={idx}>
          {choice}
        </option>
      ))}
    </select>
  );
}

TaskRadioFieldEditor.propTypes = {
  field: PropTypes.shape({
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  currentRequestField: PropTypes.shape({
    selection: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
