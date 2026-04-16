import React, { useState } from 'react';
import { ListFilter, ChevronDown, Check, CalendarDays, Search, ArrowUpDown } from 'lucide-react';

const Timeline = ({ events }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // newest or oldest
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filterOptions = ['All', 'Call', 'Text', 'Video', 'Meetup'];

  // লজিক: প্রথমে ফিল্টার, তারপর সার্চ, সবশেষে সর্ট করা
  const processedEvents = events
    .filter(event => {
      const matchesFilter = filter === 'All' || event.type.toLowerCase() === filter.toLowerCase();
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            event.type.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const getEventIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'call': return '📞';
      case 'text': return '💬';
      case 'video': return '📹';
      case 'meetup': return '🤝';
      default: return '📅';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[32px] font-black text-gray-900 mb-8 tracking-tight">Timeline</h1>
        
        {/* সার্চ এবং ফিল্টার সেকশন */}
        <div className="flex flex-col gap-4 mb-10 relative z-20">
          {/* সার্চ বার */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by friend name or type..."
              className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 shadow-sm focus:border-[#244d3f] outline-none transition-all font-medium text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {/* সর্টিং ড্রপডাউন */}
            <div className="relative">
              <button 
                onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }}
                className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm text-sm"
              >
                <ArrowUpDown size={16} className="text-gray-400" />
                Sort: {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                <ChevronDown size={14} />
              </button>

              {isSortOpen && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden">
                  <button onClick={() => { setSortOrder('newest'); setIsSortOpen(false); }} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 flex justify-between items-center">
                    Newest First {sortOrder === 'newest' && <Check size={14} className="text-[#244d3f]" />}
                  </button>
                  <button onClick={() => { setSortOrder('oldest'); setIsSortOpen(false); }} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 flex justify-between items-center">
                    Oldest First {sortOrder === 'oldest' && <Check size={14} className="text-[#244d3f]" />}
                  </button>
                </div>
              )}
            </div>

            {/* ক্যাটাগরি ফিল্টার ড্রপডাউন */}
            <div className="relative">
              <button 
                onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }}
                className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm text-sm"
              >
                <ListFilter size={16} className="text-gray-400" />
                Type: {filter}
                <ChevronDown size={14} />
              </button>

              {isFilterOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden">
                  {filterOptions.map(option => (
                    <button key={option} onClick={() => { setFilter(option); setIsFilterOpen(false); }} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 flex justify-between items-center">
                      {option} {filter === option && <Check size={14} className="text-[#244d3f]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* টাইমলাইন লিস্ট */}
        <div className="flex flex-col gap-5">
          {processedEvents.map((event, index) => (
            <div key={event.id || index} className="bg-white rounded-2xl py-5 px-6 shadow-sm border border-gray-200 flex items-center gap-6 animate-in fade-in duration-300">
              <span className="text-[32px] shrink-0">{getEventIcon(event.type)}</span>
              <div className="flex flex-col gap-1">
                <h3 className="text-[16px]">
                  <span className="font-bold text-gray-900">{event.title.split(' ')[0]}</span>
                  <span className="font-medium text-gray-500"> {event.title.split(' ').slice(1).join(' ')}</span>
                </h3>
                <p className="text-gray-400 font-medium text-[13px]">{event.date}</p>
              </div>
            </div>
          ))}
          {processedEvents.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <CalendarDays className="mx-auto text-gray-200 mb-4" size={48} />
              <p className="text-gray-500 font-bold">No results found for your search/filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;