import React from 'react';
import styles from './CallToAction.module.css';

function CallToAction() {
  return (
    <section className={styles.callToAction}>
      <h2 className={styles.title}>Join Chrysalis Today</h2>
      <p className={styles.description}>Start connecting with clients and growing your freelance career.</p>
      <a href="/auth?mode=register" className={styles.ctaButton}>Sign Up Now</a>
    </section>
  );
}

export default CallToAction;
