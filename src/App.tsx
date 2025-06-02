import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CurrencyProvider } from './context/CurrencyContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';
import BookingPage from './pages/BookingPage';

import AdminLogin from './admin/AdminLogin';
import AdminPanel from './admin/AdminPanel';
import ProtectedRoute from './admin/ProtectedRoute';

import './i18n'; // Убедись, что этот файл существует

function App() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tours" element={<ToursPage />} />
                <Route path="/tours/:id" element={<TourDetailPage />} />
                <Route path="/booking/:id" element={<BookingPage />} />

                {/* Admin */}
                <Route path="/adminlogin" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CurrencyProvider>
    </LanguageProvider>
  );
}

export default App;
