import React from 'react';
import PropTypes from 'prop-types';
import { ServiceRadioField, ServiceField } from '../../../classes/service/formField';
import NoOutlineIconButton from './NoOutlineIconButton';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import styles from './formField.module.css';

export default function RadioFormField({ field, onChange }) {
  function editChoice(index) {
    return (evt) => {
      const newChoices = [...field.choices];
      newChoices.splice(index, 1, evt.currentTarget.value);
      const newField = new ServiceRadioField(field.prompt, newChoices);
      onChange(newField);
    };
  }

  function newChoice() {
    const newChoices = [...field.choices, ``];
    const newField = new ServiceRadioField(field.prompt, newChoices);
    onChange(newField);
  }

  function deleteChoice(index) {
    return () => {
      // If there is only one choice, do not delete it
      if (field.choices.length === 1) {
        return;
      }
      const newChoices = [...field.choices];
      newChoices.splice(index, 1);
      const newField = new ServiceRadioField(field.prompt, newChoices);
      onChange(newField);
    };
  }

  return (
    <div className={styles.flex}>
      {field.choices.map((choice, idx) => {
        return (
          <div className={styles.flexRow} key={idx}>
            <NoOutlineIconButton onClick={deleteChoice(idx)}>
              <Cross1Icon />
            </NoOutlineIconButton>
            <input
              className={styles.textField}
              placeholder={`Choice ${idx + 1}`}
              value={choice}
              onChange={editChoice(idx)}
            />
          </div>
        );
      })}
      <button className={styles.button} onClick={newChoice}>
        <PlusIcon />
        Add new choice
      </button>
    </div>
  );
}

RadioFormField.propTypes = {
  field: PropTypes.instanceOf(ServiceRadioField).isRequired,
  onChange: PropTypes.func.isRequired,
};
