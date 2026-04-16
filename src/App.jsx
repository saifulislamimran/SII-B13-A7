import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import FriendsSection from './components/FriendsSection';
import FriendDetails from './components/FriendDetails';
import Timeline from './components/Timeline'; // নতুন পেজ ইম্পোর্ট করা হলো
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
  // Timeline Data State (PDF অনুযায়ী কিছু ডিফল্ট ডেটা দেওয়া হলো)
  const [timelineEvents, setTimelineEvents] = useState([
    { id: 1, type: 'Meetup', title: 'Meetup with Tom Baker', date: 'March 29, 2026' },
    { id: 2, type: 'Text', title: 'Text with Sarah Chen', date: 'March 28, 2026' },
    { id: 3, type: 'Meetup', title: 'Meetup with Olivia Martinez', date: 'March 26, 2026' },
    { id: 4, type: 'Video', title: 'Video with Aisha Patel', date: 'March 23, 2026' },
  ]);

  // নতুন টাইমলাইন ইভেন্ট যুক্ত করার ফাংশন (Requirement 6)
  const handleAddTimelineEvent = (type, friendName) => {
    const newEvent = {
      id: Date.now(),
      type: type, // 'Call', 'Text', বা 'Video'
      title: `${type} with ${friendName}`,
      // বর্তমান তারিখ জেনারেট করা (যেমন: March 29, 2026)
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    // নতুন ইভেন্টটি লিস্টের একদম শুরুতে যুক্ত হবে
    setTimelineEvents([newEvent, ...timelineEvents]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc] font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* onAddEvent প্রপসটি FriendDetails এ পাঠানো হলো */}
            <Route path="/friend/:id" element={<FriendDetails onAddEvent={handleAddTimelineEvent} />} />
            {/* timelineEvents প্রপসটি Timeline পেজে পাঠানো হলো */}
            <Route path="/timeline" element={<Timeline events={timelineEvents} />} />
            <Route path="/stats" element={<div className="p-20 text-center">Stats Page Coming Soon</div>} />
            <Route path="*" element={<div className="p-20 text-center text-red-500 font-bold text-3xl">404 - Not Found</div>} />
          </Routes>
        </main>
        
        {/* Toast Container */}
        <ToastContainer position="bottom-right" autoClose={2000} />
      </div>
    </Router>
  );
}

export default App;