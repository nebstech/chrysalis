
import styles from './Hero.module.css';
import { getImageUrl } from '../../utils.js';

function Hero() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Empowering Freelancers, Connecting Opportunities</h1>
        <p className={styles.description}>
          Chrysalis is your go-to platform for finding and offering freelance services. Connect with clients, showcase your skills, and grow your career.
        </p>
        <a href="/register" className={styles.contactBtn}>Get Started</a>
      </div>
      <img src={getImageUrl('hero/hero.jpg')} alt="hero image" className={styles.heroImg} />
      
    </section>
  );
}

export default Hero;
