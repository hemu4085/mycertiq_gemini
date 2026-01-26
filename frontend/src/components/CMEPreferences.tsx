/**
 * Cursor Agent Patch #140 - Scrollable State Selection
 * Path: /home/myunix/projects/mycertiq_gemini/frontend/src/components/CMEPreferences.tsx
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, Users, Coffee, Plane, CheckCircle2, 
  XCircle, RotateCcw, Save, Sparkles, ShieldCheck, 
  User, MapPin, Palmtree, Heart, Calendar, Map
} from 'lucide-react';

// FULL JURISDICTION LIST
const ALL_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", 
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", 
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", 
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  "Washington D.C.", "Puerto Rico", "Guam", "US Virgin Islands", "American Samoa", "Northern Mariana Islands"
];

const OTHER_CATEGORIES = [
  {
    title: "Leisure & Sport",
    icon: <Trophy size={18} />,
    tags: ["Golf", "Tennis", "Pickleball", "Skiing", "National Parks", "Beach", "Lake", "Mountain"]
  },
  {
    title: "Family & Fun",
    icon: <Users size={18} />,
    tags: ["Just for Fun", "Theme Parks", "Resorts", "All Inclusive", "Cruises", "Kids Approved", "Teens Approved", "Pet Approved"]
  },
  {
    title: "Relaxation & Wellness",
    icon: <Heart size={18} />,
    tags: ["Yoga/Retreat", "Beachfront", "Fine Dining", "Boutique Stay"]
  },
  {
    title: "Travel Ease",
    icon: <Plane size={18} />,
    tags: ["Direct Flights", "One-Stop Flights", "Driving Distance", "International", "Big City/Arts"]
  }
];

export const CMEPreferences = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<Record<string, 'include' | 'exclude' | 'none'>>({});
  const [timePeriod, setTimePeriod] = useState('12 Month');
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleToggle = (tag: string) => {
    setPreferences(prev => {
      const current = prev[tag] || 'none';
      if (current === 'none') return { ...prev, [tag]: 'include' };
      if (current === 'include') return { ...prev, [tag]: 'exclude' };
      return { ...prev, [tag]: 'none' };
    });
  };

  return (
    <div className="bg-white min-h-screen font-sans text-[#101828]">
      {/* NAV BAR (Strictly Version 1.1.1) */}
      <nav className="border-b border-[#D1D5DC] px-8 py-4 flex justify-between items-center bg-white sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/status')}>
            <div className="w-8 h-8 bg-[#155DFC] rounded-lg flex items-center justify-center text-white">
              <ShieldCheck size={20} fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight">MyCertiq Gemini</span>
          </div>
          <div className="flex gap-6 text-sm font-bold text-[#4A5565]">
            <button onClick={() => navigate('/status')} className="hover:text-[#101828]">CME Status</button>
            <button className="text-[#155DFC] border-b-2 border-[#155DFC] pb-5 translate-y-5">CME Preferences</button>
            <button onClick={() => navigate('/planner')} className="hover:text-[#101828]">CME Planner</button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-[#4A5565]">Dr. Priya Verma</span>
          <div className="w-8 h-8 bg-[#F3F4F6] rounded-full border border-[#D1D5DC] flex items-center justify-center">
            <User size={16} className="text-[#4A5565]" />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-12 px-6 space-y-10">
        {/* HEADER AREA (Strictly Version 1.1.1) */}
        <div className="flex justify-between items-end border-b border-[#D1D5DC] pb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-[#101828]">Refine Your Experience</h1>
            <p className="text-[#4A5565] font-medium">Customize your roadmap by including or excluding specific preferences.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setPreferences({})} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#4A5565] hover:text-[#101828]">
              <RotateCcw size={16} /> Clear All
            </button>
            <button 
              onClick={() => setShowSavedToast(true)}
              style={{ backgroundColor: '#155DFC' }}
              className="px-10 py-4 text-white rounded-full font-black shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <Save size={18} /> Save Preferences
            </button>
          </div>
        </div>

        {/* TIME & SCOPE (Strictly Version 1.1.1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#F8FAFC] border border-[#D1D5DC] rounded-[32px] p-8 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#4A5565] flex items-center gap-2">
              <Calendar size={16} /> Time Period
            </h3>
            <div className="flex flex-wrap gap-3">
              {['3 Month', '6 Month', '12 Month', 'Specific Date'].map(period => (
                <button 
                  key={period}
                  onClick={() => setTimePeriod(period)}
                  className={`px-5 py-2 rounded-xl border text-sm font-bold transition-all ${
                    timePeriod === period ? 'bg-[#155DFC] text-white border-[#155DFC]' : 'bg-white text-[#4A5565] border-[#D1D5DC]'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
            {timePeriod === 'Specific Date' && (
              <div className="flex gap-4 pt-4 animate-in slide-in-from-top-2">
                <input type="date" className="flex-1 p-3 rounded-xl border border-[#D1D5DC] text-sm font-bold" />
                <input type="date" className="flex-1 p-3 rounded-xl border border-[#D1D5DC] text-sm font-bold" />
              </div>
            )}
          </div>

          <div className="bg-[#F8FAFC] border border-[#D1D5DC] rounded-[32px] p-8 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#4A5565] flex items-center gap-2">
              <Map size={16} /> Credit Scope
            </h3>
            <div className="flex gap-3">
              {['State Approved', 'General Wellness'].map(tag => {
                const status = preferences[tag] || 'none';
                return (
                  <button key={tag} onClick={() => handleToggle(tag)} className={`flex items-center gap-2 px-5 py-2 rounded-xl border text-sm font-bold transition-all ${
                    status === 'include' ? 'bg-emerald-50 border-[#047857] text-[#047857]' :
                    status === 'exclude' ? 'bg-red-50 border-red-500 text-red-600' :
                    'bg-white border-[#D1D5DC] text-[#4A5565] hover:border-[#101828]'
                  }`}>
                    {status === 'include' && <CheckCircle2 size={14} />}
                    {status === 'exclude' && <XCircle size={14} />}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* LIFESTYLE CATEGORIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* THE NEW SCROLLABLE STATE CARD */}
          <div className="bg-white border border-[#D1D5DC] rounded-[32px] p-8 space-y-6 shadow-sm">
            <h3 className="text-md font-black text-[#101828] flex items-center gap-3">
              <span className="p-2 bg-[#F8FAFC] rounded-xl text-[#155DFC] border border-[#D1D5DC]">
                <MapPin size={18} />
              </span>
              CME Location (State)
            </h3>
            <div className="max-h-[280px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
               <div className="flex flex-wrap gap-2">
                {ALL_STATES.map(state => {
                  const status = preferences[state] || 'none';
                  return (
                    <button key={state} onClick={() => handleToggle(state)} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-[12px] font-bold transition-all ${
                      status === 'include' ? 'bg-emerald-50 border-[#047857] text-[#047857]' :
                      status === 'exclude' ? 'bg-red-50 border-red-500 text-red-600' :
                      'bg-[#F8FAFC] border-[#D1D5DC] text-[#4A5565] hover:border-[#101828]'
                    }`}>
                      {status === 'include' && <CheckCircle2 size={12} />}
                      {status === 'exclude' && <XCircle size={12} />}
                      {state}
                    </button>
                  );
                })}
               </div>
            </div>
          </div>

          {/* OTHER CATEGORIES (Leisure, Family, etc) */}
          {OTHER_CATEGORIES.map((cat) => (
            <div key={cat.title} className="bg-white border border-[#D1D5DC] rounded-[32px] p-8 space-y-6 flex flex-col shadow-sm">
              <h3 className="text-md font-black text-[#101828] flex items-center gap-3">
                <span className="p-2 bg-[#F8FAFC] rounded-xl text-[#155DFC] border border-[#D1D5DC]">{cat.icon}</span>
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2 content-start flex-grow">
                {cat.tags.map(tag => {
                  const status = preferences[tag] || 'none';
                  return (
                    <button key={tag} onClick={() => handleToggle(tag)} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[13px] font-bold transition-all ${
                      status === 'include' ? 'bg-emerald-50 border-[#047857] text-[#047857]' :
                      status === 'exclude' ? 'bg-red-50 border-red-500 text-red-600' :
                      'bg-[#F8FAFC] border-[#D1D5DC] text-[#4A5565] hover:border-[#101828]'
                    }`}>
                      {status === 'include' && <CheckCircle2 size={14} />}
                      {status === 'exclude' && <XCircle size={14} />}
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showSavedToast && (
        <div className="fixed bottom-10 right-10 bg-[#047857] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 z-[100]">
          <Sparkles size={20} />
          <span className="font-bold">Preferences Saved & Roadmap Updated!</span>
        </div>
      )}
    </div>
  );
};

// End of Patch #140
