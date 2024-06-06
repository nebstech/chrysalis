import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getUserInfo } from '../../services/apiServices';
import ServiceSelect from '../../components/ServiceSelect/ServiceSelect';
import styles from './Profile.module.css';
import { Navbar } from '../../components/Navbar/Navbar';

export default function Profile() {
  const { loggedInUserID } = useContext(AuthContext);
  const { userID } = useParams();
  const [userServices, setUserServices] = useState([]);
  const [userInfo, setUserInfo] = useState({ userID: 0, user: '', profile: { location: '' }, services: [] });

  useEffect(() => {
    console.log("User ID from params:", userID);
    if (userID && !Number.isNaN(Number(userID))) {
      getUserInfo(Number(userID)).then((userInfo) => {
        setUserInfo(userInfo);
        setUserServices(userInfo.services);
      }).catch(error => {
        console.error("Error fetching user info:", error);
      });
    } else {
      console.error("Invalid user ID:", userID);
    }
  }, [userID]);

  if (!userID || Number.isNaN(Number(userID))) {
    return <p className={styles.errorText}>Invalid user ID.</p>;
  }

  return (
    <>
    <Navbar />
    <div className={styles.profileContainer}>
      <div className={styles.profileBox}>
        <h2 className={styles.profileTitle}>
          {Number(userID) === loggedInUserID ? "Your Profile" : `Viewing ${userInfo.user}'s profile`}
        </h2>
        <p className={styles.profileDetail}><strong>User ID:</strong> {userInfo.userID}</p>
        <p className={styles.profileDetail}><strong>Location:</strong> {userInfo.profile.location}</p>
        <h3 className={styles.servicesTitle}>Services Created:</h3>
        {userServices.length > 0 ? (
          userServices.map((service) => (
            <ServiceSelect key={service.id} services={[service]} setService={() => {}} />
          ))
        ) : (
          <p className={styles.noServicesText}>No services created.</p>
        )}
      </div>
    </div>
    </>
  );
}
