import React from 'react';
import PropTypes from 'prop-types';
import styles from './RadioFieldEditor.module.css';
import NoOutlineIconButton from './NoOutlineIconButton';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';

const RadioFieldEditor = ({ field, onChange }) => {
  const handleOptionChange = (index) => (event) => {
    const newOptions = [...field.choices];
    newOptions[index] = event.target.value;
    onChange({ ...field, choices: newOptions });
  };

  const addOption = () => {
    onChange({ ...field, choices: [...field.choices, ''] });
  };

  const removeOption = (index) => () => {
    const newOptions = field.choices.filter((_, i) => i !== index);
    onChange({ ...field, choices: newOptions });
  };

  return (
    <div>
      <label>
        {field.prompt}
        {(field.choices || []).map((option, index) => (
          <div key={index} className={styles.optionContainer}>
            <input
              type="text"
              value={option}
              onChange={handleOptionChange(index)}
              className={styles.input}
            />
            <NoOutlineIconButton onClick={removeOption(index)}>
              <Cross1Icon />
            </NoOutlineIconButton>
          </div>
        ))}
        <button onClick={addOption} className={styles.addButton}>
          <PlusIcon /> Add option
        </button>
      </label>
    </div>
  );
};

RadioFieldEditor.propTypes = {
  field: PropTypes.shape({
    prompt: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RadioFieldEditor;
