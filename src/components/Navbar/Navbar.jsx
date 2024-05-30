import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { getImageUrl } from '../../utils';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="/">Chrysalis</a>
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={menuOpen ? getImageUrl('nav/closeIcon.png') : getImageUrl('nav/menuIcon.png')}
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {location.pathname !== '/auth' && (
          <ul className={`${styles.menuitems} ${menuOpen && styles.menuOpen}`} onClick={() => setMenuOpen(false)}>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        )}
      </div>
      {location.pathname !== '/auth' && (
        <div className={styles.authButtons}>
          <a className={styles.authButton} href="/auth?mode=signin">Sign In</a>
          <a className={styles.authButtonB} href="/auth?mode=register">Register</a>
        </div>
      )}
    </nav>
  );
};
