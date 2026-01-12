import React, { useState } from 'react';
import BottomNav from './BottomNav';

const Results = ({ onNavigate, onSelectProvider }) => {
  const providers = [
    {
      id: 1,
      name: 'John Davis',
      initials: 'JD',
      specialty: 'Master Plumber',
      experience: '12 yrs exp',
      rating: 4.9,
      reviews: 248,
      badges: ['✓ Verified', '🛡️ Insured', '⚡ Fast Response'],
      price: '$59'
    },
    {
      id: 2,
      name: 'Mike Thompson',
      initials: 'MT',
      specialty: 'Licensed Plumber',
      experience: '8 yrs exp',
      rating: 4.7,
      reviews: 156,
      badges: ['✓ Verified', '💯 Same Day'],
      price: '$49'
    },
    {
      id: 3,
      name: 'Sarah Rodriguez',
      initials: 'SR',
      specialty: 'Expert Plumber',
      experience: '15 yrs exp',
      rating: 5.0,
      reviews: 312,
      badges: ['✓ Verified', '🛡️ Insured', '🏆 Top Rated'],
      price: '$69'
    }
  ];

  const handleBooking = (provider) => {
    onSelectProvider(provider);
    onNavigate('booking');
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star">☆</span>);
    }
    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`} className="star">☆</span>);
    }

    return stars;
  };

  return (
    <div className="screen active">
      <div className="results-header">
        <button className="back-btn" onClick={() => onNavigate('home')}>
          ←
        </button>
        <div className="results-title">Plumbers Near You</div>
        <button className="filter-btn">⚙</button>
      </div>
      
      <div className="results-info">
        <div className="results-count">
          Found <strong>12 professionals</strong>
        </div>
        <select className="sort-dropdown">
          <option>Best Match</option>
          <option>Rating</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>
      
      <div className="provider-list">
        {providers.map((provider) => (
          <div key={provider.id} className="provider-card" onClick={() => handleBooking(provider)}>
            <div className="provider-header">
              <div className="provider-avatar">{provider.initials}</div>
              <div className="provider-info">
                <div className="provider-name">{provider.name}</div>
                <div className="provider-specialty">
                  {provider.specialty} • {provider.experience}
                </div>
                <div className="provider-rating">
                  <div className="stars">{renderStars(provider.rating)}</div>
                  <span className="reviews-count">({provider.reviews} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="trust-badges">
              {provider.badges.map((badge, idx) => (
                <div key={idx} className="badge">{badge}</div>
              ))}
            </div>
            
            <div className="provider-footer">
              <div>
                <div className="provider-price">{provider.price}</div>
                <div className="provider-price-label">Starting price</div>
              </div>
              <button className="book-btn">Book Now</button>
            </div>
          </div>
        ))}
      </div>
      
      <BottomNav active="home" />
    </div>
  );
};

export default Results;