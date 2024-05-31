import React, { useMemo } from 'react';
import styles from './ServiceCard.module.css';
import { Service, Task } from '../../classes/service/service';

const taskColors = {
  pending: 'gray',
  accepted: 'blue',
  rejected: 'red',
  inProgress: 'yellow',
  done: 'green',
};

export default function ServiceCard({ service }) {
  const sortedTasks = useMemo(() => {
    const sorted = {
      pending: [],
      accepted: [],
      inProgress: [],
      done: [],
      rejected: [],
    };
    for (const task of service.tasks) {
      sorted[task.status].push(task);
    }
    return sorted;
  }, [service.tasks]);

  const taskCounts = useMemo(() => {
    const res = [];
    for (const tag of ['pending', 'accepted', 'inProgress', 'done', 'rejected']) {
      if (sortedTasks[tag].length > 0) {
        res.push({
          type: tag,
          count: sortedTasks[tag].length,
        });
      }
    }
    return res;
  }, [sortedTasks]);

  return (
    <div className={styles.card}>
      <div className={styles.flexColumn}>
        <h3 className={styles.heading}>{service.name}</h3>
        <div className={styles.inset}>
          <div className={styles.flexRow}>
            {taskCounts.map((taskCount, idx) => (
              <div
                key={idx}
                className={styles.taskCount}
                style={{ backgroundColor: taskColors[taskCount.type] }}
              >
                {taskCount.count}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
