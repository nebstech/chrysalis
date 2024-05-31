import React, { useContext, useEffect, useState } from 'react';
import ClientDashboard from '../../components/ClientDashboard/ClientDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import { AuthContext } from '../../contexts/AuthContext';
import { getUserInfo } from '../../services/apiServices';
import styles from './Dashboard.module.css';
import { Navbar } from '../../components/Navbar/Navbar';

export default function Dashboard() {
  const context = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [tasksClient, setTasksClient] = useState([]);
  const [tasksCreator, setTasksCreator] = useState([]);
  const [activeTab, setActiveTab] = useState('client');

  useEffect(() => {
    const runner = async () => {
      if (!context) {
        return;
      }
      const { loggedInUserID } = context;
      if (!loggedInUserID) {
        return;
      }

      const data = await getUserInfo(loggedInUserID);
      setUsername(data.user);
      setTasksClient(data.tasks);
      setTasksCreator(data.services.flatMap((s) => s.tasks));
    };
    runner();
  }, [context]);

  return (
    <>
    <Navbar />
    <div className={styles.dashboard}>
      <h2 className={styles.welcomeText}>Welcome, {username}!</h2>
      <div className={styles.tabs}>
        <div className={styles.tabList}>
          <button
            className={`${styles.tabTrigger} ${activeTab === 'client' ? styles.active : ''}`}
            onClick={() => setActiveTab('client')}
          >
            Client
          </button>
          <button
            className={`${styles.tabTrigger} ${activeTab === 'creator' ? styles.active : ''}`}
            onClick={() => setActiveTab('creator')}
          >
            Creator
          </button>
        </div>
        <div className={styles.tabContent}>
          {activeTab === 'client' && <ClientDashboard tasks={tasksClient.filter((task) => task)} />}
          {activeTab === 'creator' && <CreatorDashboard tasks={tasksCreator.filter((task) => task)} />}
        </div>
      </div>
    </div>
    </>
  );
}
