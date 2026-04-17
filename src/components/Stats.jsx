import React, { useState, useEffect } from 'react';
import { ListFilter, ChevronDown, Check, TrendingUp } from 'lucide-react';

const Stats = ({ events = [] }) => {
  const [filter, setFilter] = useState('Overview');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterOptions = ['Overview', 'Call', 'Text', 'Video', 'Meetup', 'Friend Status'];

  useEffect(() => {
    fetch('/friends.json')
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-20 text-center font-bold text-[#244d3f] text-xl">Loading analytics...</div>;

  // ১. টাইমলাইন ডেটা প্রসেসিং (Interactions)
  const getInteractionData = () => {
    const counts = { Call: 0, Text: 0, Video: 0, Meetup: 0 };
    // Safe mapping with events
    events.forEach(e => {
      if (counts[e.type]) counts[e.type]++;
      else if (e.type === 'Call') counts.Call++;
      else if (e.type === 'Text') counts.Text++;
      else if (e.type === 'Video') counts.Video++;
      else if (e.type === 'Meetup') counts.Meetup++;
    });
    return counts;
  };

  // ২. ফ্রেন্ড স্ট্যাটাস ডেটা প্রসেসিং
  const getFriendStatusData = () => {
    const counts = { 'On-Track': 0, 'Almost Due': 0, 'Overdue': 0 };
    // Safe mapping with friends
    friends.forEach(f => {
      const s = f.status.toLowerCase();
      if (s === 'on-track') counts['On-Track']++;
      else if (s === 'almost due') counts['Almost Due']++;
      else if (s === 'overdue') counts['Overdue']++;
    });
    return counts;
  };

  const interactionData = getInteractionData();
  const statusData = getFriendStatusData();

  // পাই চার্ট জেনারেটর ফাংশন
  const renderPieChart = (data, title, colors) => {
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    
    // যদি কোনো ডেটা না থাকে
    if (total === 0) {
      return <div className="py-20 text-center text-gray-400 font-bold text-lg border-2 border-dashed border-gray-100 rounded-3xl mt-6">No data available yet. Start connecting!</div>;
    }

    let currentPercent = 0;
    const gradientStops = Object.entries(data).map(([label, value], index) => {
      const percent = (value / total) * 100;
      const color = colors[index % colors.length];
      const stop = `${color} ${currentPercent}% ${currentPercent + percent}%`;
      currentPercent += percent;
      return stop;
    });

    return (
      <div className="flex flex-col items-center animate-in fade-in duration-500 pt-8">
        <div 
          className="w-64 h-64 rounded-full relative flex items-center justify-center shadow-md border-8 border-gray-50"
          style={{ background: `conic-gradient(${gradientStops.join(', ')})` }}
        >
          <div className="w-40 h-40 bg-white rounded-full flex flex-col items-center justify-center shadow-inner z-10">
            <span className="text-4xl font-black text-gray-900">{total}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Total {title}</span>
          </div>
        </div>
        
        {/* Legend Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 w-full max-w-md">
          {Object.entries(data).map(([label, value], index) => (
            <div key={label} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-4 h-4 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: colors[index % colors.length] }}></div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">{label}</span>
                <span className="text-xl font-black text-gray-900 leading-none">{value} <span className="text-xs font-medium text-gray-400 ml-1">({Math.round((value/total)*100)}%)</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Header & Filter */}
        <div className="mb-12 flex flex-col items-start gap-5">
          <div className="flex items-center gap-3">
            <div className="bg-[#244d3f] p-2.5 rounded-xl text-white shadow-sm">
              <TrendingUp size={24} />
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Analytics</h1>
          </div>

          <div className="relative z-30">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:border-gray-300 transition-all shadow-sm text-sm active:scale-95"
            >
              <ListFilter size={18} className="text-gray-400" />
              {filter === 'Overview' ? 'Filter stats' : `Filter: ${filter}`}
              <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0" onClick={() => setIsDropdownOpen(false)}></div>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <p className="px-5 pt-4 pb-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Select View</p>
                  {filterOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => { setFilter(option); setIsDropdownOpen(false); }}
                      className="w-full text-left px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-between transition-colors"
                    >
                      {option}
                      {filter === option && <Check size={16} className="text-[#244d3f]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Dynamic Chart Area */}
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="mb-6 text-center sm:text-left border-b border-gray-50 pb-6">
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              {filter === 'Overview' ? 'All Interactions' : `${filter} Analysis`}
            </h2>
            <p className="text-gray-400 font-medium text-sm">
              {filter === 'Friend Status' ? 'Based on your current friends list.' : 'Based on your timeline history.'}
            </p>
          </div>

          {/* Conditional Rendering based on Filter */}
          {filter === 'Overview' && renderPieChart(interactionData, 'Activities', ['#244d3f', '#efad44', '#ef4444', '#3b82f6'])}
          
          {filter === 'Friend Status' && renderPieChart(statusData, 'Friends', ['#244d3f', '#efad44', '#ef4444'])}
          
          {['Call', 'Text', 'Video', 'Meetup'].includes(filter) && (
            <div className="flex flex-col items-center py-12 animate-in fade-in duration-500">
              <div className="w-48 h-48 rounded-full bg-gray-50 flex flex-col items-center justify-center border-4 border-dashed border-gray-200 shadow-inner">
                 <span className="text-6xl font-black text-[#244d3f]">{interactionData[filter] || 0}</span>
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">{filter}s Done</span>
              </div>
              <p className="mt-8 text-gray-500 font-medium text-center max-w-sm text-lg">
                You have recorded <span className="font-bold text-gray-900">{interactionData[filter] || 0}</span> {filter.toLowerCase()} interactions in your history.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Stats;