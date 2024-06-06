import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { getUserInfo } from '../../services/apiServices';
import ServiceSelect from '../ServiceSelect/ServiceSelect';
import Task from '../Task/Task';
import styles from './CreatorDashboard.module.css';

const CreatorDashboard = () => {
  const { loggedInUserID, isLoggedIn } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState(null);
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (loggedInUserID === null || !isLoggedIn) return;

      try {
        const userData = await getUserInfo(loggedInUserID);
        setServices(userData.services);
        setTasks(userData.tasks);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/auth?mode=signin');
      }
    };

    fetchData();
  }, [loggedInUserID, isLoggedIn, navigate]);

  const userServiceIds = services.map(service => service.id);

  const filteredPendingTasks = tasks.filter(task => 
    userServiceIds.includes(task.serviceID) &&
    (task.status === 'pending' || task.status === 'rejected')
  );

  const filteredAcceptedTasks = tasks.filter(task => 
    userServiceIds.includes(task.serviceID) &&
    task.status !== 'pending' && task.status !== 'rejected'
  );

  if (!tasks.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Your Requests and Task Statuses</h2>
      <Link to={`/${loggedInUserID}/services/create`}>
        <button>Create New Service</button>
      </Link>
      <ServiceSelect services={services} setService={setCurrentService} />

      {filteredPendingTasks.length > 0 && (
        <div>
          <h3>Pending Tasks</h3>
          {filteredPendingTasks
            .filter(task => currentService === null || task.serviceID === services[currentService]?.id)
            .map(task => (
              <Task key={task.taskID} task={task} />
            ))}
        </div>
      )}

      {filteredAcceptedTasks.length > 0 && (
        <div>
          <h3>Accepted Tasks</h3>
          {filteredAcceptedTasks
            .filter(task => currentService === null || task.serviceID === services[currentService]?.id)
            .map(task => (
              <Link to={`/${loggedInUserID}/tasks/${task.taskID}`} key={task.taskID}>
                <Task task={task} />
              </Link>
            ))}
        </div>
      )}

      <Link to={`/${loggedInUserID}/services`}>
        <button>View Your Services</button>
      </Link>
    </div>
  );
};

export default CreatorDashboard;
