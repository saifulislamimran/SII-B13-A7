import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageSquare, Video, Edit3, User, Clock, Archive, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ProfileAvatar = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <User size={36} className="text-gray-300" />;
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover" 
      onError={() => setHasError(true)}
    />
  );
};

const FriendDetails = ({ onAddEvent }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/friends.json?v=${new Date().getTime()}`)
      .then((res) => res.json())
      .then((data) => {
        const foundFriend = data.find((f) => f.id === parseInt(id));
        setFriend(foundFriend);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleCheckIn = (type) => {
    toast.success(`${type} initiated with ${friend.name} 🚀`);
    if (onAddEvent) {
      onAddEvent(type, friend.name);
    }
  };

  const handleSecondaryAction = (action) => {
    if (action === 'Snooze') {
      toast.info(`⏰ Snoozed ${friend.name} for 2 weeks!`);
    } else if (action === 'Archive') {
      toast.warn(`📦 ${friend.name} has been archived.`);
      setTimeout(() => navigate('/'), 1500);
    } else if (action === 'Delete') {
      toast.error(`🗑️ ${friend.name} has been deleted.`);
      setTimeout(() => navigate('/'), 1500);
    }
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'almost due': return 'bg-[#efad44] text-white';
      case 'overdue': return 'bg-[#ef4444] text-white';
      case 'on-track': return 'bg-[#244d3f] text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-[#244d3f] text-xl">Loading profile...</div>;
  if (!friend) return <div className="p-20 text-center text-red-500 font-bold text-xl">Friend details not found.</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#244d3f] font-bold transition-colors"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <div className="text-2xl font-black tracking-tight">
            <span className="text-black">Keen</span><span className="text-[#244d3f]">Keeper</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          <div className="lg:col-span-4 flex flex-col gap-4 h-full">
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center flex-1">
              
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center border-4 border-gray-100 mb-3 overflow-hidden shrink-0">
                <ProfileAvatar src={friend.picture} alt={friend.name} />
              </div>
              
              <h1 className="text-2xl font-black text-gray-900 mb-2">{friend.name}</h1>
              <span className={`px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-widest mb-4 ${getStatusStyle(friend.status)}`}>
                {friend.status}
              </span>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {friend.tags.map((tag, i) => (
                  <span key={i} className="bg-[#cbfadb] text-[#244d3f] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm font-medium italic leading-relaxed mb-4">"{friend.bio}"</p>
              <p className="text-gray-900 font-bold text-sm w-full pt-4 mt-auto border-t border-gray-50">
                <span className="text-gray-400 uppercase tracking-widest text-[10px] mr-2">Preferred:</span> {friend.email}
              </p>
            </div>
            <button onClick={() => handleSecondaryAction('Snooze')} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3.5 flex items-center justify-center gap-3 font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              <Clock size={18} /> Snooze 2 Weeks
            </button>
            <button onClick={() => handleSecondaryAction('Archive')} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3.5 flex items-center justify-center gap-3 font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              <Archive size={18} /> Archive
            </button>
            <button onClick={() => handleSecondaryAction('Delete')} className="bg-white rounded-xl shadow-sm border border-red-50 p-3.5 flex items-center justify-center gap-3 font-bold text-red-500 hover:bg-red-50 transition-colors">
              <Trash2 size={18} /> Delete
            </button>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4 h-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-gray-900 mb-1">{friend.days_since_contact}</span>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Days Since Contact</span>
              </div>
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-gray-900 mb-1">{friend.goal}</span>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Goal (Days)</span>
              </div>
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-gray-900 mb-1 mt-2">{friend.next_due_date}</span>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Next Due</span>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 relative">
              <button className="absolute top-6 right-6 text-gray-400 hover:text-[#244d3f] transition-colors flex items-center gap-1.5 font-bold text-sm bg-gray-50 px-3 py-1.5 rounded-lg">
                <Edit3 size={16} /> Edit
              </button>
              <h3 className="text-lg font-black text-gray-900 mb-1">Relationship Goal</h3>
              <p className="text-gray-600 font-medium">Connect every <span className="font-bold text-[#244d3f]">{friend.goal}</span> days</p>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 flex flex-col justify-center flex-1">
              <h3 className="text-lg font-black text-gray-900 mb-5">Quick Check-In</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => handleCheckIn('Call')} className="flex-1 flex items-center justify-center gap-2 bg-[#244d3f] text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-sm active:scale-95">
                  <Phone size={18} /> Call
                </button>
                <button onClick={() => handleCheckIn('Text')} className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-[#244d3f] text-[#244d3f] py-4 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95">
                  <MessageSquare size={18} /> Text
                </button>
                <button onClick={() => handleCheckIn('Video')} className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-[#244d3f] text-[#244d3f] py-4 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95">
                  <Video size={18} /> Video
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FriendDetails;