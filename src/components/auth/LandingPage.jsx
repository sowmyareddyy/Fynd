import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Briefcase, Shield, Star } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Fynd</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-indigo-600 hover:text-indigo-800"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          Find Your Perfect Service
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 mb-12"
        >
          Connect with skilled professionals or offer your services to thousands
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate('/signup?type=customer')}
            className="px-8 py-4 bg-indigo-600 text-white rounded-xl text-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition-all shadow-lg"
          >
            <Users className="inline-block mr-2" size={24} />
            I Need a Service
          </button>
          <button
            onClick={() => navigate('/signup?type=worker')}
            className="px-8 py-4 bg-white text-indigo-600 rounded-xl text-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all shadow-lg border-2 border-indigo-600"
          >
            <Briefcase className="inline-block mr-2" size={24} />
            I'm a Professional
          </button>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Shield size={40} />}
            title="Verified Professionals"
            description="All service providers are verified and rated by customers"
          />
          <FeatureCard
            icon={<Star size={40} />}
            title="Quality Guaranteed"
            description="Top-rated services with customer satisfaction guarantee"
          />
          <FeatureCard
            icon={<Users size={40} />}
            title="Easy Booking"
            description="Book services in minutes with our simple platform"
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-2xl shadow-lg"
  >
    <div className="text-indigo-600 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default LandingPage;
