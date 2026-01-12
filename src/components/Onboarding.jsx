import React, { useState, useEffect } from 'react';

const Onboarding = ({ onStart }) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev === 3 ? 1 : prev + 1));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="screen onboarding active">
      <div className="onboarding-logo">Fynd</div>
      <div className="onboarding-tagline">Home services made easy</div>
      
      <div className="onboarding-animation">
        {/* Step 1: Search Bar */}
        <div className={`morph-step ${currentStep === 1 ? 'active' : ''}`}>
          <div className="search-morph">
            <span>🔍</span>
            <span style={{ marginLeft: '12px', color: '#9CA3AF', fontSize: '15px' }}>
              Search for services...
            </span>
          </div>
        </div>
        
        {/* Step 2: Service Cards */}
        <div className={`morph-step ${currentStep === 2 ? 'active' : ''}`}>
          <div className="service-cards-morph">
            {[
              { icon: '🔧', label: 'Plumber' },
              { icon: '⚡', label: 'Electrician' },
              { icon: '🎨', label: 'Painter' },
              { icon: '🧹', label: 'Cleaner' }
            ].map((service, idx) => (
              <div key={idx} className="morph-card">
                <div className="morph-icon">{service.icon}</div>
                <div className="morph-label">{service.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Step 3: Booking Confirmation */}
        <div className={`morph-step ${currentStep === 3 ? 'active' : ''}`}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '28px',
            textAlign: 'center',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.16)'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>✓</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#1A1D29', marginBottom: '8px' }}>
              Booked!
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>Service confirmed</div>
          </div>
        </div>
      </div>
      
      <button className="get-started-btn" onClick={onStart}>
        Get Started
      </button>
    </div>
  );
};

export default Onboarding;