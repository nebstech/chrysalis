import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';
import Testimonials from '../../components/Testimonials/Testimonials';
import CallToAction from '../../components/CallToAction/CallToAction';

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
    </>
  );
}

export default LandingPage;
