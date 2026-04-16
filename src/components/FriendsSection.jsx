import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, User } from 'lucide-react';

const FriendsSection = () => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 10.2 Show loading animation while fetching
    setTimeout(() => {
      fetch('/friends.json')
        .then((res) => res.json())
        .then((data) => {
          setFriends(data);
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    }, 1200);
  }, []);

  // স্ট্যাটাস কালার ম্যাপিং
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'almost due': return 'bg-[#efad44] text-white';
      case 'overdue': return 'bg-[#ef4444] text-white';
      case 'on-track': return 'bg-[#244d3f] text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  return (
    // Background Color: #f8fafc
    <section className="bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-gray-900 mb-10">Your Friends</h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-[#244d3f] mb-4" />
            <p className="text-gray-500 font-bold">Fetching your circle...</p>
          </div>
        ) : (
          // Grid Layout: 4 columns on large screens
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <Link 
                key={friend.id} 
                to={`/friend/${friend.id}`}
                className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Photo with placeholder icon */}
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 overflow-hidden border-2 border-gray-50">
                    <User className="w-10 h-10 text-gray-400 group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{friend.name}</h3>
                  
                  {/* Days Since Contact */}
                  <p className="text-gray-500 text-sm font-medium mb-4">
                    {friend.days_since_contact}d ago
                  </p>

                  {/* Tags: #cbfadb background */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {friend.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="bg-[#cbfadb] text-[#244d3f] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Status: Centered below tags with specific background */}
                  <div className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest ${getStatusStyle(friend.status)}`}>
                    {friend.status}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FriendsSection;