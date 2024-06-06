import React from 'react';
import PropTypes from 'prop-types';
import TaskDetailCheckboxField from './TaskDetailCheckboxField';
import TaskDetailRadioField from './TaskDetailRadioField';
import TaskDetailTextField from './TaskDetailTextField';

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

const textFieldShape = PropTypes.shape({
  type: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  value: PropTypes.string,
});

const radioFieldShape = PropTypes.shape({
  type: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  selection: PropTypes.number,
});

const checkboxFieldShape = PropTypes.shape({
  type: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  selection: PropTypes.arrayOf(PropTypes.number).isRequired,
});

TaskDetailField.propTypes = {
  field: PropTypes.oneOfType([
    textFieldShape,
    radioFieldShape,
    checkboxFieldShape,
  ]).isRequired,
};
