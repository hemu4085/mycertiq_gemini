/**
 * CME Planner - Patch #172
 * Execution Mode: Manual Edit
 * Path: /home/myunix/projects/mycertiq_gemini/frontend/src/components/CMEPlanner.tsx
 * Status: Implemented active Time Period filtering and updated "Add/Added" button labels.
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Check, 
  CircleDot, MinusCircle, User,
  ExternalLink, Search, X, Hotel
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

type FilterState = -1 | 1 | 0 | null;

export const CMEPlanner = ({ cmeStatus = DEFAULT_CME_STATUS }: any) => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('12 Month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [plannedIds, setPlannedIds] = useState<number[]>([]);
  const [stateSearch, setStateSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, FilterState>>({});

  const filteredStates = useMemo(() => {
    const query = stateSearch.toLowerCase().trim();
    if (!query) return US_STATES;
    return US_STATES.filter(s => 
      s.name.toLowerCase().includes(query) || s.code.toLowerCase().includes(query)
    );
  }, [stateSearch]);

  const allCourses = useMemo(() => [
    { id: 1, title: "Cardiovascular Medicine: Interventional Mastery", officialListing: "#", dateRange: "Mar 12-16, 2026", date: "2026-03-12", dateEnd: "2026-03-16", location: { name: "Maui, HI", link: "#", airport: { name: "OGG", link: "#" }, directFlight: true }, approvedStates: ['FL', 'MA', 'HI'], stateCode: "HI", boards: [{ name: "ABIM", credits: 15, link: "#" }], hotels: [{ name: "Grand Wailea", link: "#", isOfficial: true }], nearbyHotels: [{name: "Four Seasons Maui", dist: "0.4 mi", link: "#"}, {name: "Andaz Maui", dist: "1.2 mi", link: "#"}, {name: "Hotel Wailea", dist: "2.5 mi", link: "#"}], registrationLink: "#", tags: ['Beach', 'Luxury Resort', 'Direct Flights'], isWellness: false },
    { id: 2, title: "Pediatric Emergency Medicine Summit", officialListing: "#", dateRange: "Apr 5-8, 2026", date: "2026-04-05", dateEnd: "2026-04-08", location: { name: "Orlando, FL", link: "#", airport: { name: "MCO", link: "#" }, directFlight: true }, approvedStates: ['FL', 'GA', 'TX'], stateCode: "FL", boards: [{ name: "ABP", credits: 18, link: "#" }], hotels: [{ name: "Disney Yacht Club", link: "#", isOfficial: true }], nearbyHotels: [{name: "Swan Reserve", dist: "0.8 mi", link: "#"}, {name: "Wyndham Grand", dist: "2.1 mi", link: "#"}, {name: "Waldorf Astoria", dist: "3.4 mi", link: "#"}], registrationLink: "#", tags: ['Family & Fun', 'Theme Parks/Amusement'], isWellness: false },
    { id: 3, title: "Neurology Update & Stroke Management", officialListing: "#", dateRange: "May 10-14, 2026", date: "2026-05-10", dateEnd: "2026-05-14", location: { name: "Boston, MA", link: "#", airport: { name: "BOS", link: "#" }, directFlight: true }, approvedStates: ['MA', 'NY', 'CT'], stateCode: "MA", boards: [{ name: "ABPN", credits: 20, link: "#" }], hotels: [{ name: "The Liberty Hotel", link: "#", isOfficial: true }], nearbyHotels: [{name: "The Whitney", dist: "0.3 mi", link: "#"}, {name: "Wyndham Beacon Hill", dist: "0.5 mi", link: "#"}, {name: "XV Beacon", dist: "0.9 mi", link: "#"}], registrationLink: "#", tags: ['Big City/Arts', 'Driving Distance'], isWellness: false },
    { id: 4, title: "Alpine Sports Medicine & Orthopedic Care", officialListing: "#", dateRange: "Feb 15-20, 2026", date: "2026-02-15", dateEnd: "2026-02-20", location: { name: "Aspen, CO", link: "#", airport: { name: "ASE", link: "#" }, directFlight: false }, approvedStates: ['CO', 'UT'], stateCode: "CO", boards: [{ name: "ABOS", credits: 22, link: "#" }], hotels: [{ name: "Little Nell", link: "#", isOfficial: true }], nearbyHotels: [{name: "St. Regis Aspen", dist: "0.2 mi", link: "#"}, {name: "Hotel Jerome", dist: "0.5 mi", link: "#"}, {name: "Limelight Hotel", dist: "0.4 mi", link: "#"}], registrationLink: "#", tags: ['Skiing', 'Mountain'], isWellness: false },
    { id: 5, title: "Radiology: Advanced Imaging Techniques", officialListing: "#", dateRange: "June 2-5, 2026", date: "2026-06-02", dateEnd: "2026-06-05", location: { name: "San Diego, CA", link: "#", airport: { name: "SAN", link: "#" }, directFlight: true }, approvedStates: ['CA', 'AZ'], stateCode: "CA", boards: [{ name: "ABR", credits: 16, link: "#" }], hotels: [{ name: "Hotel Del Coronado", link: "#", isOfficial: true }], nearbyHotels: [{name: "Glorietta Bay Inn", dist: "0.2 mi", link: "#"}, {name: "Shore House", dist: "0.1 mi", link: "#"}, {name: "Loews Coronado", dist: "4.2 mi", link: "#"}], registrationLink: "#", tags: ['Beach', 'Driving Distance'], isWellness: false },
    { id: 21, title: "Emergency Medicine Rapid Review", officialListing: "#", dateRange: "Feb 22-25, 2026", date: "2026-02-22", dateEnd: "2026-02-25", location: { name: "Miami, FL", link: "#", airport: { name: "MIA", link: "#" }, directFlight: true }, approvedStates: ['FL'], stateCode: "FL", boards: [{ name: "ABEM", credits: 12, link: "#" }], hotels: [{ name: "W South Beach", link: "#", isOfficial: true }], nearbyHotels: [{name: "1 Hotel South Beach", dist: "0.3 mi", link: "#"}, {name: "The Setai", dist: "0.2 mi", link: "#"}, {name: "Aloft Miami", dist: "1.5 mi", link: "#"}], registrationLink: "#", tags: ['Beach', 'Big City/Arts'], isWellness: false },
    { id: 22, title: "Critical Care Nursing Excellence", officialListing: "#", dateRange: "Mar 5-7, 2026", date: "2026-03-05", dateEnd: "2026-03-07", location: { name: "Atlanta, GA", link: "#", airport: { name: "ATL", link: "#" }, directFlight: true }, approvedStates: ['GA', 'FL'], stateCode: "GA", boards: [{ name: "General CME", credits: 10, link: "#" }], hotels: [{ name: "Hyatt Regency", link: "#", isOfficial: true }], nearbyHotels: [{name: "Marriott Marquis", dist: "0.1 mi", link: "#"}, {name: "Hilton Atlanta", dist: "0.2 mi", link: "#"}, {name: "Hotel Indigo", dist: "0.5 mi", link: "#"}], registrationLink: "#", tags: ['Big City/Arts', 'Driving Distance'], isWellness: false },
    { id: 23, title: "Dermatopathology Winter Intensive", officialListing: "#", dateRange: "Feb 2-6, 2026", date: "2026-02-02", dateEnd: "2026-02-06", location: { name: "Park City, UT", link: "#", airport: { name: "SLC", link: "#" }, directFlight: true }, approvedStates: ['UT', 'CO'], stateCode: "UT", boards: [{ name: "ABD", credits: 24, link: "#" }], hotels: [{ name: "Stein Eriksen Lodge", link: "#", isOfficial: true }], nearbyHotels: [{name: "The Chateaux", dist: "0.1 mi", link: "#"}, {name: "Goldener Hirsch", dist: "0.3 mi", link: "#"}, {name: "Silver King", dist: "1.8 mi", link: "#"}], registrationLink: "#", tags: ['Skiing', 'Mountain'], isWellness: false },
    { id: 24, title: "Hematology Highlights", officialListing: "#", dateRange: "July 12-15, 2026", date: "2026-07-12", dateEnd: "2026-07-15", location: { name: "Seattle, WA", link: "#", airport: { name: "SEA", link: "#" }, directFlight: true }, approvedStates: ['WA'], stateCode: "WA", boards: [{ name: "ABIM", credits: 14, link: "#" }], hotels: [{ name: "Fairmont Olympic", link: "#", isOfficial: true }], nearbyHotels: [{name: "Hotel Monaco", dist: "0.2 mi", link: "#"}, {name: "Kimpton Palladian", dist: "0.6 mi", link: "#"}, {name: "State Hotel", dist: "0.4 mi", link: "#"}], registrationLink: "#", tags: ['Big City/Arts'], isWellness: false },
    { id: 6, title: "Mindfulness & Physician Well-being Retreat", officialListing: "#", dateRange: "Sept 12-15, 2026", date: "2026-09-12", dateEnd: "2026-09-15", location: { name: "Sedona, AZ", link: "#", airport: { name: "PHX", link: "#" }, directFlight: true }, approvedStates: [], stateCode: "AZ", boards: [{ name: "General CME", credits: 12, link: "#" }], hotels: [{ name: "Enchantment Resort", link: "#", isOfficial: true }], nearbyHotels: [{name: "Mii Amo", dist: "0.1 mi", link: "#"}, {name: "Amara Resort", dist: "5.2 mi", link: "#"}, {name: "Sky Rock Sedona", dist: "4.8 mi", link: "#"}], registrationLink: "#", tags: ['Yoga/Retreat', 'Relaxation Spa & Wellness'], isWellness: true },
    { id: 7, title: "Internal Medicine Board Review", officialListing: "#", dateRange: "July 20-25, 2026", date: "2026-07-20", dateEnd: "2026-07-25", location: { name: "Chicago, IL", link: "#", airport: { name: "ORD", link: "#" }, directFlight: true }, approvedStates: ['IL', 'IN', 'WI'], stateCode: "IL", boards: [{ name: "ABIM", credits: 30, link: "#" }], hotels: [{ name: "The Drake", link: "#", isOfficial: true }], nearbyHotels: [{name: "The Westin", dist: "0.3 mi", link: "#"}, {name: "The Viceroy", dist: "0.5 mi", link: "#"}, {name: "Waldorf Astoria", dist: "0.6 mi", link: "#"}], registrationLink: "#", tags: ['Big City/Arts', 'One-Stop Flights'], isWellness: false },
    { id: 8, title: "Dermatology: Clinical Pearls & Aesthetics", officialListing: "#", dateRange: "Oct 8-11, 2026", date: "2026-10-08", dateEnd: "2026-10-11", location: { name: "Las Vegas, NV", link: "#", airport: { name: "LAS", link: "#" }, directFlight: true }, approvedStates: ['NV', 'CA'], stateCode: "NV", boards: [{ name: "ABD", credits: 14, link: "#" }], hotels: [{ name: "Bellagio", link: "#", isOfficial: true }], nearbyHotels: [{name: "Caesars Palace", dist: "0.3 mi", link: "#"}, {name: "The Cosmopolitan", dist: "0.2 mi", link: "#"}, {name: "Vdara", dist: "0.4 mi", link: "#"}], registrationLink: "#", tags: ['Just for Fun', 'Big City/Arts'], isWellness: false },
    { id: 9, title: "Primary Care Golf & Clinical Update", officialListing: "#", dateRange: "Nov 4-7, 2026", date: "2026-11-04", dateEnd: "2026-11-07", location: { name: "Scottsdale, AZ", link: "#", airport: { name: "PHX", link: "#" }, directFlight: true }, approvedStates: ['AZ', 'TX'], stateCode: "AZ", boards: [{ name: "ABFM", credits: 15, link: "#" }], hotels: [{ name: "TPC Scottsdale Resort", link: "#", isOfficial: true }], nearbyHotels: [{name: "Fairmont Scottsdale", dist: "0.2 mi", link: "#"}, {name: "Westin Kierland", dist: "2.5 mi", link: "#"}, {name: "Hyatt Regency Gainey", dist: "4.1 mi", link: "#"}], registrationLink: "#", tags: ['Golf', 'Leisure & Sport'], isWellness: false },
    { id: 10, title: "Oncology: Precision Medicine Symposium", officialListing: "#", dateRange: "Dec 1-4, 2026", date: "2026-12-01", dateEnd: "2026-12-04", location: { name: "New York, NY", link: "#", airport: { name: "JFK", link: "#" }, directFlight: true }, approvedStates: ['NY', 'NJ', 'PA'], stateCode: "NY", boards: [{ name: "ABIM", credits: 18, link: "#" }], hotels: [{ name: "Marriott Marquis", link: "#", isOfficial: true }], nearbyHotels: [{name: "The Knickerbocker", dist: "0.2 mi", link: "#"}, {name: "The Westin Times Square", dist: "0.1 mi", link: "#"}, {name: "Edition New York", dist: "0.3 mi", link: "#"}], registrationLink: "#", tags: ['Big City/Arts', 'International'], isWellness: false }
  ], []);

  const filteredCourses = useMemo(() => {
    // Current date reference for filtering (Jan 28, 2026)
    const today = new Date('2026-01-28');

    return allCourses.filter(course => {
      // 1. Time Filter logic
      const courseDate = new Date(course.date);
      
      if (period === '3 Month') {
        const limit = new Date(today);
        limit.setMonth(today.getMonth() + 3);
        if (courseDate < today || courseDate > limit) return false;
      } else if (period === '6 Month') {
        const limit = new Date(today);
        limit.setMonth(today.getMonth() + 6);
        if (courseDate < today || courseDate > limit) return false;
      } else if (period === '12 Month') {
        const limit = new Date(today);
        limit.setMonth(today.getMonth() + 12);
        if (courseDate < today || courseDate > limit) return false;
      } else if (period === 'Specific Date') {
        if (startDate && courseDate < new Date(startDate)) return false;
        if (endDate && courseDate > new Date(endDate)) return false;
      }

      // 2. Existing Filter Logic (Scoped to exclude/include)
      const scopeStateApproved = activeFilters['State Approved'];
      const scopeWellness = activeFilters['General Wellness'];
      if (scopeStateApproved === -1 && !course.isWellness) return false;
      if (scopeWellness === -1 && course.isWellness) return false;

      const excludedKeys = Object.entries(activeFilters).filter(([_, v]) => v === -1).map(([k]) => k);
      if (excludedKeys.includes(course.stateCode)) return false;
      if (course.tags.some(tag => excludedKeys.includes(tag))) return false;
      if (course.approvedStates.some(st => excludedKeys.includes(`LIC_${st}`))) return false;

      const includedKeys = Object.entries(activeFilters).filter(([_, v]) => v === 1).map(([k]) => k);
      const lifestyleInclusions = includedKeys.filter(k => k !== 'State Approved' && k !== 'General Wellness' && !k.startsWith('LIC_'));
      const licenseInclusions = includedKeys.filter(k => k.startsWith('LIC_')).map(k => k.replace('LIC_', ''));

      if (licenseInclusions.length > 0) {
        if (!course.approvedStates.some(st => licenseInclusions.includes(st))) return false;
      }

      if (lifestyleInclusions.length > 0) {
        const stateMatch = lifestyleInclusions.includes(course.stateCode);
        const tagMatch = course.tags.some(tag => lifestyleInclusions.includes(tag));
        if (!stateMatch && !tagMatch) return false;
      }
      return true;
    });
  }, [activeFilters, allCourses, period, startDate, endDate]);

  const toggleFilter = (key: string, type: 1 | -1) => {
    setActiveFilters(prev => {
      const current = prev[key] || 0;
      if (current === type) {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      }
      return { ...prev, [key]: type };
    });
  };

  const toggleCourse = (id: number) => {
    setPlannedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const totalCredits = useMemo(() => {
    return allCourses.filter(c => plannedIds.includes(c.id)).reduce((sum, c) => sum + (c.boards[0]?.credits || 0), 0);
  }, [plannedIds, allCourses]);

  const stateComplianceWithPlanned = useMemo(() => {
    const plannedCourses = allCourses.filter(c => plannedIds.includes(c.id));
    return cmeStatus.states.map((state: any) => {
      const addedCredits = plannedCourses.filter(c => c.approvedStates.includes(state.code)).reduce((sum, c) => sum + (c.boards[0]?.credits || 0), 0);
      return { ...state, projected: state.current + addedCredits };
    });
  }, [plannedIds, allCourses, cmeStatus]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0A0A0A]">
      <nav className="w-full h-16 bg-white border-b border-[#E2E8F0] px-8 flex items-center justify-between sticky top-0 z-[100]">
        <div className="flex items-center gap-8 h-full">
          <button onClick={() => navigate('/cme-status')} className="h-full flex items-center pt-1 text-sm font-bold text-[#64748B] hover:text-[#155DFC]">CME Status</button>
          <button onClick={() => navigate('/cme-preferences')} className="h-full flex items-center pt-1 text-sm font-bold text-[#64748B] hover:text-[#155DFC]">CME Preferences</button>
          <button className="h-full flex items-center pt-1 text-sm font-bold text-[#155DFC] border-b-2 border-[#155DFC]">CME Planner</button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-[#334155]">Dr. Priya Verma</span>
          <button onClick={() => navigate('/profile')} className="w-10 h-10 bg-[#F1F5F9] rounded-full flex items-center justify-center border border-[#E2E8F0]"><User size={22} /></button>
        </div>
      </nav>

      <div className="p-8">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-8">
          <aside className="col-span-3 space-y-4">
            <button className="w-full bg-[#155DFC] text-white py-4 rounded-xl font-bold shadow-sm hover:bg-[#1447E6]">Save Search</button>
            <div className="bg-white rounded-2xl border border-[#D1D5DC] p-6 space-y-6 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                <button 
                  onClick={() => setActiveFilters({})} 
                  className="text-[11px] font-bold text-red-500 hover:text-red-700 hover:underline flex items-center gap-1 transition-colors"
                >
                  <X size={12}/> Clear All
                </button>
              </div>
              <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
                
                <section className="space-y-3">
                  <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">Time Period</h3>
                  <div className="flex flex-col gap-1">
                    {['3 Month', '6 Month', '12 Month', 'Specific Date'].map(t => (
                      <button key={t} onClick={() => setPeriod(t)} className={`text-left px-3 py-1.5 rounded-lg text-[13px] transition-colors ${period === t ? 'bg-blue-50 text-[#155DFC] font-bold' : 'text-[#62748E] hover:bg-slate-50'}`}>{t}</button>
                    ))}
                  </div>
                  
                  {period === 'Specific Date' && (
                    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3 animate-in fade-in slide-in-from-top-2">
                      <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase">Start Date</label>
                        <input 
                          type="date" 
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase">End Date</label>
                        <input 
                          type="date" 
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                      </div>
                    </div>
                  )}
                </section>

                <section className="space-y-3 pt-4 border-t">
                  <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">My Licenses (Accreditation)</h3>
                  {cmeStatus.states.map((state: any) => {
                    const filterKey = `LIC_${state.code}`;
                    const fs = activeFilters[filterKey] || 0;
                    return (
                      <div key={state.code} className="flex items-center justify-between text-[13px]">
                        <span className={fs === 1 ? 'text-emerald-600 font-bold' : fs === -1 ? 'text-red-400 line-through' : ''}>{state.name} Approved</span>
                        <div className="flex gap-1">
                          <button onClick={() => toggleFilter(filterKey, 1)} className={fs === 1 ? 'text-emerald-600' : 'text-gray-300'}><CircleDot size={16}/></button>
                          <button onClick={() => toggleFilter(filterKey, -1)} className={fs === -1 ? 'text-red-500' : 'text-gray-300'}><MinusCircle size={16}/></button>
                        </div>
                      </div>
                    );
                  })}
                </section>

                <section className="space-y-3 pt-4 border-t">
                  <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">Credit Scope</h3>
                  {['State Approved', 'General Wellness'].map(scope => {
                    const fs = activeFilters[scope] || 0;
                    return (
                      <div key={scope} className="flex items-center justify-between text-[13px]">
                        <span className={fs === 1 ? 'text-emerald-600 font-bold' : fs === -1 ? 'text-red-400 line-through' : ''}>{scope}</span>
                        <div className="flex gap-1">
                          <button onClick={() => toggleFilter(scope, 1)} className={fs === 1 ? 'text-emerald-600' : 'text-gray-300'}><CircleDot size={16}/></button>
                          <button onClick={() => toggleFilter(scope, -1)} className={fs === -1 ? 'text-red-500' : 'text-gray-300'}><MinusCircle size={16}/></button>
                        </div>
                      </div>
                    );
                  })}
                </section>

                <section className="space-y-3 pt-4 border-t">
                  <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">CME Location (State)</h3>
                  <div className="relative mb-2">
                    <Search className="absolute left-2 top-2.5 text-slate-400" size={14} />
                    <input type="text" placeholder="Search state..." value={stateSearch} onChange={(e) => setStateSearch(e.target.value)} className="w-full text-xs pl-8 pr-2 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#155DFC]" />
                  </div>
                  <div className="max-h-[160px] overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                    {filteredStates.map(state => {
                      const fs = activeFilters[state.code] || 0;
                      return (
                        <div key={state.code} className="flex items-center justify-between text-[13px]">
                          <span className={fs === 1 ? 'text-emerald-600 font-bold' : fs === -1 ? 'text-red-400 line-through' : ''}>{state.name}</span>
                          <div className="flex gap-1">
                            <button onClick={() => toggleFilter(state.code, 1)} className={fs === 1 ? 'text-emerald-600' : 'text-gray-300'}><CircleDot size={16}/></button>
                            <button onClick={() => toggleFilter(state.code, -1)} className={fs === -1 ? 'text-red-500' : 'text-gray-300'}><MinusCircle size={16}/></button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="space-y-3 pt-4 border-t">
                  <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">Leisure & Sport</h3>
                  {['Golf', 'Tennis', 'Pickleball', 'Skiing', 'National Parks', 'Beach', 'Lake', 'Mountain'].map(item => {
                    const fs = activeFilters[item] || 0;
                    return (
                      <div key={item} className="flex items-center justify-between text-[13px]">
                        <span className={fs === 1 ? 'text-emerald-600 font-bold' : fs === -1 ? 'text-red-400 line-through' : ''}>{item}</span>
                        <div className="flex gap-1">
                          <button onClick={() => toggleFilter(item, 1)} className={fs === 1 ? 'text-emerald-600' : 'text-gray-300'}><CircleDot size={16}/></button>
                          <button onClick={() => toggleFilter(item, -1)} className={fs === -1 ? 'text-red-500' : 'text-gray-300'}><MinusCircle size={16}/></button>
                        </div>
                      </div>
                    );
                  })}
                </section>
              </div>
            </div>
          </aside>

          <main className="col-span-9 space-y-6">
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div className="bg-white rounded-2xl border border-[#D1D5DC] p-8 shadow-sm">
                <h3 className="text-sm font-bold text-[#45556C] mb-4 uppercase tracking-widest">Compliance Overview</h3>
                <div className="space-y-3">
                  {stateComplianceWithPlanned.map((s: any) => (
                    <div key={s.code} className="flex justify-between items-center bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
                      <span className="font-bold text-slate-700">{s.name}</span>
                      <div className="flex items-center gap-2">
                         <span className={`text-xs font-bold ${s.projected > s.current ? 'text-emerald-600' : 'text-slate-400'}`}>
                           {s.current} {s.projected > s.current && `→ ${s.projected}`}
                         </span>
                         <span className="text-blue-600 font-black">/ {s.required} hrs</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#155DFC] rounded-2xl p-8 text-white flex flex-col justify-center shadow-lg">
                <p className="text-xs font-bold uppercase mb-1 tracking-widest opacity-80">Planner Impact</p>
                <h2 className="text-5xl font-black">{totalCredits} <span className="text-2xl font-normal opacity-70">Projected Credits</span></h2>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredCourses.map(course => (
                <div key={course.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="p-5 border-b border-slate-50 bg-slate-50/50">
                    <div className="flex justify-between items-start mb-2">
                      <a href={course.officialListing} target="_blank" rel="noreferrer" className="text-lg font-black text-slate-900 hover:text-[#155DFC] leading-tight group">
                        {course.title} <ExternalLink size={14} className="inline opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      <button 
                        onClick={() => toggleCourse(course.id)} 
                        className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all border ${
                          plannedIds.includes(course.id) 
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : 'bg-white border-[#155DFC] text-[#155DFC] hover:bg-blue-50'
                        }`}
                      >
                        {plannedIds.includes(course.id) ? (
                          <span className="flex items-center gap-1"><Check size={14}/> Added</span>
                        ) : (
                          "Add"
                        )}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {course.approvedStates.map(st => (
                        <span key={st} className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-black rounded uppercase">{st} APPROVED</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                      <span className="flex items-center gap-1"><Calendar size={14}/> {course.dateRange}</span>
                      <a href={course.location.link} className="flex items-center gap-1 text-blue-600 underline"><MapPin size={14}/> {course.location.name}</a>
                    </div>
                  </div>

                  <div className="p-5 flex-grow space-y-4">
                    <div className="flex gap-2">
                      {course.boards.map(b => (
                        <a key={b.name} href={b.link} className="flex-1 flex justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold">
                          <span className="text-slate-500">{b.name}</span>
                          <span className="text-[#155DFC]">{b.credits} Credits</span>
                        </a>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Hotel size={12} /> Nearby Hotels (Non-Associated)
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {course.nearbyHotels?.map((hotel, idx) => (
                          <a key={idx} href={hotel.link} className="flex justify-between items-center p-2 text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-100 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors">
                            <span>{hotel.name}</span>
                            <span className="text-slate-400 font-medium">{hotel.dist}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {course.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">#{tag}</span>
                      ))}
                    </div>
                    <a href={course.registrationLink} className="text-xs font-black text-[#155DFC] hover:underline">Register Now →</a>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

// End of Patch #172