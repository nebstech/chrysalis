import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { sanitize, validate } from '../../classes/service/formField';
import FieldEditor from './FieldEditor/FieldEditor';
import styles from './ServiceFormEditor.module.css';

function ServiceFormEditor({ onCommit }) {
  const { userID } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fields: [],
  });

  const [showFormErrors, setShowFormErrors] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  function setServiceName(evt) {
    setFormData({
      ...formData,
      name: evt.currentTarget.value,
    });
  }

  function setServiceDescription(evt) {
    setFormData({
      ...formData,
      description: evt.currentTarget.value,
    });
  }

  function setFormField(index) {
    return (field) => {
      setFormData((prevFormData) => {
        const nextFields = [...prevFormData.fields];
        nextFields.splice(index, 1, field);
        return {
          ...prevFormData,
          fields: nextFields,
        };
      });
    };
  }

  function createTextField() {
    setFormData({
      ...formData,
      fields: [...formData.fields, { type: 'text', prompt: '', value: '' }],
    });
  }

  function createRadioField() {
    setFormData({
      ...formData,
      fields: [...formData.fields, { type: 'radio', prompt: '', choices: [''], selection: 0 }],
    });
  }

  function createCheckboxField() {
    setFormData({
      ...formData,
      fields: [...formData.fields, { type: 'checkbox', prompt: '', choices: [''], selection: [] }],
    });
  }

  function deleteField(index) {
    return () => {
      setFormData((prevFormData) => {
        const nextFields = [...prevFormData.fields];
        nextFields.splice(index, 1);
        return {
          ...prevFormData,
          fields: nextFields,
        };
      });
    };
  }

  function moveFieldUp(index) {
    return () => {
      if (index === 0) return;
      const curr = formData.fields[index];
      const above = formData.fields[index - 1];
      setFormData((prevFormData) => {
        const nextFields = [...prevFormData.fields];
        nextFields.splice(index - 1, 2, curr, above);
        return {
          ...prevFormData,
          fields: nextFields,
        };
      });
    };
  }

  function moveFieldDown(index) {
    return () => {
      if (index === formData.fields.length - 1) return;
      const curr = formData.fields[index];
      const below = formData.fields[index + 1];
      setFormData((prevFormData) => {
        const nextFields = [...prevFormData.fields];
        nextFields.splice(index, 2, below, curr);
        return {
          ...prevFormData,
          fields: nextFields,
        };
      });
    };
  }

  function replaceField(index) {
    const oldField = formData.fields[index];
    return (type) => {
      let newField;
      switch (type) {
        case 'text':
          newField = { type: 'text', prompt: oldField.prompt, value: '' };
          break;
        case 'radio':
          newField = { type: 'radio', prompt: oldField.prompt, choices: [''], selection: 0 };
          break;
        case 'checkbox':
          newField = { type: 'checkbox', prompt: oldField.prompt, choices: [''], selection: [] };
          break;
        default:
          return;
      }

      setFormData((prevFormData) => {
        const nextFields = [...prevFormData.fields];
        nextFields.splice(index, 1, newField);
        return {
          ...prevFormData,
          fields: nextFields,
        };
      });
    };
  }

  function onSubmit() {
    const sanitized = sanitize(formData);
    const errors = validate(sanitized);
    if (errors.length > 0) {
      setShowFormErrors(true);
      setFormErrors(errors);
      return;
    }

    onCommit(sanitize(formData));
  }

  return (
    <div className={styles.container}>
      <div className={styles.flexColumn}>
        <div className={styles.formGroup}>
          <label>Service Name</label>
          <input
            type="text"
            placeholder="Service name goes here..."
            required
            value={formData.name}
            onChange={setServiceName}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Service Description</label>
          <textarea
            placeholder="Service description goes here..."
            required
            value={formData.description}
            onChange={setServiceDescription}
          />
        </div>
        <hr className={styles.separator} />
        <label>Form Fields</label>
        {formData.fields.map((field, idx) => (
          <FieldEditor
            key={idx}
            field={field}
            onChange={setFormField(idx)}
            onMoveUp={moveFieldUp(idx)}
            onMoveDown={moveFieldDown(idx)}
            onDelete={deleteField(idx)}
            onReplace={replaceField(idx)}
          />
        ))}
        <div className={styles.buttonGroup}>
          <button onClick={createTextField}>Create Text Field</button>
          <button onClick={createRadioField}>Create Radio Field</button>
          <button onClick={createCheckboxField}>Create Checkbox Field</button>
        </div>
        <hr className={styles.separator} />
        <div className={styles.buttonGroup}>
          <Link to={`/${userID}/services/`}>
            <button>Back to Services</button>
          </Link>
          <button onClick={onSubmit}>Create Service</button>
        </div>
      </div>
      {showFormErrors && (
        <div className={styles.dialog}>
          <h2>Error</h2>
          <p>The service form has the following errors. Please fix them.</p>
          <ul>
            {formErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <button onClick={() => setShowFormErrors(false)}>OK</button>
        </div>
      )}
    </div>
  );
}

export default ServiceFormEditor;
