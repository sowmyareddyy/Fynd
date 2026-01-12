import React, { useState, useEffect } from 'react';
import BottomNav from './BottomNav';

const Booking = ({ onNavigate, provider }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [formData, setFormData] = useState({
    issue: 'Leaking kitchen faucet',
    address: '123 Main Street, Apt 4B',
    notes: '',
    date: '2026-01-11'
  });

  const timeSlots = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'];

  useEffect(() => {
    // Animate through steps
    const timer1 = setTimeout(() => setCurrentStep(1), 100);
    const timer2 = setTimeout(() => setCurrentStep(2), 2000);
    const timer3 = setTimeout(() => setCurrentStep(3), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleConfirm = () => {
    onNavigate('confirmation');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="screen active">
      <div className="progress-container">
        <div className="stepper">
          {[1, 2, 3].map((step) => (
            <div key={step} className={`step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
              <div className="step-circle">{step}</div>
              {step < 3 && <div className="step-line"></div>}
              <div className="step-label">
                {step === 1 ? 'Details' : step === 2 ? 'Schedule' : 'Confirm'}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="booking-content">
        <div className="booking-section">
          <div className="section-header">Service Details</div>
          
          <div className="form-group">
            <label className="form-label">What's the issue?</label>
            <input
              type="text"
              name="issue"
              className="form-input"
              placeholder="e.g., Leaking faucet, clogged drain..."
              value={formData.issue}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Your Address</label>
            <input
              type="text"
              name="address"
              className="form-input"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Additional Notes (Optional)</label>
            <input
              type="text"
              name="notes"
              className="form-input"
              placeholder="Any special instructions..."
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="booking-section">
          <div className="section-header">Select Date & Time</div>
          
          <div className="form-group">
            <label className="form-label">Preferred Date</label>
            <input
              type="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Available Time Slots</label>
            <div className="time-slots">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="booking-section">
          <div className="section-header">Booking Summary</div>
          
          <div className="booking-summary">
            <div className="summary-row">
              <span className="summary-label">Service</span>
              <span className="summary-value">Plumbing Repair</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Provider</span>
              <span className="summary-value">{provider?.name || 'John Davis'}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Date & Time</span>
              <span className="summary-value">Jan 11, {selectedTime}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Service Fee</span>
              <span className="summary-value">{provider?.price || '$59.00'}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Platform Fee</span>
              <span className="summary-value">$5.00</span>
            </div>
            <div className="summary-row summary-total">
              <span className="summary-label">Total</span>
              <span className="summary-value">$64.00</span>
            </div>
          </div>
        </div>
        
        <button className="confirm-booking-btn" onClick={handleConfirm}>
          Confirm Booking
        </button>
      </div>
      
      <BottomNav active="bookings" />
    </div>
  );
};

export default Booking;