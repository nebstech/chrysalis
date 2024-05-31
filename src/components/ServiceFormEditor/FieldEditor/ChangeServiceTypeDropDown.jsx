import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ServiceField, formFieldTypes } from '../../../classes/service/formField';
import ServiceType from './ServiceType';
import styles from './ChangeServiceTypeDropdown.module.css';

export default function ChangeServiceTypeDropdown({ field, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (type) => {
    onSelect(type);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectContainer}>
      <div 
        className={styles.selectTrigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        {field.type}
      </div>
      {isOpen && (
        <div className={styles.selectContent}>
          {formFieldTypes.map((type, idx) => (
            <div 
              key={idx}
              className={styles.selectItem}
              onClick={() => handleSelect(type)}
            >
              <ServiceType type={type} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ChangeServiceTypeDropdown.propTypes = {
  field: PropTypes.instanceOf(ServiceField).isRequired,
  onSelect: PropTypes.func.isRequired,
};
