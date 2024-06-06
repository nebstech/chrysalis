import React from 'react';
import PropTypes from 'prop-types';
import styles from './TaskCheckboxFieldEditor.module.css';

export default function TaskCheckboxFieldEditor({ field, currentRequestField, onUpdate }) {
  function handleChange(idx) {
    return (evt) => {
      const newSelection = evt.target.checked
        ? [...currentRequestField.selection, idx]
        : currentRequestField.selection.filter((i) => i !== idx);
      onUpdate({
        ...currentRequestField,
        selection: newSelection,
      });
    };
  }

  return (
    <div className={styles.checkboxGroup}>
      {field.choices.map((choice, idx) => (
        <label key={idx}>
          <input
            type="checkbox"
            checked={currentRequestField.selection.includes(idx)}
            onChange={handleChange(idx)}
          />
          {choice}
        </label>
      ))}
    </div>
  );
}

TaskCheckboxFieldEditor.propTypes = {
  field: PropTypes.shape({
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  currentRequestField: PropTypes.shape({
    selection: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
