import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import './style.css'; 

const Home = () => (
  <>
    {/* 2. Banner Section */}
    <Header />
    <div className="p-10 text-center">
      <h2 className="text-3xl font-bold text-gray-400 italic">Friends Section Coming Soon...</h2>
    </div>
  </>
);

const Timeline = () => <div className="p-20 text-center"><h1 className="text-4xl font-bold">Timeline Page</h1></div>;
const Stats = () => <div className="p-20 text-center"><h1 className="text-4xl font-bold">Stats Page</h1></div>;
const NotFound = () => <div className="p-20 text-center text-red-500"><h1 className="text-6xl font-black mb-4">404</h1><p className="text-xl">Opps! Page not found.</p></div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;