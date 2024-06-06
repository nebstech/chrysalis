import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Hero/Features/Features';
import Testimonials from '../../components/Hero/Testimonials/Testimonials';
import CallToAction from '../../components/Hero/CallToAction/CallToAction';


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
