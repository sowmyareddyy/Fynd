import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from './ServiceCard';
import '../styles/ServiceListing.css';

const ServiceListing = ({ providers, onProviderClick, searchQuery }) => {
  // Empty state
  if (providers.length === 0) {
    return (
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <motion.div
          className="empty-icon"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          🔍
        </motion.div>
        <h2>No professionals found</h2>
        <p>Try adjusting your search or browse all categories</p>
        <motion.button
          className="reset-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Services
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="service-listing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="listing-header">
        <motion.h1 
          className="listing-title"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Available Professionals
        </motion.h1>
        
        <motion.div 
          className="listing-filters"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <select className="filter-dropdown">
            <option>Sort by: Best Match</option>
            <option>Highest Rated</option>
            <option>Most Reviews</option>
            <option>Lowest Price</option>
            <option>Highest Price</option>
            <option>Most Experience</option>
          </select>

          <motion.button 
            className="view-toggle"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="toggle-icon">⊞</span>
            Grid View
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        className="provider-grid"
        layout
      >
        <AnimatePresence mode="popLayout">
          {providers.map((provider, index) => (
            <ServiceCard
              key={provider.id}
              provider={provider}
              index={index}
              onClick={onProviderClick}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load more if needed */}
      {providers.length > 6 && (
        <motion.div
          className="load-more-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="load-more-btn"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 8px 24px rgba(14, 165, 233, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Load More Professionals</span>
            <motion.span
              className="load-icon"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              ↻
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ServiceListing;