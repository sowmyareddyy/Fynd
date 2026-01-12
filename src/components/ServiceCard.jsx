import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ServiceCard.css';

const ServiceCard = ({ provider, index, onClick }) => {
  return (
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ 
        delay: index * 0.05,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(provider)}
      layoutId={`provider-${provider.id}`}
    >
      {/* Availability Badge */}
      <motion.div 
        className={`availability-badge ${provider.availability.includes('Now') ? 'available' : 'busy'}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.05 + 0.2 }}
      >
        <span className="badge-dot"></span>
        {provider.availability}
      </motion.div>

      {/* Avatar Section */}
      <motion.div 
        className="card-avatar"
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="avatar-circle">
          <span className="avatar-emoji">{provider.avatar}</span>
        </div>
        
        {/* Verification Badge */}
        {provider.verified && (
          <motion.div 
            className="verified-badge"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.05 + 0.3 }}
          >
            ✓
          </motion.div>
        )}
      </motion.div>

      {/* Info Section */}
      <div className="card-info">
        <h3 className="provider-name">{provider.name}</h3>
        <p className="provider-service">{provider.service}</p>
        
        <div className="provider-stats">
          <div className="stat-item">
            <span className="stat-icon">⭐</span>
            <span className="stat-value">{provider.rating}</span>
            <span className="stat-label">({provider.reviews})</span>
          </div>
          
          <div className="stat-divider"></div>
          
          <div className="stat-item">
            <span className="stat-icon">💼</span>
            <span className="stat-value">{provider.experience}y</span>
            <span className="stat-label">exp</span>
          </div>
        </div>

        {/* Skills Preview */}
        <div className="skills-preview">
          {provider.skills.slice(0, 3).map((skill, idx) => (
            <motion.span 
              key={idx}
              className="skill-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 + 0.4 + idx * 0.05 }}
            >
              {skill}
            </motion.span>
          ))}
          {provider.skills.length > 3 && (
            <span className="skill-tag more">+{provider.skills.length - 3}</span>
          )}
        </div>

        {/* Footer */}
        <div className="card-footer">
          <div className="price-info">
            <span className="price-label">Starting at</span>
            <span className="price-value">${provider.hourlyRate}/hr</span>
          </div>

          <motion.button
            className="view-profile-btn"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(14, 165, 233, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onClick(provider);
            }}
          >
            View Profile →
          </motion.button>
        </div>
      </div>

      {/* Badges Row */}
      <div className="card-badges">
        {provider.insured && (
          <motion.div 
            className="badge-item"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 + 0.5 }}
          >
            <span className="badge-icon">🛡️</span>
            <span className="badge-text">Insured</span>
          </motion.div>
        )}
        
        <motion.div 
          className="badge-item"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 + 0.55 }}
        >
          <span className="badge-icon">⚡</span>
          <span className="badge-text">{provider.responseTime}</span>
        </motion.div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div 
        className="card-glow"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  );
};

export default ServiceCard;