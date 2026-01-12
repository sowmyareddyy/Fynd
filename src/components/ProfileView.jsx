import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/ProfileView.css';

const ProfileView = ({ provider, onBack, onBookNow }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <motion.div
      className="profile-view"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      {/* Back Button */}
      <motion.button
        className="back-button"
        onClick={onBack}
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="back-icon">←</span>
        Back to Search
      </motion.button>

      {/* Hero Section */}
      <motion.div 
        className="profile-hero"
        layoutId={`provider-${provider.id}`}
      >
        <div className="hero-background">
          <motion.div
            className="hero-gradient"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="hero-content">
          <motion.div 
            className="hero-avatar"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="avatar-large">
              <span className="avatar-emoji-large">{provider.avatar}</span>
            </div>
            {provider.verified && (
              <motion.div 
                className="verified-badge-large"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4 }}
              >
                ✓ Verified
              </motion.div>
            )}
          </motion.div>

          <motion.div 
            className="hero-info"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="profile-name">{provider.name}</h1>
            <p className="profile-service">{provider.service} • {provider.location}</p>
            
            <div className="profile-stats-row">
              <div className="stat-large">
                <span className="stat-icon-large">⭐</span>
                <div>
                  <div className="stat-value-large">{provider.rating}</div>
                  <div className="stat-label-large">{provider.reviews} reviews</div>
                </div>
              </div>

              <div className="stat-large">
                <span className="stat-icon-large">💼</span>
                <div>
                  <div className="stat-value-large">{provider.experience} years</div>
                  <div className="stat-label-large">Experience</div>
                </div>
              </div>

              <div className="stat-large">
                <span className="stat-icon-large">✅</span>
                <div>
                  <div className="stat-value-large">{provider.completedJobs}</div>
                  <div className="stat-label-large">Jobs Completed</div>
                </div>
              </div>
            </div>

            <div className="profile-badges-row">
              {provider.insured && (
                <motion.div 
                  className="profile-badge"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="badge-icon">🛡️</span>
                  <span>Insured</span>
                </motion.div>
              )}
              <motion.div 
                className="profile-badge"
                whileHover={{ scale: 1.05 }}
              >
                <span className="badge-icon">⚡</span>
                <span>Responds in {provider.responseTime}</span>
              </motion.div>
              <motion.div 
                className={`profile-badge ${provider.availability.includes('Now') ? 'available' : ''}`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="badge-dot"></span>
                <span>{provider.availability}</span>
              </motion.div>
            </div>

            <motion.button
              className="book-now-btn-hero"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 12px 32px rgba(14, 165, 233, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onBookNow(provider)}
            >
              <span className="btn-text">Book Now</span>
              <span className="btn-price">${provider.hourlyRate}/hr</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Tabs Navigation */}
      <motion.div 
        className="profile-tabs"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {['overview', 'reviews', 'portfolio'].map((tab) => (
          <motion.button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div 
                className="tab-indicator"
                layoutId="activeTab"
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <div className="profile-content">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="overview-tab"
          >
            <section className="content-section">
              <h2 className="section-title">About</h2>
              <p className="section-text">{provider.description}</p>
            </section>

            <section className="content-section">
              <h2 className="section-title">Skills & Expertise</h2>
              <div className="skills-grid">
                {provider.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="skill-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className="skill-check">✓</span>
                    <span className="skill-name">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="content-section">
              <h2 className="section-title">Pricing</h2>
              <div className="pricing-card">
                <div className="pricing-row">
                  <span className="pricing-label">Hourly Rate</span>
                  <span className="pricing-value">${provider.hourlyRate}/hour</span>
                </div>
                <div className="pricing-row">
                  <span className="pricing-label">Minimum Charge</span>
                  <span className="pricing-value">${provider.hourlyRate * 2} (2 hours)</span>
                </div>
                <div className="pricing-row">
                  <span className="pricing-label">Emergency Service</span>
                  <span className="pricing-value">${Math.round(provider.hourlyRate * 1.5)}/hour</span>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'reviews' && (
          <motion.div
            key="reviews"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="reviews-tab"
          >
            <div className="reviews-header">
              <div className="reviews-summary">
                <div className="rating-large-display">
                  <span className="rating-number">{provider.rating}</span>
                  <div className="rating-stars">
                    {'★'.repeat(Math.floor(provider.rating))}{'☆'.repeat(5 - Math.floor(provider.rating))}
                  </div>
                  <span className="rating-count">{provider.reviews} reviews</span>
                </div>
              </div>
            </div>

            <div className="reviews-list">
              {provider.testimonials.map((review, index) => (
                <motion.div
                  key={review.id}
                  className="review-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="review-header">
                    <div className="review-author">
                      <div className="author-avatar">{review.name.charAt(0)}</div>
                      <div>
                        <div className="author-name">{review.name}</div>
                        <div className="review-date">{review.date}</div>
                      </div>
                    </div>
                    <div className="review-rating">
                      {'★'.repeat(review.rating)}
                    </div>
                  </div>
                  <p className="review-text">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'portfolio' && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="portfolio-tab"
          >
            <div className="portfolio-grid">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <motion.div
                  key={item}
                  className="portfolio-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="portfolio-placeholder">
                    <span className="portfolio-icon">📸</span>
                    <span className="portfolio-label">Project {item}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Sticky Bottom CTA */}
      <motion.div 
        className="sticky-cta"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="cta-content">
          <div className="cta-info">
            <span className="cta-label">Starting at</span>
            <span className="cta-price">${provider.hourlyRate}/hour</span>
          </div>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBookNow(provider)}
          >
            Book {provider.name.split(' ')[0]} Now →
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileView;