import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './style.css'; 

// পরবর্তী ধাপের জন্য ডামি কম্পোনেন্ট
const Home = () => <div className="p-10 text-center"><h1 className="text-3xl font-bold">Banner & Friends Section Coming Soon...</h1></div>;
const Timeline = () => <div className="p-10 text-center"><h1 className="text-3xl font-bold">Timeline Page</h1></div>;
const Stats = () => <div className="p-10 text-center"><h1 className="text-3xl font-bold">Stats Page</h1></div>;
const NotFound = () => <div className="p-20 text-center text-red-500"><h1 className="text-6xl font-black mb-4">404</h1><p className="text-xl">Opps! Page not found.</p></div>;

function App() {
  return (
    <Router>
      {/* Banner Requirement: Background #f8fafc applied here */}
      <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 flex flex-col">
        
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={<RouteTransition><Timeline /></RouteTransition>} />
            <Route path="/stats" element={<Stats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
      </div>
    </Router>
  );
}

// সিম্পল ট্রানজিশন র‍্যাপার (অপশনাল)
const RouteTransition = ({children}) => <div className="animate-in fade-in duration-500">{children}</div>;

export default App;