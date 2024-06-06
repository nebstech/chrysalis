import React, { useState, useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { getImageUrl } from '../../utils';
import { AuthContext } from '../../contexts/AuthContext';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedInUserID, setLoggedInUserID } = useContext(AuthContext);

  const handleLogout = () => {
    setLoggedInUserID(null);
    navigate('/auth');
  };

  const handleLogoClick = () => {
    if (loggedInUserID) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const isHomepage = location.pathname === '/';

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoLink} onClick={handleLogoClick}>
        <img src={getImageUrl('nav/navIcon.jpeg')} alt="Nav Icon" className={styles.navIcon} />
      </div>
      {!isHomepage && (
        <div className={styles.menu}>
          <img
            className={styles.menuBtn}
            src={menuOpen ? getImageUrl('nav/closeIcon.png') : getImageUrl('nav/menuIcon.png')}
            alt="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {location.pathname !== '/auth' && (
            <ul className={`${styles.menuitems} ${menuOpen && styles.menuOpen}`} onClick={() => setMenuOpen(false)}>
              <li><Link to="/dashboard">Home</Link></li>
              <li><Link to={`/profile/${loggedInUserID}`}>Profile</Link></li>
              {loggedInUserID ? (
                <li><Link to="/search">Services</Link></li>
              ) : (
                <li><Link to="#about">About</Link></li>
              )}
            </ul>
          )}
        </div>
      )}
      {location.pathname !== '/auth' && (
        <div className={styles.authButtons}>
          {loggedInUserID ? (
            <button onClick={handleLogout} className={styles.authButtonB}>Logout</button>
          ) : (
            <Link className={styles.authButton} to="/auth?mode=signin">Sign in / sign up</Link>
          )}
        </div>
      )}
    </nav>
  );
};
