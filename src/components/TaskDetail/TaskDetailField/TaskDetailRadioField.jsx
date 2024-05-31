import React from 'react';
import PropTypes from 'prop-types';
import { RequestRadioField } from '../../../classes/service/service';

export default function TaskDetailRadioField({ field }) {
  return (
    <div>
      {field.choices.map((choice, idx) => (
        <div key={idx}>
          <input
            type="radio"
            name="radioGroup"
            value={idx}
            checked={field.selection === idx}
            disabled={true}
          />
          <label>{choice}</label>
        </div>
      ))}
    </div>
  );
}

TaskDetailRadioField.propTypes = {
  field: PropTypes.instanceOf(RequestRadioField).isRequired,
};
