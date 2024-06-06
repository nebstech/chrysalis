import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getUserInfo, updateUserInfo } from '../../services/apiServices';
import styles from './Profile.module.css';
import { Navbar } from '../../components/Navbar/Navbar';

export default function Profile() {
  const { loggedInUserID } = useContext(AuthContext);
  const { userID } = useParams();
  const [userServices, setUserServices] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    username: '',
    email: '',
    bio: '',
    location: '',
    birth_date: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    ("User ID from params:", userID);
    if (userID && !Number.isNaN(Number(userID))) {
      getUserInfo(Number(userID))
        .then((userInfo) => {
          setUserInfo(userInfo);
          setUserServices(userInfo.services);
          setForm({
            username: userInfo.user,
            email: '',  // email is not provided in the logged data
            bio: userInfo.profile?.bio || '',
            location: userInfo.profile?.location || '',
            birth_date: userInfo.profile?.birth_date || ''
          });
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching user info:", error);
          setLoading(false);
        });
    } else {
      console.error("Invalid user ID:", userID);
      setLoading(false);
    }
  }, [userID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const updatedFields = {};
      for (const key in form) {
        if (form[key] !== userInfo[key] && key !== 'bio' && key !== 'location' && key !== 'birth_date') {
          updatedFields[key] = form[key];
        }
      }
      const profileFields = {};
      ['bio', 'location', 'birth_date'].forEach((key) => {
        if (form[key] !== userInfo.profile?.[key]) {
          profileFields[key] = form[key];
        }
      });
      if (Object.keys(profileFields).length > 0) {
        updatedFields.profile = profileFields;
      }

      await updateUserInfo(userID, updatedFields);
      alert('Profile updated successfully!');
      setIsEditing(false);
      // Refresh user info
      getUserInfo(Number(userID)).then((userInfo) => {
        ("Refetched user info:", userInfo);
        setUserInfo(userInfo);
        setUserServices(userInfo.services);
        setForm({
          username: userInfo.user,
          email: '',  // email is not provided in the logged data
          bio: userInfo.profile?.bio || '',
          location: userInfo.profile?.location || '',
          birth_date: userInfo.profile?.birth_date || ''
        });
      }).catch(console.error);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <p className={styles.loadingText}>Loading...</p>;
  }

  if (!userID || Number.isNaN(Number(userID))) {
    return <p className={styles.errorText}>Invalid user ID.</p>;
  }

  return (
    <>
      <Navbar />
      <div className={styles.profileContainer}>
        <div className={styles.profileBox}>
          <h2 className={styles.profileTitle}>
            {Number(userID) === loggedInUserID ? "Your Profile" : `Viewing ${userInfo?.user}'s profile`}
          </h2>
          <div className={styles.profileDetail}><strong>User ID:</strong> {userInfo?.userID}</div>
          <div className={styles.profileDetail}><strong>Username:</strong> {userInfo?.user}</div>
          <div className={styles.profileDetail}><strong>Bio:</strong> {userInfo?.profile?.bio || 'N/A'}</div>
          <div className={styles.profileDetail}><strong>Location:</strong> {userInfo?.profile?.location || 'N/A'}</div>
          <div className={styles.profileDetail}><strong>Birth Date:</strong> {userInfo?.profile?.birth_date || 'N/A'}</div>
          {Number(userID) === loggedInUserID && (
            <>
              <button onClick={() => setIsEditing(true)} className={styles.editButton}>Edit Profile</button>
            </>
          )}
          <h3 className={styles.servicesTitle}>Services Created:</h3>
          {userServices.length > 0 ? (
            userServices.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <h4>{service.name}</h4>
                <p>{service.description}</p>
              </div>
            ))
          ) : (
            <p className={styles.noServicesText}>No services created.</p>
          )}
        </div>
      </div>
      {isEditing && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Profile</h2>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Update your username"
              className={styles.inputField}
            />
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Update your bio"
              className={styles.textareaField}
            />
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Update your location"
              className={styles.inputField}
            />
            <input
              type="date"
              name="birth_date"
              value={form.birth_date}
              onChange={handleChange}
              className={styles.inputField}
            />
            <button onClick={handleUpdate} className={styles.updateButton}>Update Profile</button>
            <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
