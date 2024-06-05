import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { getUserServices } from '../../services/apiServices';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './UserServices.module.css';

export default function UserServices() {
  const { userID } = useParams();
  const { loggedInUserID } = useContext(AuthContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const runner = async () => {
      const services = await getUserServices(Number(userID));
      setServices(services);
    };
    runner();
  }, [userID]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Services</h2>
      {userID !== null && Number(userID) === loggedInUserID && (
        <Link to={`/${userID}/services/create`}>
          <button className={styles.button}>Create Service</button>
        </Link>
      )}
      <div className={styles.grid}>
        {services?.map((service, idx) => (
          <Link key={idx} to={`/${userID}/services/${service.id}`}>
            <ServiceCard service={service} />
          </Link>
        ))}
      </div>
    </div>
  );
}
