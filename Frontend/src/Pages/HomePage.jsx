import React from 'react';
import Banner from '../Components/Home/Banner';
import Hero from '../Components/Home/Hero';
import Features from '../Components/Home/Features';
import Testimonial from '../Components/Home/Testimonial';
import CallToAction from '../Components/Home/CallToAction';
import Footer from '../Components/Home/Footer';

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <Testimonial />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;
