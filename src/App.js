import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CheckoutGuest from './components/CheckoutGuest';
import CheckoutRegistration from './components/CheckoutRegistration';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/checkout">
          <Route index element={<CheckoutGuest />} />
          <Route path="registration" element={<CheckoutRegistration />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
