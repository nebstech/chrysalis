import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextFormField.module.css';
import { ServiceTextField, ServiceField } from '../../../classes/service/formField';

export default function TextFormField({ field, onChange }) {
  const handleChange = (e) => {
    const newField = { ...field, value: e.target.value };
    onChange(newField);
  };

  return (
    <div className={styles.box}>
      <input
        type="text"
        value={field.value}
        onChange={handleChange}
        className={styles.input}
        placeholder="Enter text"
      />
    </div>
  );
}

TextFormField.propTypes = {
  field: PropTypes.instanceOf(ServiceTextField).isRequired,
  onChange: PropTypes.func.isRequired,
};
