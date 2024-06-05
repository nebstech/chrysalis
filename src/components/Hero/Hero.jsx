import React, { useEffect, useState } from 'react';
import styles from './Hero.module.css';
import { getImageUrl } from '../../utils.js';

function Hero() {
  const images = [
    getImageUrl('hero/hero1.jpg'),
    getImageUrl('hero/hero2.jpg'),
    getImageUrl('hero/hero3.jpg')
  ];

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => (prevOffset + 100) % (images.length * 100));
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Empowering Freelancers, Connecting Opportunities</h1>
        <p className={styles.description}>
          Chrysalis is your go-to platform for finding and offering freelance services. Connect with clients, showcase your skills, and grow your career.
        </p>
        <a href="/auth" className={styles.contactBtn}>Get Started</a>
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.slideshow} style={{ transform: `translateX(-${offset}%)` }}>
          {images.concat(images).map((image, index) => (
            <div
              key={index}
              className={styles.heroImg}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
