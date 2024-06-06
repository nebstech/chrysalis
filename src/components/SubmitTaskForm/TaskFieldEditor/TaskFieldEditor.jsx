import React from 'react';
import PropTypes from 'prop-types';
import TaskTextFieldEditor from './TaskTextFieldEditor';
import TaskRadioFieldEditor from './TaskRadioFieldEditor';
import TaskCheckboxFieldEditor from './TaskCheckboxFieldEditor';
import styles from './TaskFieldEditor.module.css';

export default function TaskFieldEditor({ field, currentRequestField, onUpdate }) {
  if (!currentRequestField) {
    return null; // Add this to handle undefined currentRequestField
  }

  let editor;
  switch (field.type) {
    case 'text':
      if (field.type !== currentRequestField.type) {
        throw new Error('non-matching types');
      }
      editor = (
        <TaskTextFieldEditor
          field={field}
          currentRequestField={currentRequestField}
          onUpdate={onUpdate}
        />
      );
      break;
    case 'radio':
      if (field.type !== currentRequestField.type) {
        throw new Error('non-matching types');
      }
      editor = (
        <TaskRadioFieldEditor
          field={field}
          currentRequestField={currentRequestField}
          onUpdate={onUpdate}
        />
      );
      break;
    case 'checkbox':
      if (field.type !== currentRequestField.type) {
        throw new Error('non-matching types');
      }
      editor = (
        <TaskCheckboxFieldEditor
          field={field}
          currentRequestField={currentRequestField}
          onUpdate={onUpdate}
        />
      );
      break;
    default:
      throw new Error('Invalid field type');
  }

  return (
    <div className={styles.editorContainer}>
      <label>{field.prompt}</label>
      {editor}
    </div>
  );
}

TaskFieldEditor.propTypes = {
  field: PropTypes.shape({
    type: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    choices: PropTypes.array,
  }).isRequired,
  currentRequestField: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    selection: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
    ]),
  }),
  onUpdate: PropTypes.func.isRequired,
};
