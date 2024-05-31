import React from 'react';
import styles from './SetTaskStatusDropdown.module.css';
import { TaskStatuses } from '../../classes/service/service';
import StatusTab from '../StatusTab/StatusTab';

const SetTaskStatusDropdown = ({ status, onSelect }) => {
  return (
    <div className={styles.dropdown}>
      <select value={status} onChange={(e) => onSelect(e.target.value)} className={styles.select}>
        {TaskStatuses.map((type, idx) => (
          <option key={idx} value={type}>
            <StatusTab status={type} />
          </option>
        ))}
      </select>
    </div>
  );
};

export default SetTaskStatusDropdown;
