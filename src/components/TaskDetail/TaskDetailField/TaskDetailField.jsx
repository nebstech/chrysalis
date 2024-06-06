import React from 'react';
import PropTypes from 'prop-types';
import TaskDetailCheckboxField from './TaskDetailField/TaskDetailCheckboxField.jsx';
import TaskDetailRadioField from './TaskDetailField/TaskDetailRadioField.jsx';
import TaskDetailTextField from './TaskDetailField/TaskDetailTextField.jsx';

export default function TaskDetailField({ field }) {
  let elem;

  switch (field.type) {
    case 'text':
      elem = <TaskDetailTextField field={field} />;
      break;
    case 'radio':
      elem = <TaskDetailRadioField field={field} />;
      break;
    case 'checkbox':
      elem = <TaskDetailCheckboxField field={field} />;
      break;
    default:
      elem = null;
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <h5 style={{ fontSize: '20px', margin: '0 0 8px 0' }}>{field.prompt}</h5>
      {elem}
    </div>
  );
}

TaskDetailField.propTypes = {
  field: PropTypes.shape({
    type: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
};
