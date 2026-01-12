import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/SearchBar.css';

const SearchBar = ({ searchQuery, onSearchChange, resultsCount }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      className="search-container"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div 
        className={`search-bar ${isFocused ? 'focused' : ''}`}
        animate={{
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused 
            ? '0 12px 40px rgba(14, 165, 233, 0.15)' 
            : '0 4px 16px rgba(0, 0, 0, 0.08)'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <motion.div 
          className="search-icon"
          animate={{ 
            rotate: isFocused ? 90 : 0,
            scale: isFocused ? 1.1 : 1 
          }}
        >
          🔍
        </motion.div>
        
        <input
          type="text"
          className="search-input"
          placeholder="Search for services, professionals, or skills..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <AnimatePresence>
          {searchQuery && (
            <motion.button
              className="clear-button"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSearchChange('')}
            >
              ✕
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {searchQuery && (
          <motion.div
            className="search-results-info"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span className="results-count">
              {resultsCount} {resultsCount === 1 ? 'result' : 'results'} found
            </span>
            {searchQuery && (
              <span className="search-term">
                for "<strong>{searchQuery}</strong>"
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search suggestions/tips */}
      <AnimatePresence>
        {isFocused && !searchQuery && (
          <motion.div
            className="search-suggestions"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="suggestion-title">Popular searches:</div>
            <div className="suggestion-tags">
              {['Emergency plumber', 'House cleaning', 'Electrician near me', 'Interior painting'].map((tag, index) => (
                <motion.button
                  key={tag}
                  className="suggestion-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(14, 165, 233, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSearchChange(tag)}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchBar;