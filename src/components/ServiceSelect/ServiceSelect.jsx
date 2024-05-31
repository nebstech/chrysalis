import React from 'react';
import styles from './ServiceSelect.module.css';

const ServiceSelect = ({ services, setService }) => {
  return (
    <select
      defaultValue="Show All"
      onChange={(e) => {
        const value = e.target.value;
        if (value === 'Show All') {
          setService(null);
        } else {
          setService(parseInt(value, 10));
        }
      }}
      className={styles.serviceSelect}
    >
      <option value="Show All">Show All</option>
      {services.map((service, index) => (
        <option key={index} value={index}>
          {service.name}
        </option>
      ))}
    </select>
  );
};

export default ServiceSelect;
