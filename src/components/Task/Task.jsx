import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserServiceById } from '../../services/apiServices';
import styles from './Task.module.css';

const statusToBadge = {
  pending: 'gray',
  accepted: 'blue',
  inProgress: 'gold',
  done: 'green',
  rejected: 'red',
};

function Task({ task }) {
  const [service, setService] = useState({});
  const [client, setClient] = useState({});

  useEffect(() => {
    const runner = async () => {
      const service = await getUserServiceById(task.serviceID);
      const client = await getUserServiceById(Number(task.client));
      setService(service);
      setClient(client);
    };
    runner();
  }, [task]);

  return (
    <div className={styles.card}>
      <div className={styles.flex}>
        <div className={styles.flexColumn}>
          <span className={styles.textLarge}>{service.name}</span>
          <span className={styles.textSmall}>{client.name}</span>
        </div>
        <span className={`${styles.textSmall} ${styles.badge} ${styles[statusToBadge[task.status]]}`}>
          {task.status}
        </span>
      </div>
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    serviceID: PropTypes.number.isRequired,
    client: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default Task;
