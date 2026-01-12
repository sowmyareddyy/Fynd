import React from 'react';
import BottomNav from './BottomNav';

const Home = ({ onNavigate }) => {
  const services = [
    { icon: '🔧', label: 'Plumber' },
    { icon: '⚡', label: 'Electrician' },
    { icon: '🎨', label: 'Painter' },
    { icon: '🧹', label: 'Cleaner' },
    { icon: '🔨', label: 'Carpenter' },
    { icon: '❄️', label: 'AC Repair' },
    { icon: '🪴', label: 'Gardener' },
    { icon: '🧰', label: 'Handyman' }
  ];

  const popularServices = [
    {
      icon: '🔧',
      title: 'Emergency Plumbing',
      rating: 4.8,
      meta: 'Available now',
      price: '$49'
    },
    {
      icon: '🧹',
      title: 'Deep Cleaning',
      rating: 4.9,
      meta: '2-4 hours',
      price: '$89'
    }
  ];

  return (
    <div className="screen active">
      <div className="home-header">
        <div className="logo-small">Fynd</div>
        <div className="profile-btn">👤</div>
      </div>
      
      <div className="greeting">
        <div className="greeting-text">Hi, Sarah! 👋</div>
        <div className="greeting-subtext">What service do you need today?</div>
      </div>
      
      <div className="floating-search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for services..."
          onClick={() => onNavigate('results')}
        />
        <span className="search-icon">🔍</span>
      </div>
      
      <div className="section-title">Popular Services</div>
      
      <div className="services-grid">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="service-card"
            onClick={() => onNavigate('results')}
          >
            <div className="service-icon">{service.icon}</div>
            <div className="service-label">{service.label}</div>
          </div>
        ))}
      </div>
      
      <div className="section-title">Recommended for You</div>
      
      <div className="popular-services">
        {popularServices.map((service, idx) => (
          <div
            key={idx}
            className="popular-card"
            onClick={() => onNavigate('results')}
          >
            <div className="popular-icon">{service.icon}</div>
            <div className="popular-content">
              <div className="popular-title">{service.title}</div>
              <div className="popular-meta">
                <div className="rating">⭐ {service.rating}</div>
                <div>•</div>
                <div>{service.meta}</div>
              </div>
            </div>
            <div className="popular-price">{service.price}</div>
          </div>
        ))}
      </div>
      
      <BottomNav active="home" />
    </div>
  );
};

export default Home;