import React from 'react';
import styles from './Testimonials.module.css';

function Testimonials() {
  const testimonials = [
    {
      quote: "Chrysalis has completely transformed my freelance career. The platform is easy to use and has connected me with amazing clients.",
      name: "John Doe",
    },
    {
      quote: "I love using Chrysalis! It has made finding freelance work so much easier and more enjoyable.",
      name: "Jane Smith",
    },
    {
      quote: "The best platform for freelancers, hands down. Chrysalis provides great opportunities and support.",
      name: "Emily Johnson",
    },
    {
      quote: "Chrysalis helped me find the perfect clients for my skills. It's been a game-changer for my freelance career.",
      name: "Michael Brown",
    },
    {
      quote: "Thanks to Chrysalis, I've been able to expand my client base and take on more projects.",
      name: "Sarah Davis",
    },
    {
      quote: "The interface is user-friendly and the support team is fantastic. Highly recommend Chrysalis for freelancers.",
      name: "Alice Green",
    },
    {
      quote: "I've found more clients and better projects through Chrysalis than any other platform.",
      name: "Chris Lee",
    },
  ];

  return (
    <>
      <div className={styles.curve}></div>
      <section className={styles.testimonials}>
        <h2 className={styles.title}>What Our Users Say</h2>
        <div className={styles.testimonialWrapper}>
          <div className={styles.testimonialList}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialItem}>
                <p>"{testimonial.quote}"</p>
                <h4>{testimonial.name}</h4>
              </div>
            ))}
            {testimonials.map((testimonial, index) => (
              <div key={`duplicate-${index}`} className={styles.testimonialItem}>
                <p>"{testimonial.quote}"</p>
                <h4>{testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;
