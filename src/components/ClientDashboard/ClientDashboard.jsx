import React from 'react';
import Task from '../Task/Task';
import styles from './ClientDashboard.module.css';

const ClientDashboard = ({ tasks }) => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.card}>
        <h2 className={styles.title}>Outbound Tasks and Status</h2>
      </div>
      {tasks.length > 0 && (
        <div className={styles.taskList}>
          {tasks.map((task) => (
            <Task key={task.taskID} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
