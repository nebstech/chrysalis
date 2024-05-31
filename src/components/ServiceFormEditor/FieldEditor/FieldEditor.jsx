import React from 'react';
import CheckboxFieldEditor from './CheckboxFieldEditor';
import RadioFieldEditor from './RadioFieldEditor';
import TextFieldEditor from './TextFieldEditor';
import { ServiceField } from '../../../classes/service/formField';
import ChangeServiceTypeDropdown from './ChangeServiceTypeDropdown';
import styles from './FieldEditor.module.css';

export default function FieldEditor({
  field,
  onChange,
  onMoveUp,
  onMoveDown,
  onDelete,
  onReplace,
}) {
  let theField;
  switch (field.type) {
    case 'text':
      theField = <TextFieldEditor field={field} onChange={onChange} />;
      break;
    case 'radio':
      theField = <RadioFieldEditor field={field} onChange={onChange} />;
      break;
    case 'checkbox':
      theField = <CheckboxFieldEditor field={field} onChange={onChange} />;
      break;
    default:
      theField = null;
  }

  const onPromptChange = (evt) => {
    onChange({
      ...field,
      prompt: evt.target.value,
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.grid}>
        <div className={styles.iconButtons}>
          <button className={styles.iconButton} onClick={onMoveUp}>
            ↑
          </button>
          <button className={styles.iconButton} onClick={onDelete}>
            ✕
          </button>
          <button className={styles.iconButton} onClick={onMoveDown}>
            ↓
          </button>
        </div>
        <div className={styles.fieldEditor}>
          <ChangeServiceTypeDropdown field={field} onSelect={onReplace} />
          <p className={styles.promptLabel}>Prompt</p>
          <input
            type="text"
            placeholder="Type prompt message..."
            required
            onChange={onPromptChange}
            value={field.prompt}
            className={styles.textField}
          />
          {theField}
        </div>
      </div>
    </div>
  );
}
