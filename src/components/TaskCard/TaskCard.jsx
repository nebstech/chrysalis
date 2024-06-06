import React, { useState } from 'react';
import styles from './TaskCard.module.css';
import { Cross1Icon } from '@radix-ui/react-icons'; // You can replace this with another icon library if you want
import SetTaskStatusDropDown from './SetTaskStatusDropDown'
import TaskDetail from '../TaskDetail/TaskDetail';

const TaskCard = ({ task, service, onStatusChange, onDelete }) => {
  const [dialogActive, setDialogActive] = useState(false);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.grid}>
          <div className={styles.iconButtonContainer}>
            <button className={styles.iconButton} onClick={onDelete}>
              <Cross1Icon />
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.header}>
              <h4 className={styles.heading}>Client Name</h4>
              <button className={styles.button} onClick={() => setDialogActive(true)}>
                Details
              </button>
            </div>
            <SetTaskStatusDropDown status={task.status} onSelect={onStatusChange} />
          </div>
        </div>
      </div>
      {dialogActive && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogContent}>
            <div className={styles.dialogHeader}>
              <SetTaskStatusDropDown status={task.status} onSelect={onStatusChange} />
              <button className={styles.button} onClick={onDelete}>Delete Task</button>
            </div>
            <TaskDetail
              task={task}
              service={service}
              clientName={"Client Name"}
              changeTaskStatus={onStatusChange}
              deleteTask={onDelete}
            />
            <button className={styles.button} onClick={() => setDialogActive(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
