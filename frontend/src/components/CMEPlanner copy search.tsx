/**
 * CME Planner Concierge Grid Implementation (v1.3.1)
 * Execution Mode: Manual Edit
 * Path: /home/myunix/projects/mycertiq_gemini/frontend/src/components/CMEPlanner.tsx
 * Update: Replaced fixed sidebar with a GenAI-style Natural Language Search bar.
 * Feature: Intent-based keyword listener (States & Tags).
 * Constraints: Maintained all data, filters, and dynamic credit calculation from Patch #166.
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, User, Search, Sparkles,
  ExternalLink, Filter, X, CheckCircle2
} from 'lucide-react';

const DEFAULT_CME_STATUS = {
  states: [
    { name: "Florida", code: "FL", current: 8, required: 30 },
    { name: "Massachusetts", code: "MA", current: 12, required: 50 },
    { name: "Iowa", code: "IA", current: 5, required: 40 }
  ]
};

const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' }, 
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' }, 
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' }, 
  { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' }, 
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' }, 
  { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' }, 
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' }, 
  { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' }, 
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' }, 
  { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' }, 
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' }, 
  { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' }, 
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' }, 
  { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' }, 
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' }, 
  { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' }, 
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }, { code: 'DC', name: 'Washington D.C.' },
  { code: 'PR', name: 'Puerto Rico' }, { code: 'GU', name: 'Guam' }, { code: 'VI', name: 'US Virgin Islands' },
  { code: 'AS', name: 'American Samoa' }, { code: 'MP', name: 'Northern Mariana Islands' }
];

const LIFESTYLE_TAGS = [
  'Golf', 'Tennis', 'Pickleball', 'Skiing', 'National Parks', 'Beach', 'Lake', 'Mountain',
  'Just for Fun', 'Theme Parks', 'Resorts', 'All Inclusive', 'Cruises', 'Kids Approved',
  'Yoga/Retreat', 'Beachfront', 'Fine Dining', 'Boutique Stay', 'Direct Flights', 'International'
];

export const CMEPlanner = ({ cmeStatus = DEFAULT_CME_STATUS }: any) => {
  const navigate = useNavigate();
  const [plannedIds, setPlannedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // KEYWORD LISTENER: Parses natural language into active filters
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const detected: string[] = [];

    // Check States
    US_STATES.forEach(s => {
      if (query.includes(s.name.toLowerCase()) || query.includes(` ${s.code.toLowerCase()}`)) {
        detected.push(s.code);
      }
    });

    // Check Lifestyle Tags
    LIFESTYLE_TAGS.forEach(tag => {
      if (query.includes(tag.toLowerCase())) {
        detected.push(tag);
      }
    });

    setActiveFilters(detected);
  }, [searchQuery]);

  const allCourses = useMemo(() => [
    { 
      id: 1, title: "Cardiovascular Medicine: Interventional Mastery", officialListing: "#", 
      dateRange: "Mar 12-16, 2026", date: "2026-03-12", dateEnd: "2026-03-16",
      location: { name: "Maui, HI", link: "#", airport: { name: "OGG", link: "#" }, directFlight: true },
      approvedStates: ['FL', 'MA', 'HI'], stateCode: "HI",
      boards: [{ name: "ABIM", credits: 15, link: "#" }],
      hotels: [{ name: "Grand Wailea", link: "#", isOfficial: true }],
      registrationLink: "#", tags: ['Beach', 'Luxury Resort', 'Direct Flights'], isWellness: false 
    },
    { 
      id: 2, title: "Pediatric Emergency Medicine Summit", officialListing: "#", 
      dateRange: "Apr 5-8, 2026", date: "2026-04-05", dateEnd: "2026-04-08",
      location: { name: "Orlando, FL", link: "#", airport: { name: "MCO", link: "#" }, directFlight: true },
      approvedStates: ['FL', 'GA', 'TX'], stateCode: "FL",
      boards: [{ name: "ABP", credits: 18, link: "#" }],
      hotels: [{ name: "Disney Yacht Club", link: "#", isOfficial: true }],
      registrationLink: "#", tags: ['Family & Fun', 'Theme Parks'], isWellness: false 
    },
    { 
      id: 3, title: "Neurology Update & Stroke Management", officialListing: "#", 
      dateRange: "May 10-14, 2026", date: "2026-05-10", dateEnd: "2026-05-14",
      location: { name: "Boston, MA", link: "#", airport: { name: "BOS", link: "#" }, directFlight: true },
      approvedStates: ['MA', 'NY', 'CT'], stateCode: "MA",
      boards: [{ name: "ABPN", credits: 20, link: "#" }],
      hotels: [{ name: "The Liberty Hotel", link: "#", isOfficial: true }],
      registrationLink: "#", tags: ['Big City/Arts', 'Driving Distance'], isWellness: false 
    },
    { 
      id: 4, title: "Alpine Sports Medicine & Orthopedic Care", officialListing: "#", 
      dateRange: "Feb 15-20, 2026", date: "2026-02-15", dateEnd: "2026-02-20",
      location: { name: "Aspen, CO", link: "#", airport: { name: "ASE", link: "#" }, directFlight: false },
      approvedStates: ['CO', 'UT'], stateCode: "CO",
      boards: [{ name: "ABOS", credits: 22, link: "#" }],
      hotels: [{ name: "Little Nell", link: "#", isOfficial: true }],
      registrationLink: "#", tags: ['Skiing', 'Mountain'], isWellness: false 
    },
    { 
      id: 5, title: "Radiology: Advanced Imaging Techniques", officialListing: "#", 
      dateRange: "June 2-5, 2026", date: "2026-06-02", dateEnd: "2026-06-05",
      location: { name: "San Diego, CA", link: "#", airport: { name: "SAN", link: "#" }, directFlight: true },
      approvedStates: ['CA', 'AZ'], stateCode: "CA",
      boards: [{ name: "ABR", credits: 16, link: "#" }],
      hotels: [{ name: "Hotel Del Coronado", link: "#", isOfficial: true }],
      registrationLink: "#", tags: ['Beach', 'Driving Distance'], isWellness: false 
    },
    { 
      id: 6, title: "Mindfulness & Physician Well-being Retreat", officialListing: "#", 
      dateRange: "Sept 12-15, 2026", date: "2026-09-12", dateEnd: "2026-09-15",
      location: { name: "Sedona, AZ", link: "#", airport: { name: "PHX", link: "#" }, directFlight: true },
      approvedStates: [], stateCode: "AZ",
      boards: [{ name: "General CME", credits: 12, link: "#" }],
      hotels: [{ name: "Enchantment Resort", link: "#", isOfficial: true }],
      registrationLink: "#", tags: ['Yoga/Retreat', 'Relaxation Spa & Wellness'], isWellness: true 
    },
    { 
      id: 7, title: "Internal Medicine Board Review", officialListing: "#", 
      dateRange: "July 20-25, 2026", date: "2026-07-20", dateEnd: "2026-07-25",
      location: { name: "Chicago, IL", link: "#", airport: { name: "ORD", link: "#" }, directFlight: true },
      approvedStates: ['IL', 'IN', 'WI'], stateCode: "IL",
      boards: [{ name: "ABIM", credits: 30, link: "#" }],
      hotels: [{ name: "The Drake", link: "#", isOfficial: true }],
      registrationLink: "#", tags: ['Big City/Arts', 'One-Stop Flights'], isWellness: false 
    },
    { 
      id: 8, title: "Dermatology: Clinical Pearls & Aesthetics", officialListing: "#", 
      dateRange: "Oct 8-11, 2026", date: "2026-10-08", dateEnd: "2026-10-11",
      location: { name: "Las Vegas, NV", link: "#", airport: { name: "LAS", link: "#" }, directFlight: true },
      approvedStates: ['NV', 'CA'], stateCode: "NV",
      boards: [{ name: "ABD", credits: 14, link: "#" }],
      hotels: [{ name: "Bellagio", link: "#", isOfficial: true }],
      registrationLink: "#", tags: ['Just for Fun', 'Big City/Arts'], isWellness: false 
    },
    { 
      id: 9, title: "Primary Care Golf & Clinical Update", officialListing: "#", 
      dateRange: "Nov 4-7, 2026", date: "2026-11-04", dateEnd: "2026-11-07",
      location: { name: "Scottsdale, AZ", link: "#", airport: { name: "PHX", link: "#" }, directFlight: true },
      approvedStates: ['AZ', 'TX'], stateCode: "AZ",
      boards: [{ name: "ABFM", credits: 15, link: "#" }],
      hotels: [{ name: "TPC Scottsdale Resort", link: "#", isOfficial: true }],
      golfLink: "#",
      registrationLink: "#", tags: ['Golf', 'Leisure & Sport'], isWellness: false 
    },
    { 
      id: 10, title: "Oncology: Precision Medicine Symposium", officialListing: "#", 
      dateRange: "Dec 1-4, 2026", date: "2026-12-01", dateEnd: "2026-12-04",
      location: { name: "New York, NY", link: "#", airport: { name: "JFK", link: "#" }, directFlight: true },
      approvedStates: ['NY', 'NJ', 'PA'], stateCode: "NY",
      boards: [{ name: "ABIM", credits: 18, link: "#" }],
      hotels: [{ name: "Marriott Marquis", link: "#", isOfficial: true }],
      registrationLink: "#", tags: ['Big City/Arts', 'International'], isWellness: false 
    },
    { id: 11, title: "Pacific Northwest Infectious Disease", officialListing: "#", dateRange: "Aug 15-18, 2026", date: "2026-08-15", dateEnd: "2026-08-18", location: { name: "Seattle, WA", link: "#", airport: { name: "SEA", link: "#" }, directFlight: true }, approvedStates: ['WA', 'OR'], stateCode: "WA", boards: [{ name: "ABIM", credits: 16, link: "#" }], hotels: [{ name: "W Seattle", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Big City/Arts'], isWellness: false },
    { id: 12, title: "Gastroenterology in the Gulf", officialListing: "#", dateRange: "Jan 12-15, 2026", date: "2026-01-12", dateEnd: "2026-01-15", location: { name: "New Orleans, LA", link: "#", airport: { name: "MSY", link: "#" }, directFlight: true }, approvedStates: ['LA', 'MS', 'AL'], stateCode: "LA", boards: [{ name: "ABIM", credits: 14, link: "#" }], hotels: [{ name: "The Roosevelt", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Just for Fun', 'Fine Dining'], isWellness: false },
    { id: 13, title: "Ophthalmology: Retina Frontiers", officialListing: "#", dateRange: "Mar 22-25, 2026", date: "2026-03-22", dateEnd: "2026-03-25", location: { name: "Park City, UT", link: "#", airport: { name: "SLC", link: "#" }, directFlight: true }, approvedStates: ['UT', 'WY'], stateCode: "UT", boards: [{ name: "ABO", credits: 20, link: "#" }], hotels: [{ name: "Montage Park City", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Skiing', 'Mountain'], isWellness: false },
    { id: 14, title: "Rural Medicine & Urgent Care", officialListing: "#", dateRange: "May 5-8, 2026", date: "2026-05-05", dateEnd: "2026-05-08", location: { name: "Boise, ID", link: "#", airport: { name: "BOI", link: "#" }, directFlight: false }, approvedStates: ['ID', 'MT'], stateCode: "ID", boards: [{ name: "ABFM", credits: 12, link: "#" }], hotels: [{ name: "Inn at 500", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Mountain', 'Driving Distance'], isWellness: false },
    { id: 15, title: "Global Health & Tropical Medicine", officialListing: "#", dateRange: "June 15-22, 2026", date: "2026-06-15", dateEnd: "2026-06-22", location: { name: "San Jose, Costa Rica", link: "#", airport: { name: "SJO", link: "#" }, directFlight: true }, approvedStates: [], stateCode: "INT", boards: [{ name: "General CME", credits: 25, link: "#" }], hotels: [{ name: "Official Resort", link: "#", isOfficial: true }], registrationLink: "#", tags: ['International', 'Yoga/Retreat'], isWellness: false },
    { id: 16, title: "Psychiatry: Pediatric Anxiety disorders", officialListing: "#", dateRange: "Sept 5-8, 2026", date: "2026-09-05", dateEnd: "2026-09-08", location: { name: "Washington DC", link: "#", airport: { name: "DCA", link: "#" }, directFlight: true }, approvedStates: ['DC', 'VA', 'MD'], stateCode: "DC", boards: [{ name: "ABPN", credits: 15, link: "#" }], hotels: [{ name: "The Hay-Adams", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Big City/Arts'], isWellness: false },
    { id: 17, title: "Anesthesiology Critical Care Review", officialListing: "#", dateRange: "Oct 15-18, 2026", date: "2026-10-15", dateEnd: "2026-10-18", location: { name: "Nashville, TN", link: "#", airport: { name: "BNA", link: "#" }, directFlight: true }, approvedStates: ['TN', 'KY'], stateCode: "TN", boards: [{ name: "ABA", credits: 18, link: "#" }], hotels: [{ name: "Omni Nashville", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Just for Fun', 'Big City/Arts'], isWellness: false },
    { id: 18, title: "Geriatrics: Longevity & Age Management", officialListing: "#", dateRange: "Nov 10-13, 2026", date: "2026-11-10", dateEnd: "2026-11-13", location: { name: "Palm Springs, CA", link: "#", airport: { name: "PSP", link: "#" }, directFlight: true }, approvedStates: ['CA', 'NV'], stateCode: "CA", boards: [{ name: "ABIM", credits: 14, link: "#" }], hotels: [{ name: "Ritz Carlton Rancho Mirage", link: "#", isOfficial: true }], golfLink: "#", registrationLink: "#", tags: ['Golf', 'Boutique Stay'], isWellness: false },
    { id: 19, title: "The Art of Surgery: Advanced Laparoscopy", officialListing: "#", dateRange: "Feb 1-4, 2026", date: "2026-02-01", dateEnd: "2026-02-04", location: { name: "Austin, TX", link: "#", airport: { name: "AUS", link: "#" }, directFlight: true }, approvedStates: ['TX', 'OK'], stateCode: "TX", boards: [{ name: "ABS", credits: 20, link: "#" }], hotels: [{ name: "Fairmont Austin", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Big City/Arts', 'Driving Distance'], isWellness: false },
    { id: 20, title: "Photography for Clinicians: Zion Expedition", officialListing: "#", dateRange: "Sept 14-18, 2026", date: "2026-09-14", dateEnd: "2026-09-18", location: { name: "Virgin, UT", link: "#", airport: { name: "LAS", link: "#" }, directFlight: true }, approvedStates: [], stateCode: "UT", boards: [{ name: "General CME", credits: 8, link: "#" }], hotels: [{ name: "Under Canvas Zion", link: "#", isOfficial: true }], registrationLink: "#", tags: ['National Parks', 'Just for Fun'], isWellness: true }
  ], []);

  const filteredCourses = useMemo(() => {
    if (activeFilters.length === 0) return allCourses;
    return allCourses.filter(course => {
      const stateMatch = activeFilters.includes(course.stateCode);
      const tagMatch = course.tags.some(t => activeFilters.includes(t));
      return stateMatch || tagMatch;
    });
  }, [activeFilters, allCourses]);

  const toggleCourse = (id: number) => {
    setPlannedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const totalCredits = useMemo(() => {
    return allCourses.filter(c => plannedIds.includes(c.id)).reduce((sum, c) => sum + (c.boards[0]?.credits || 0), 0);
  }, [plannedIds, allCourses]);

  const stateComplianceWithPlanned = useMemo(() => {
    const plannedCourses = allCourses.filter(c => plannedIds.includes(c.id));
    return DEFAULT_CME_STATUS.states.map(state => {
      const addedCredits = plannedCourses
        .filter(c => c.approvedStates.includes(state.code))
        .reduce((sum, c) => sum + (c.boards[0]?.credits || 0), 0);
      return { ...state, projected: state.current + addedCredits };
    });
  }, [plannedIds, allCourses]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0A0A0A]">
      <nav className="w-full h-16 bg-white border-b border-[#E2E8F0] px-4 lg:px-8 flex items-center justify-between sticky top-0 z-[100]">
        <div className="flex items-center gap-4 lg:gap-8 h-full overflow-x-auto no-scrollbar">
          <button onClick={() => navigate('/cme-status')} className="h-full flex items-center whitespace-nowrap pt-1 text-sm font-bold text-[#64748B] hover:text-[#155DFC]">CME Status</button>
          <button onClick={() => navigate('/cme-preferences')} className="h-full flex items-center whitespace-nowrap pt-1 text-sm font-bold text-[#64748B] hover:text-[#155DFC]">CME Preferences</button>
          <button className="h-full flex items-center whitespace-nowrap pt-1 text-sm font-bold text-[#155DFC] border-b-2 border-[#155DFC]">CME Planner</button>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={() => navigate('/profile')} className="w-10 h-10 bg-[#F1F5F9] rounded-full flex items-center justify-center border border-[#E2E8F0]"><User size={22} /></button>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto p-4 lg:p-8 space-y-8">
        
        {/* CONCIERGE SEARCH SECTION */}
        <section className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Sparkles className="text-[#155DFC] group-focus-within:animate-pulse" size={20} />
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tell me what you're looking for... (e.g., 'Beach courses in Florida with Golf')"
              className="w-full bg-white border-2 border-[#D1D5DC] focus:border-[#155DFC] rounded-2xl py-5 pl-14 pr-6 text-lg shadow-sm focus:shadow-xl transition-all outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-5 top-5 text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            )}
          </div>
          
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1 uppercase tracking-widest"><Filter size={14}/> Active Filters:</span>
              {activeFilters.map(f => (
                <span key={f} className="bg-blue-50 text-[#155DFC] px-3 py-1 rounded-full border border-blue-100">{f}</span>
              ))}
            </div>
          )}
        </section>

        {/* SUMMARY DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-white rounded-2xl border border-[#D1D5DC] p-6 shadow-sm">
            <h3 className="text-xs font-black text-[#45556C] mb-4 uppercase tracking-widest">Compliance Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stateComplianceWithPlanned.map(s => (
                <div key={s.code} className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] flex flex-col gap-1">
                  <span className="font-bold text-slate-800">{s.name}</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-sm font-black ${s.projected > s.current ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {s.current} {s.projected > s.current && `→ ${s.projected}`}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">/ {s.required} hrs</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-4 bg-[#155DFC] rounded-2xl p-6 text-white flex flex-col justify-center shadow-lg relative overflow-hidden">
             <div className="relative z-10">
               <p className="text-[10px] font-black uppercase mb-1 tracking-widest opacity-80">Planner Impact</p>
               <h2 className="text-4xl font-black">{totalCredits} <span className="text-lg font-normal opacity-70">Credits</span></h2>
             </div>
             <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
               <CheckCircle2 size={120} />
             </div>
          </div>
        </div>

        {/* COURSE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="p-5 bg-slate-50/50 border-b border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  <a href={course.officialListing} target="_blank" className="text-md font-black text-slate-900 hover:text-[#155DFC] leading-tight group">
                    {course.title} <ExternalLink size={12} className="inline opacity-0 group-hover:opacity-100" />
                  </a>
                </div>
                <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-1"><Calendar size={13}/> {course.dateRange}</span>
                  <span className="flex items-center gap-1"><MapPin size={13}/> {course.location.name}</span>
                </div>
              </div>

              <div className="p-5 flex-grow space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {course.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">{tag}</span>
                  ))}
                </div>
                {course.boards.map(b => (
                  <div key={b.name} className="flex justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold">
                    <span className="text-slate-500">{b.name}</span>
                    <span className="text-[#155DFC]">{b.credits} Credits</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-50/30 flex gap-2">
                <a href={course.registrationLink} className="flex-1 bg-[#155DFC] text-white text-center py-2.5 rounded-lg text-xs font-black hover:bg-[#1447E6]">Register</a>
                <button 
                  onClick={() => toggleCourse(course.id)} 
                  className={`px-4 py-2.5 rounded-lg text-xs font-black border transition-all min-w-[80px] ${
                    plannedIds.includes(course.id) 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'bg-white border-slate-200 text-slate-900 hover:border-[#155DFC]'
                  }`}
                >
                  {plannedIds.includes(course.id) ? 'Added' : 'Add'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// End of Patch #167