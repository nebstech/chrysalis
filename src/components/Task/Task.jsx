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
  const [service, setService] = useState(null);
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const runner = async () => {
      try {
        console.log('Fetching service with ID:', task.serviceID);
        const service = await getUserServiceById(task.serviceID);
        console.log('Service data:', service);
        setService(service);
      } catch (error) {
        console.error('Error fetching service:', error);
        setError('Service not found');
      }

      try {
        console.log('Fetching client with ID:', task.client);
        const client = await getUserServiceById(Number(task.client));
        console.log('Client data:', client);
        setClient(client);
      } catch (error) {
        console.error('Error fetching client:', error);
        setError('Client not found');
      }
    };
    runner();
  }, [task]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!service || !client) {
    return <div>Loading...</div>;
  }

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
    client: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default Task;
