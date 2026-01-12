import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Header.css';

const Header = () => {
  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="header-content">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="logo-text">Fynd</span>
          <span className="logo-tagline">Services Made Easy</span>
        </motion.div>

        <nav className="header-nav">
          <motion.button 
            className="nav-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            For Professionals
          </motion.button>
          
          <motion.button 
            className="nav-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Help
          </motion.button>

          <motion.button 
            className="nav-button primary"
            whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(14, 165, 233, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;