import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { getAllServices } from '../../services/apiServices';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import styles from './Search.module.css';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Navbar } from '../../components/Navbar/Navbar';


export default function Search() {
  const { loggedInUserID } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const runner = async () => {
      const services = await getAllServices();
      setServices(services);
    };
    runner();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
    <Navbar />
    <div className={styles.flexColumn}>
      <div className={styles.searchField}>
        <input
          type="text"
          placeholder="Search the docs…"
          onInput={handleSearchChange}
          className={styles.input}
        />
        <MagnifyingGlassIcon className={styles.icon} />
      </div>
      <div className={styles.scrollArea}>
        <div className={styles.flexColumn}>
          {services
            .filter((service) => service.user.id !== loggedInUserID)
            .filter((service) =>
              service.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((service, index) => (
              <Link to={`/${service.user.id}/services`} key={index}>
                <ServiceCard service={service} />
              </Link>
            ))}
        </div>
      </div>
    </div>
    </>
  );
}
