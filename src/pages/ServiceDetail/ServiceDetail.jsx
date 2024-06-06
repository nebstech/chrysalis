import { useNavigate, useParams } from 'react-router';
import { useContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Service, Task, TaskStatus } from '../../classes/service/service';
import TaskList from '../../components/TaskList/TaskList';
import StatusTab from '../../components/StatusTab/StatusTab';
import {
  deleteService,
  deleteTask,
  getUserServiceById,
  updateTaskStatus,
} from '../../services/apiServices';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import TaskComponent from '../../components/Task/Task';
import styles from './ServiceDetail.module.css';

const statuses = ['pending', 'accepted', 'inProgress', 'rejected', 'done'];

export default function ServiceDetail() {
  const { userID, servID } = useParams();
  const { loggedInUserID, isLoggedIn } = useContext(AuthContext);

  const [service, setService] = useState(null);
  const navigate = useNavigate();

  const sortedTasks = useMemo(() => {
    const sorted = {
      pending: [],
      accepted: [],
      inProgress: [],
      done: [],
      rejected: [],
    };

    if (service === null) {
      return sorted;
    }

    for (const task of service.tasks) {
      sorted[task.status].push(task);
    }

    return sorted;
  }, [service]);

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

  const loadService = useCallback(async () => {
    if (servID === undefined) {
      return;
    }
    const service = await getUserServiceById(Number(servID));
    setService(service);
  }, [servID]);

  useEffect(() => {
    loadService();
  }, [loadService]);

  async function handleTaskStatusChange(task, status) {
    await updateTaskStatus(task.taskID, status);
    await loadService();
  }

  async function handleTaskDelete(task) {
    await deleteTask(task.taskID);
    await loadService();
  }

  async function handleServiceDelete() {
    if (userID === null || service === null) {
      return;
    }
    await deleteService(service.id);
    navigate(`/${userID}/services`);
  }

  const isMine = isLoggedIn && loggedInUserID === Number(userID);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{service?.name}</h1>
      {isMine && <button onClick={handleServiceDelete}>Delete Service</button>}
      <Link to={`/${userID}/services/`}>
        <button>Back to Services</button>
      </Link>
      <hr className={styles.separator} />
      <h2 className={styles.subheading}>Tasks</h2>
      <Link to={`/${userID}/services/${servID}/submit-task`}>Submit Task</Link>
      <div className={styles.tabs}>
        <div className={styles.tabList}>
          {statuses
            .filter((status) => {
              if (!isMine) {
                return status !== 'pending' && status !== 'accepted' && status !== 'rejected';
              }
              return status;
            })
            .map((status, idx) => (
              <div key={idx} className={styles.tabTrigger}>
                <StatusTab status={status} />
              </div>
            ))}
        </div>
        {service !== null &&
          statuses
            .filter((status) => {
              if (isMine) {
                return status;
              }
              return status !== 'pending' && status !== 'accepted' && status !== 'rejected';
            })
            .map((tag, idx) => (
              <div key={idx} className={styles.tabContent}>
                {isMine ? (
                  <TaskList
                    tasks={sortedTasks[tag]}
                    service={service}
                    onTaskStatusChange={handleTaskStatusChange}
                    onTaskDelete={handleTaskDelete}
                  />
                ) : (
                  sortedTasks[tag].map((task, idx) => (
                    <TaskComponent
                      key={idx}
                      task={{
                        taskID: 0,
                        serviceID: Number(servID),
                        client: 'N/A',
                        requestFields: [],
                        status: task.status,
                      }}
                    />
                  ))
                )}
              </div>
            ))}
      </div>
    </div>
  );
}
