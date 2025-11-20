import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Listings from './pages/Listings';
import User from './pages/User';
import UserProfile from './pages/UserProfile';
import UserBookings from './pages/UserBookings';
import UserListings from './pages/UserListings';
import UserBookmarks from './pages/UserBookmarks';
import UserMessages from './pages/UserMessages';
import UserReviews from './pages/UserReviews';
import UserWallet from './pages/UserWallet';
import UserAddListing from './pages/UserAddListing';
import SingleListing from './pages/SingleListing';
import BackToTop from './components/BackToTop';

function AppContent() {
  const location = useLocation();
  const isUserPage = location.pathname.startsWith('/user');

  return (
    <div className="App">
      {!isUserPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/bookings" element={<UserBookings />} />
          <Route path="/user/listings" element={<UserListings />} />
          <Route path="/user/bookmarks" element={<UserBookmarks />} />
          <Route path="/user/messages" element={<UserMessages />} />
          <Route path="/user/reviews" element={<UserReviews />} />
          <Route path="/user/wallet" element={<UserWallet />} />
          <Route path="/user/add-listing" element={<UserAddListing />} />
          <Route path="/single-listing-01/:id" element={<SingleListing />} />
        </Routes>
      </main>
      {!isUserPage && <Footer />}
      {!isUserPage && <BackToTop />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;


