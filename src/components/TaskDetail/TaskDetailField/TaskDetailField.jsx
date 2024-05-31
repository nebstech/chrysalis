import React from 'react';
import PropTypes from 'prop-types';
import { RequestField } from '../../../classes/service/service';
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

TaskDetailField.propTypes = {
  field: PropTypes.instanceOf(RequestField).isRequired,
};
