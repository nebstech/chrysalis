import React from 'react';
import PropTypes from 'prop-types';
import styles from './CheckboxFieldEditor.module.css';

const CheckboxFieldEditor = ({ field, onChange }) => {
  const handleOptionChange = (index) => (event) => {
    const newChoices = [...field.choices];
    newChoices[index] = event.target.value;
    onChange({ ...field, choices: newChoices });
  };

  const addChoice = () => {
    onChange({ ...field, choices: [...field.choices, ''] });
  };

  const removeChoice = (index) => () => {
    if (field.choices.length > 1) {
      const newChoices = field.choices.filter((_, idx) => idx !== index);
      onChange({ ...field, choices: newChoices });
    }
  };

  return (
    <div>
      <label>
        {field.prompt}
        {field.choices.map((choice, index) => (
          <div key={index} className={styles.choiceContainer}>
            <input
              type="text"
              value={choice}
              onChange={handleOptionChange(index)}
              className={styles.choiceInput}
            />
            <button onClick={removeChoice(index)} className={styles.removeButton}>✕</button>
          </div>
        ))}
      </label>
      <button onClick={addChoice} className={styles.addButton}>Add Choice</button>
    </div>
  );
};

CheckboxFieldEditor.propTypes = {
  field: PropTypes.shape({
    prompt: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxFieldEditor;
