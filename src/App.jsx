import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import FriendsSection from './components/FriendsSection';
import FriendDetails from './components/FriendDetails'; // Import here
import { ToastContainer } from 'react-toastify'; // For Requirement 10.3
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const Home = () => (
  <>
    <Header />
    <FriendsSection />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc] font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* 5. Friend Details Page Layout Route */}
            <Route path="/friend/:id" element={<FriendDetails />} />
            <Route path="/timeline" element={<div className="p-20 text-center">Timeline</div>} />
            <Route path="/stats" element={<div className="p-20 text-center">Stats</div>} />
            <Route path="*" element={<div className="p-20 text-center text-red-500 font-bold text-3xl">404 - Not Found</div>} />
          </Routes>
        </main>
        
        {/* Requirement 10.3: Container for Toast */}
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;