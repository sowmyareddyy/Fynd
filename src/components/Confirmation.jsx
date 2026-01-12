import React, { useEffect, useState } from 'react';

const Confirmation = ({ onNavigate, provider }) => {
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    // Create sparks animation
    const newSparks = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const distance = 100 + Math.random() * 50;
      newSparks.push({
        id: i,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        delay: i * 0.05
      });
    }
    setSparks(newSparks);
  }, []);

  return (
    <div className="screen confirmation-screen active">
      <div className="success-animation">
        <div className="checkmark-circle">
          <div className="checkmark">✓</div>
        </div>
        <div className="sparks">
          {sparks.map((spark) => (
            <div
              key={spark.id}
              className="spark"
              style={{
                '--tx': `${spark.tx}px`,
                '--ty': `${spark.ty}px`,
                top: '50%',
                left: '50%',
                animationDelay: `${spark.delay}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="confirmation-title">Booking Confirmed!</div>
      <div className="confirmation-message">
        Your service has been booked successfully.<br />
        {provider?.name || 'John'} will arrive on Jan 11 at 11:00 AM.
      </div>
      
      <div className="booking-details-card">
        <div className="detail-row">
          <span className="detail-label">Booking ID</span>
          <span className="detail-value">#FYN-2845</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Service</span>
          <span className="detail-value">Plumbing Repair</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Provider</span>
          <span className="detail-value">{provider?.name || 'John Davis'} ⭐ {provider?.rating || '4.9'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Date & Time</span>
          <span className="detail-value">Jan 11, 2026 • 11:00 AM</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Location</span>
          <span className="detail-value">123 Main St, Apt 4B</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Total Paid</span>
          <span className="detail-value" style={{ color: '#0EA5E9', fontSize: '18px' }}>
            $64.00
          </span>
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="primary-action" onClick={() => onNavigate('home')}>
          Back to Home
        </button>
        <button className="secondary-action">View Booking Details</button>
      </div>
    </div>
  );
};

export default Confirmation;