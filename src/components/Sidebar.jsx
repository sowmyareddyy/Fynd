import React from 'react';
import { motion } from 'framer-motion';
import { serviceCategories } from '../data/mockData';
import '../styles/Sidebar.css';

const Sidebar = ({ selectedCategory, onCategoryChange }) => {
  return (
    <motion.aside 
      className="sidebar"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
    >
      <div className="sidebar-content">
        <h2 className="sidebar-title">Categories</h2>
        
        <div className="category-list">
          {serviceCategories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ 
                x: 10,
                backgroundColor: 'rgba(14, 165, 233, 0.05)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              <span className="category-count">{category.count}</span>
            </motion.button>
          ))}
        </div>

        <div className="sidebar-footer">
          <motion.div 
            className="help-card"
            whileHover={{ y: -5, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="help-icon">💡</div>
            <h3>Need Help?</h3>
            <p>Contact our support team for assistance</p>
            <motion.button 
              className="help-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Support
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;