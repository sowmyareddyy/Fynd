import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>
            Find trusted <span>home services</span> near you
          </h1>
          <p>
            Book plumbers, electricians, cleaners, and more — fast, reliable, and verified.
          </p>

          <div className="hero-actions">
            <a href="/services" className="primary-btn">
              Book a Service
            </a>
            <a href="#how-it-works" className="secondary-btn">
              How it works
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default LandingPage;
