import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, User, Search, ArrowUpDown, ChevronDown, Check } from 'lucide-react';

const FriendAvatar = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <User className="w-10 h-10 text-gray-400 group-hover:scale-110 transition-transform" />;
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      onError={() => setHasError(true)}
    />
  );
};

const FriendsSection = () => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('Name'); 
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetch(`/friends.json?v=${new Date().getTime()}`)
        .then((res) => res.json())
        .then((data) => {
          setFriends(data);
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    }, 1200);
  }, []);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'almost due': return 'bg-[#efad44] text-white';
      case 'overdue': return 'bg-[#ef4444] text-white';
      case 'on-track': return 'bg-[#244d3f] text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const processedFriends = friends
    .filter(friend => friend.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortCriteria === 'Name') return a.name.localeCompare(b.name);
      if (sortCriteria === 'Status') return a.status.localeCompare(b.status);
      return 0;
    });

  return (
    <section className="bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 relative z-20">
          <h2 className="text-3xl font-black text-gray-900">Your Friends</h2>

          {!isLoading && (
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <div className="relative grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search friends..." 
                  className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-[#244d3f] hover:border-gray-300 transition-all font-medium text-sm shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                >
                  <ArrowUpDown size={14} className="text-gray-400" />
                  Sort: {sortCriteria}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isSortOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)}></div>
                    <div className="absolute top-full right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                      <button onClick={() => {setSortCriteria('Name'); setIsSortOpen(false);}} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 flex justify-between items-center transition-colors">
                        By Name {sortCriteria === 'Name' && <Check size={14} className="text-[#244d3f]" />}
                      </button>
                      <button onClick={() => {setSortCriteria('Status'); setIsSortOpen(false);}} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 flex justify-between items-center transition-colors">
                        By Status {sortCriteria === 'Status' && <Check size={14} className="text-[#244d3f]" />}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-[#244d3f] mb-4" />
            <p className="text-gray-500 font-bold">Fetching your circle...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processedFriends.map((friend) => (
                <Link 
                  key={friend.id} 
                  to={`/friend/${friend.id}`}
                  className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center text-center">
                    
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 overflow-hidden border-2 border-gray-50 shrink-0">
                      <FriendAvatar src={friend.picture} alt={friend.name} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-1">{friend.name}</h3>
                    <p className="text-gray-500 text-sm font-medium mb-4">{friend.days_since_contact}d ago</p>

                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {friend.tags.map((tag, i) => (
                        <span key={i} className="bg-[#cbfadb] text-[#244d3f] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest ${getStatusStyle(friend.status)}`}>
                      {friend.status}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {processedFriends.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[24px] border border-gray-100 shadow-sm mt-6">
                <Search className="mx-auto text-gray-300 mb-4" size={40} />
                <p className="text-gray-900 font-bold text-lg">No friends found</p>
                <p className="text-gray-500 text-sm mt-1">We couldn't find anyone matching "{searchTerm}"</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FriendsSection;