import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/BookingModal.css';

const BookingModal = ({ provider, onClose, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: '2',
    address: '',
    notes: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const totalSteps = 3;

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onConfirm({ ...bookingData, provider: provider.id });
    }, 2000);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return bookingData.date && bookingData.time;
      case 2:
        return bookingData.address;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const calculateTotal = () => {
    return provider.hourlyRate * parseInt(bookingData.duration);
  };

  return (
    <motion.div
      className="booking-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="booking-modal"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div key="form" className="booking-content">
              {/* Header */}
              <div className="modal-header">
                <div>
                  <h2 className="modal-title">Book {provider.name}</h2>
                  <p className="modal-subtitle">{provider.service} • ${provider.hourlyRate}/hour</p>
                </div>
                <motion.button
                  className="close-button"
                  onClick={onClose}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>

              {/* Progress Bar */}
              <div className="progress-section">
                <div className="progress-steps">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="progress-step-wrapper">
                      <motion.div
                        className={`progress-step ${step >= s ? 'active' : ''} ${step > s ? 'completed' : ''}`}
                        animate={{
                          scale: step === s ? 1.1 : 1,
                          backgroundColor: step > s ? '#10B981' : step === s ? '#0EA5E9' : '#E5E7EB'
                        }}
                      >
                        {step > s ? '✓' : s}
                      </motion.div>
                      {s < totalSteps && (
                        <motion.div
                          className="progress-line"
                          animate={{
                            scaleX: step > s ? 1 : 0,
                            backgroundColor: step > s ? '#10B981' : '#E5E7EB'
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="progress-labels">
                  <span className={step === 1 ? 'active' : ''}>Date & Time</span>
                  <span className={step === 2 ? 'active' : ''}>Location</span>
                  <span className={step === 3 ? 'active' : ''}>Review</span>
                </div>
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  className="step-content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {step === 1 && (
                    <div className="step-form">
                      <h3 className="step-title">When do you need service?</h3>
                      
                      <div className="form-group">
                        <label className="form-label">Date</label>
                        <input
                          type="date"
                          className="form-input"
                          value={bookingData.date}
                          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Preferred Time</label>
                        <div className="time-slots-grid">
                          {timeSlots.map((time) => (
                            <motion.button
                              key={time}
                              className={`time-slot ${bookingData.time === time ? 'selected' : ''}`}
                              onClick={() => setBookingData({ ...bookingData, time })}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {time}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Estimated Duration</label>
                        <select
                          className="form-select"
                          value={bookingData.duration}
                          onChange={(e) => setBookingData({ ...bookingData, duration: e.target.value })}
                        >
                          <option value="1">1 hour</option>
                          <option value="2">2 hours</option>
                          <option value="3">3 hours</option>
                          <option value="4">4 hours</option>
                          <option value="6">6 hours</option>
                          <option value="8">Full day (8 hours)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="step-form">
                      <h3 className="step-title">Where should we meet?</h3>
                      
                      <div className="form-group">
                        <label className="form-label">Service Address</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="123 Main Street, Apt 4B"
                          value={bookingData.address}
                          onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Additional Notes (Optional)</label>
                        <textarea
                          className="form-textarea"
                          placeholder="Any specific instructions or details about the job..."
                          value={bookingData.notes}
                          onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                          rows={4}
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="step-form">
                      <h3 className="step-title">Review Your Booking</h3>
                      
                      <div className="review-card">
                        <div className="review-section">
                          <h4 className="review-heading">Service Provider</h4>
                          <div className="provider-mini">
                            <span className="provider-avatar-mini">{provider.avatar}</span>
                            <div>
                              <div className="provider-name-mini">{provider.name}</div>
                              <div className="provider-service-mini">{provider.service}</div>
                            </div>
                          </div>
                        </div>

                        <div className="review-section">
                          <h4 className="review-heading">Appointment Details</h4>
                          <div className="detail-row">
                            <span className="detail-label">📅 Date</span>
                            <span className="detail-value">
                              {new Date(bookingData.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">🕐 Time</span>
                            <span className="detail-value">{bookingData.time}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">⏱️ Duration</span>
                            <span className="detail-value">{bookingData.duration} hour(s)</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">📍 Location</span>
                            <span className="detail-value">{bookingData.address}</span>
                          </div>
                        </div>

                        {bookingData.notes && (
                          <div className="review-section">
                            <h4 className="review-heading">Notes</h4>
                            <p className="notes-text">{bookingData.notes}</p>
                          </div>
                        )}

                        <div className="review-section pricing-section">
                          <div className="pricing-breakdown">
                            <div className="pricing-row">
                              <span>Service ({bookingData.duration}h × ${provider.hourlyRate}/h)</span>
                              <span>${calculateTotal()}</span>
                            </div>
                            <div className="pricing-row">
                              <span>Platform Fee</span>
                              <span>$5</span>
                            </div>
                            <div className="pricing-total">
                              <span>Total</span>
                              <span>${calculateTotal() + 5}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Footer Actions */}
              <div className="modal-footer">
                <motion.button
                  className="footer-button secondary"
                  onClick={step === 1 ? onClose : handleBack}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step === 1 ? 'Cancel' : 'Back'}
                </motion.button>

                <motion.button
                  className="footer-button primary"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  whileHover={{ scale: isStepValid() ? 1.05 : 1 }}
                  whileTap={{ scale: isStepValid() ? 0.95 : 1 }}
                >
                  {step === totalSteps ? 'Confirm Booking' : 'Next'}
                  {step < totalSteps && ' →'}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="success-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.div
                className="success-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              >
                ✓
              </motion.div>
              
              <motion.h2
                className="success-title"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Booking Confirmed!
              </motion.h2>
              
              <motion.p
                className="success-message"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Your appointment with {provider.name} has been confirmed for{' '}
                {new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}.
              </motion.p>

              <motion.div
                className="success-animation"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="confetti"
                    style={{
                      '--angle': `${i * 30}deg`,
                      '--distance': `${100 + Math.random() * 50}px`,
                      '--delay': `${i * 0.05}s`
                    }}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: [0, `calc(cos(var(--angle)) * var(--distance))`, 0],
                      y: [0, `calc(sin(var(--angle)) * var(--distance))`, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: parseFloat(i * 0.05),
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default BookingModal;