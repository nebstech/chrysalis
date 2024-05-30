import React from 'react';
import styles from './Testimonials.module.css';

function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <h2 className={styles.title}>What Our Users Say</h2>
      <div className={styles.testimonialList}>
        <div className={styles.testimonialItem}>
          <p>"Chrysalis has completely transformed my freelance career. The platform is easy to use and has connected me with amazing clients."</p>
          <h4>John Doe</h4>
        </div>
        <div className={styles.testimonialItem}>
          <p>"I love using Chrysalis! It has made finding freelance work so much easier and more enjoyable."</p>
          <h4>Jane Smith</h4>
        </div>
        <div className={styles.testimonialItem}>
          <p>"The best platform for freelancers, hands down. Chrysalis provides great opportunities and support."</p>
          <h4>Emily Johnson</h4>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
