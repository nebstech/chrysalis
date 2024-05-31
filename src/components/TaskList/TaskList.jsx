import React from 'react';
import TaskCard from '../TaskCard/TaskCard';
import styles from './TaskList.module.css';

const TaskList = ({ tasks, service, onTaskStatusChange, onTaskDelete }) => {
  const handleTaskStatusChange = (idx) => (status) => {
    onTaskStatusChange(tasks[idx], status);
  };

  const handleTaskDelete = (idx) => () => {
    onTaskDelete(tasks[idx]);
  };

  return (
    <div className={styles.taskList}>
      {tasks.map((task, idx) => (
        <TaskCard
          key={idx}
          task={task}
          service={service}
          onStatusChange={handleTaskStatusChange(idx)}
          onDelete={handleTaskDelete(idx)}
        />
      ))}
    </div>
  );
};

export default TaskList;
