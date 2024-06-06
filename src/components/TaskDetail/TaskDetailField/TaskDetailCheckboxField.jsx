import React from 'react';
import PropTypes from 'prop-types';
import { RequestCheckboxField } from '../../../classes/service/service';

export default function TaskDetailCheckboxField({ field }) {
  return (
    <div>
      {field.choices.map((choice, idx) => (
        <div key={idx}>
          <input
            type="checkbox"
            checked={field.selection.includes(idx)}
            disabled={true}
          />
          <label>{choice}</label>
        </div>
      ))}
    </div>
  );
}

TaskDetailCheckboxField.propTypes = {
  field: PropTypes.shape({
    type: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
    selection: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};
