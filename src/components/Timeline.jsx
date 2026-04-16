import React, { useState } from 'react';
import { ListFilter, ChevronDown, Check, CalendarDays } from 'lucide-react';

const Timeline = ({ events }) => {
  // Filter State
  const [filter, setFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter Options
  const filterOptions = ['All', 'Call', 'Text', 'Video', 'Meetup'];

  // Filter Logic
  const filteredEvents = events.filter(event => {
    if (filter === 'All') return true;
    return event.type.toLowerCase() === filter.toLowerCase();
  });

  // Icon Matcher - using Emojis as per the screenshot design
  const getEventIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'call': 
        return '📞';
      case 'text': 
        return '💬';
      case 'video': 
        return '📹';
      case 'meetup': 
        return '🤝';
      default: 
        return '📅';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Area */}
        <div className="mb-10 flex flex-col items-start gap-4 relative z-20">
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight">Timeline</h1>
          
          {/* Functional Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-5 py-2.5 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm text-sm active:scale-95"
            >
              <ListFilter size={16} className="text-gray-500" />
              {filter === 'All' ? 'Filter timeline' : `Filter: ${filter}`}
              <ChevronDown size={14} className={`transition-transform duration-200 text-gray-400 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                
                <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <p className="px-4 pt-4 pb-1 text-xs font-bold text-gray-400 uppercase tracking-widest">Select Category</p>
                  {filterOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setFilter(option);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-5 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 flex items-center justify-between transition-colors"
                    >
                      {option}
                      {filter === option && <Check size={16} className="text-[#244d3f] font-bold" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Timeline Entries List */}
        <div className="relative z-10">
          
          {/* gap-5 ensures clear margin/gap between each history grid */}
          <div className="flex flex-col gap-5">
            {filteredEvents.map((event, index) => (
              // border-gray-200 for stroke, shadow-sm for light shadow below
              <div key={event.id || index} className="bg-white rounded-[16px] py-5 px-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300 flex items-center gap-6">
                
                {/* Left: Emoji Icon */}
                <span className="text-[32px] leading-none flex-shrink-0 select-none">
                  {getEventIcon(event.type)}
                </span>

                {/* Right: Entry Content Details */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-[16px] leading-tight">
                    {(() => {
                      // Split text to bold the first word, and lighten the rest
                      const words = event.title.split(' ');
                      const firstWord = words[0];
                      const rest = words.slice(1).join(' ');
                      return (
                        <>
                          <span className="font-bold text-gray-900">{firstWord}</span>
                          {rest && <span className="font-medium text-gray-500"> {rest}</span>}
                        </>
                      );
                    })()}
                  </h3>
                  <p className="text-gray-400 font-medium text-[13px] tracking-wide mt-0.5">
                    {event.date}
                  </p>
                </div>
                
              </div>
            ))}
          </div>

          {/* Empty State when filter has no results */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-20 px-6 bg-white rounded-[16px] border border-gray-200 shadow-sm mt-8 transition-all">
              <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
              <p className="text-gray-900 font-bold text-lg mb-1">No updates yet</p>
              <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                There are no {filter === 'All' ? 'recent' : filter.toLowerCase()} activities recorded in your timeline.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Timeline;