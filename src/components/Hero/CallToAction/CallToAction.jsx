import React, { useEffect, useRef, useState } from 'react';
import styles from './CallToAction.module.css';
import { getImageUrl } from '../../../utils';

function CallToAction() {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const rect = textRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top >= 0 && rect.bottom <= windowHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.callToAction}>
      <h2 className={`${styles.title} ${isVisible ? styles.visible : ''}`} ref={textRef}>
        You are a few seconds away from joining Chrysalis, where your freelance journey begins with endless opportunities.
      </h2>
      <div className={styles.logoContainer}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <img src={getImageUrl('hero/logo.jpeg')} alt='Logo' className={styles.logo} />
        <h2 className={styles.logoTitle}>Launch your services today.</h2>
        <p className={styles.logoDesc}>It's completely free to get started.</p>
        <a href="/auth?mode=register" className={styles.ctaLink}>Sign Up Now &gt;</a>
      </div>
    </section>
  );
}

export default CallToAction;
