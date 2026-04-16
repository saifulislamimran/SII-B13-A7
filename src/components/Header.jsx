import React from 'react';

const Header = () => {
  // Banner Statistics Data
  const stats = [
    { label: 'Total Friends', value: '10', color: 'text-gray-900' },
    { label: 'On Track', value: '3', color: 'text-green-500' },
    { label: 'Need Attention', value: '6', color: 'text-orange-500' },
    { label: 'Interactions This Month', value: '12', color: 'text-[#244d3f]' },
  ];

  return (
    // Banner Background
    <section className="bg-[#f8fafc] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.15] tracking-tight mb-6">
          Friends to keep close in your life
        </h1>
        
        {/* Sub-text */}
        <p className="text-gray-500 text-lg md:text-[20px] font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        
        {/* Add Friend Button */}
        <button className="bg-[#244d3f] text-white px-8 py-3.5 rounded-full font-bold text-[18px] mb-20 hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 mx-auto shadow-md active:scale-95">
          <span className="text-[24px] leading-none mb-0.5 font-light">+</span> Add a Friend
        </button>
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-[#ffffff] rounded-[8px] p-[32px] flex flex-col items-center justify-center gap-[8px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1"
            >
              {/* Number */}
              <span className={`text-[32px] font-black leading-[1.2] ${stat.color}`}>
                {stat.value}
              </span>
              {/* Label */}
              <span className="text-[18px] font-normal text-[#64748b] leading-[1.2] text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Header;