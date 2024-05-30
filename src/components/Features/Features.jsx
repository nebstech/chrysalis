import React from 'react';
import styles from './Features.module.css';

function Features() {
  return (
    <section className={styles.features}>
      <h2 className={styles.title}>Why Choose Chrysalis?</h2>
      <div className={styles.featureList}>
        <div className={styles.featureItem}>
          <h3>For Freelancers</h3>
          <p>
            Chrysalis empowers freelancers by providing a seamless platform to connect with potential clients. Showcase your skills, build a professional profile, and receive personalized job offers. Enjoy the flexibility and freedom to work on projects that match your expertise and interests, while growing your career with Chrysalis.
          </p>
        </div>
        <div className={styles.featureItem}>
          <h3>For Clients</h3>
          <p>
            Chrysalis offers clients a powerful platform to connect with top-tier freelancers. Easily find and hire skilled professionals for your projects. Benefit from detailed freelancer profiles, transparent ratings, and efficient communication tools, ensuring your project is completed to the highest standard. Streamline your hiring process and achieve your business goals with Chrysalis.
          </p>
        </div>
        <div className={styles.featureItem}>
          <h3>Digital Workspace & Tools</h3>
          <p>
            Chrysalis provides a modern and intuitive digital workspace designed to streamline your workflow. Utilize powerful project management tools, efficient communication channels, and secure payment systems to ensure a seamless experience for both freelancers and clients. Stay organized and productive with our all-in-one platform.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
