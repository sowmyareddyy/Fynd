import React from 'react';

const BottomNav = ({ active }) => {
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'bookings', icon: '📅', label: 'Bookings' },
    { id: 'messages', icon: '💬', label: 'Messages' },
    { id: 'profile', icon: '👤', label: 'Profile' }
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`nav-item ${active === item.id ? 'active' : ''}`}
        >
          <div className="nav-icon">{item.icon}</div>
          <div className="nav-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;