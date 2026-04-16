import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import FriendsSection from './components/FriendsSection';
import './style.css';

const Home = () => (
  <>
    <Header />
    <FriendsSection />
  </>
);

// Placeholder for Friend Details Page (Section 5)
const FriendDetails = () => <div className="p-20 text-center text-2xl font-bold">Friend Details Page Layout Coming Soon...</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc] font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/friend/:id" element={<FriendDetails />} />
            <Route path="/timeline" element={<div className="p-20 text-center">Timeline</div>} />
            <Route path="/stats" element={<div className="p-20 text-center">Stats</div>} />
            <Route path="*" element={<div className="p-20 text-center text-red-500 font-bold text-3xl">404 - Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;