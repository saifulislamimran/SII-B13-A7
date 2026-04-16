import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import FriendsSection from './components/FriendsSection';
import FriendDetails from './components/FriendDetails';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const Home = () => (
  <>
    <Header />
    <FriendsSection />
  </>
);

function App() {
  const [timelineEvents, setTimelineEvents] = useState([
    { id: 1, type: 'Meetup', title: 'Meetup with Tom Baker', date: 'March 29, 2026' },
    { id: 2, type: 'Text', title: 'Text with Sarah Chen', date: 'March 28, 2026' },
    { id: 3, type: 'Meetup', title: 'Meetup with Olivia Martinez', date: 'March 26, 2026' },
    { id: 4, type: 'Video', title: 'Video with Aisha Patel', date: 'March 23, 2026' },
  ]);

  const handleAddTimelineEvent = (type, friendName) => {
    const newEvent = {
      id: Date.now(),
      type: type,
      title: `${type} with ${friendName}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setTimelineEvents([newEvent, ...timelineEvents]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/friend/:id" element={<FriendDetails onAddEvent={handleAddTimelineEvent} />} />
            <Route path="/timeline" element={<Timeline events={timelineEvents} />} />
            <Route path="/stats" element={<div className="p-20 text-center text-2xl font-bold">Stats Page Coming Soon...</div>} />
            <Route path="*" element={<div className="p-20 text-center text-red-500 font-bold text-3xl">404 - Not Found</div>} />
          </Routes>
        </main>

        <Footer />
        
        <ToastContainer position="bottom-right" autoClose={2000} />
      </div>
    </Router>
  );
}

export default App;