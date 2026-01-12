import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import ServiceListing from './components/ServiceListing';
import ProfileView from './components/ProfileView';
import BookingModal from './components/BookingModal';
import { mockProviders } from './data/mockData';
import './styles/App.css';



function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [providers] = useState(mockProviders);

  // Filter providers based on search and category
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      provider.service.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
  };

  const handleBackToListing = () => {
    setSelectedProvider(null);
  };

  const handleBookNow = (provider) => {
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const handleCloseBooking = () => {
    setShowBookingModal(false);
  };

  const handleBookingConfirm = (bookingData) => {
    console.log('Booking confirmed:', bookingData);
    setShowBookingModal(false);
    // In production, this would make an API call
  };

  return (
    <div className="app">
      <Header />
      
      <div className="app-content">
        <Sidebar 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <main className="main-content">
          <AnimatePresence mode="wait">
            {!selectedProvider ? (
              <div key="listing">
                <SearchBar 
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  resultsCount={filteredProviders.length}
                />
                
                <ServiceListing 
                  providers={filteredProviders}
                  onProviderClick={handleProviderClick}
                  searchQuery={searchQuery}
                />
              </div>
            ) : (
              <ProfileView
                key="profile"
                provider={selectedProvider}
                onBack={handleBackToListing}
                onBookNow={handleBookNow}
              />
            )}
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {showBookingModal && (
          <BookingModal
            provider={selectedProvider}
            onClose={handleCloseBooking}
            onConfirm={handleBookingConfirm}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;