import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import {
  ServiceCheckboxField,
  ServiceRadioField,
  ServiceTextField,
  sanitize,
  validate,
} from '../../classes/service/formField';
import FieldEditor from './FieldEditor/FieldEditor';
import styles from './ServiceFormEditor.module.css';
import { Navbar } from '../../components/Navbar/Navbar';

export default function ServiceFormEditor({ onCommit }) {
  const { userID } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fields: [],
  });

  const [showFormErrors, setShowFormErrors] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const setServiceName = (evt) => {
    setFormData({
      ...formData,
      name: evt.currentTarget.value,
    });
  };

  const setServiceDescription = (evt) => {
    setFormData({
      ...formData,
      description: evt.currentTarget.value,
    });
  };

  const setFormField = (index) => (field) => {
    setFormData((prevFormData) => {
      const nextFields = [...prevFormData.fields];
      nextFields.splice(index, 1, field);
      return {
        ...prevFormData,
        fields: nextFields,
      };
    });
  };

  const createTextField = () => {
    setFormData({
      ...formData,
      fields: [...formData.fields, new ServiceTextField('')],
    });
  };

  const createRadioField = () => {
    setFormData({
      ...formData,
      fields: [...formData.fields, new ServiceRadioField('', [''])],
    });
  };

  const createCheckboxField = () => {
    setFormData({
      ...formData,
      fields: [...formData.fields, new ServiceCheckboxField('', [''])],
    });
  };

  const deleteField = (index) => () => {
    setFormData((prevFormData) => {
      const nextFields = [...prevFormData.fields];
      nextFields.splice(index, 1);
      return {
        ...prevFormData,
        fields: nextFields,
      };
    });
  };

  const moveFieldUp = (index) => () => {
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

  const moveFieldDown = (index) => () => {
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

  const replaceField = (index) => (type) => {
    const oldField = formData.fields[index];
    let newField;
    switch (type) {
      case 'text':
        newField = new ServiceTextField(oldField.prompt);
        break;
      case 'radio':
        newField = new ServiceRadioField(oldField.prompt, ['']);
        break;
      case 'checkbox':
        newField = new ServiceCheckboxField(oldField.prompt, ['']);
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

  const onSubmit = () => {
    const sanitized = sanitize(formData);
    const errors = validate(sanitized);
    if (errors.length > 0) {
      setShowFormErrors(true);
      setFormErrors(errors);
      return;
    }

    onCommit(sanitize(formData));
  };

  return (
    <>
    <Navbar />
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
    </>
  );
}

ServiceFormEditor.propTypes = {
  onCommit: PropTypes.func.isRequired,
};
