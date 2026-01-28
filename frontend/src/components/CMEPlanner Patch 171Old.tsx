/**
 * CME Planner - License Accreditation Filter
 * Execution Mode: Manual Edit
 * Path: /home/myunix/projects/mycertiq_gemini/frontend/src/components/CMEPlanner.tsx
 * Status: Added "My Licenses" section to sidebar. Filters by course.approvedStates.
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Plus, Check, 
  CircleDot, MinusCircle, User,
  ExternalLink, Search, X
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
    { id: 1, title: "Cardiovascular Medicine: Interventional Mastery", officialListing: "#", dateRange: "Mar 12-16, 2026", date: "2026-03-12", dateEnd: "2026-03-16", location: { name: "Maui, HI", link: "#", airport: { name: "OGG", link: "#" }, directFlight: true }, approvedStates: ['FL', 'MA', 'HI'], stateCode: "HI", boards: [{ name: "ABIM", credits: 15, link: "#" }], hotels: [{ name: "Grand Wailea", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Beach', 'Luxury Resort', 'Direct Flights'], isWellness: false },
    { id: 2, title: "Pediatric Emergency Medicine Summit", officialListing: "#", dateRange: "Apr 5-8, 2026", date: "2026-04-05", dateEnd: "2026-04-08", location: { name: "Orlando, FL", link: "#", airport: { name: "MCO", link: "#" }, directFlight: true }, approvedStates: ['FL', 'GA', 'TX'], stateCode: "FL", boards: [{ name: "ABP", credits: 18, link: "#" }], hotels: [{ name: "Disney Yacht Club", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Family & Fun', 'Theme Parks/Amusement'], isWellness: false },
    { id: 3, title: "Neurology Update & Stroke Management", officialListing: "#", dateRange: "May 10-14, 2026", date: "2026-05-10", dateEnd: "2026-05-14", location: { name: "Boston, MA", link: "#", airport: { name: "BOS", link: "#" }, directFlight: true }, approvedStates: ['MA', 'NY', 'CT'], stateCode: "MA", boards: [{ name: "ABPN", credits: 20, link: "#" }], hotels: [{ name: "The Liberty Hotel", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Big City/Arts', 'Driving Distance'], isWellness: false },
    { id: 4, title: "Alpine Sports Medicine & Orthopedic Care", officialListing: "#", dateRange: "Feb 15-20, 2026", date: "2026-02-15", dateEnd: "2026-02-20", location: { name: "Aspen, CO", link: "#", airport: { name: "ASE", link: "#" }, directFlight: false }, approvedStates: ['CO', 'UT'], stateCode: "CO", boards: [{ name: "ABOS", credits: 22, link: "#" }], hotels: [{ name: "Little Nell", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Skiing', 'Mountain'], isWellness: false },
    { id: 5, title: "Radiology: Advanced Imaging Techniques", officialListing: "#", dateRange: "June 2-5, 2026", date: "2026-06-02", dateEnd: "2026-06-05", location: { name: "San Diego, CA", link: "#", airport: { name: "SAN", link: "#" }, directFlight: true }, approvedStates: ['CA', 'AZ'], stateCode: "CA", boards: [{ name: "ABR", credits: 16, link: "#" }], hotels: [{ name: "Hotel Del Coronado", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Beach', 'Driving Distance'], isWellness: false },
    { id: 6, title: "Mindfulness & Physician Well-being Retreat", officialListing: "#", dateRange: "Sept 12-15, 2026", date: "2026-09-12", dateEnd: "2026-09-15", location: { name: "Sedona, AZ", link: "#", airport: { name: "PHX", link: "#" }, directFlight: true }, approvedStates: [], stateCode: "AZ", boards: [{ name: "General CME", credits: 12, link: "#" }], hotels: [{ name: "Enchantment Resort", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Yoga/Retreat', 'Relaxation Spa & Wellness'], isWellness: true },
    { id: 7, title: "Internal Medicine Board Review", officialListing: "#", dateRange: "July 20-25, 2026", date: "2026-07-20", dateEnd: "2026-07-25", location: { name: "Chicago, IL", link: "#", airport: { name: "ORD", link: "#" }, directFlight: true }, approvedStates: ['IL', 'IN', 'WI'], stateCode: "IL", boards: [{ name: "ABIM", credits: 30, link: "#" }], hotels: [{ name: "The Drake", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Big City/Arts', 'One-Stop Flights'], isWellness: false },
    { id: 8, title: "Dermatology: Clinical Pearls & Aesthetics", officialListing: "#", dateRange: "Oct 8-11, 2026", date: "2026-10-08", dateEnd: "2026-10-11", location: { name: "Las Vegas, NV", link: "#", airport: { name: "LAS", link: "#" }, directFlight: true }, approvedStates: ['NV', 'CA'], stateCode: "NV", boards: [{ name: "ABD", credits: 14, link: "#" }], hotels: [{ name: "Bellagio", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Just for Fun', 'Big City/Arts'], isWellness: false },
    { id: 9, title: "Primary Care Golf & Clinical Update", officialListing: "#", dateRange: "Nov 4-7, 2026", date: "2026-11-04", dateEnd: "2026-11-07", location: { name: "Scottsdale, AZ", link: "#", airport: { name: "PHX", link: "#" }, directFlight: true }, approvedStates: ['AZ', 'TX'], stateCode: "AZ", boards: [{ name: "ABFM", credits: 15, link: "#" }], hotels: [{ name: "TPC Scottsdale Resort", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Golf', 'Leisure & Sport'], isWellness: false },
    { id: 10, title: "Oncology: Precision Medicine Symposium", officialListing: "#", dateRange: "Dec 1-4, 2026", date: "2026-12-01", dateEnd: "2026-12-04", location: { name: "New York, NY", link: "#", airport: { name: "JFK", link: "#" }, directFlight: true }, approvedStates: ['NY', 'NJ', 'PA'], stateCode: "NY", boards: [{ name: "ABIM", credits: 18, link: "#" }], hotels: [{ name: "Marriott Marquis", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Big City/Arts', 'International'], isWellness: false },
    { id: 11, title: "Pacific Northwest Infectious Disease", officialListing: "#", dateRange: "Aug 15-18, 2026", date: "2026-08-15", dateEnd: "2026-08-18", location: { name: "Seattle, WA", link: "#", airport: { name: "SEA", link: "#" }, directFlight: true }, approvedStates: ['WA', 'OR'], stateCode: "WA", boards: [{ name: "ABIM", credits: 16, link: "#" }], hotels: [{ name: "W Seattle", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Big City/Arts'], isWellness: false },
    { id: 12, title: "Gastroenterology in the Gulf", officialListing: "#", dateRange: "Jan 12-15, 2026", date: "2026-01-12", dateEnd: "2026-01-15", location: { name: "New Orleans, LA", link: "#", airport: { name: "MSY", link: "#" }, directFlight: true }, approvedStates: ['LA', 'MS', 'AL'], stateCode: "LA", boards: [{ name: "ABIM", credits: 14, link: "#" }], hotels: [{ name: "The Roosevelt", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Just for Fun', 'Fine Dining'], isWellness: false },
    { id: 13, title: "Ophthalmology: Retina Frontiers", officialListing: "#", dateRange: "Mar 22-25, 2026", date: "2026-03-22", dateEnd: "2026-03-25", location: { name: "Park City, UT", link: "#", airport: { name: "SLC", link: "#" }, directFlight: true }, approvedStates: ['UT', 'WY'], stateCode: "UT", boards: [{ name: "ABO", credits: 20, link: "#" }], hotels: [{ name: "Montage Park City", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Skiing', 'Mountain'], isWellness: false },
    { id: 14, title: "Rural Medicine & Urgent Care", officialListing: "#", dateRange: "May 5-8, 2026", date: "2026-05-05", dateEnd: "2026-05-08", location: { name: "Boise, ID", link: "#", airport: { name: "BOI", link: "#" }, directFlight: false }, approvedStates: ['ID', 'MT'], stateCode: "ID", boards: [{ name: "ABFM", credits: 12, link: "#" }], hotels: [{ name: "Inn at 500", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Mountain', 'Driving Distance'], isWellness: false },
    { id: 15, title: "Global Health & Tropical Medicine", officialListing: "#", dateRange: "June 15-22, 2026", date: "2026-06-15", dateEnd: "2026-06-22", location: { name: "San Jose, Costa Rica", link: "#", airport: { name: "SJO", link: "#" }, directFlight: true }, approvedStates: [], stateCode: "INT", boards: [{ name: "General CME", credits: 25, link: "#" }], hotels: [{ name: "Official Resort", link: "#", isOfficial: true }], registrationLink: "#", tags: ['International', 'Yoga/Retreat'], isWellness: false },
    { id: 16, title: "Psychiatry: Pediatric Anxiety disorders", officialListing: "#", dateRange: "Sept 5-8, 2026", date: "2026-09-05", dateEnd: "2026-09-08", location: { name: "Washington DC", link: "#", airport: { name: "DCA", link: "#" }, directFlight: true }, approvedStates: ['DC', 'VA', 'MD'], stateCode: "DC", boards: [{ name: "ABPN", credits: 15, link: "#" }], hotels: [{ name: "The Hay-Adams", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Big City/Arts'], isWellness: false },
    { id: 17, title: "Anesthesiology Critical Care Review", officialListing: "#", dateRange: "Oct 15-18, 2026", date: "2026-10-15", dateEnd: "2026-10-18", location: { name: "Nashville, TN", link: "#", airport: { name: "BNA", link: "#" }, directFlight: true }, approvedStates: ['TN', 'KY'], stateCode: "TN", boards: [{ name: "ABA", credits: 18, link: "#" }], hotels: [{ name: "Omni Nashville", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Just for Fun', 'Big City/Arts'], isWellness: false },
    { id: 18, title: "Geriatrics: Longevity & Age Management", officialListing: "#", dateRange: "Nov 10-13, 2026", date: "2026-11-10", dateEnd: "2026-11-13", location: { name: "Palm Springs, CA", link: "#", airport: { name: "PSP", link: "#" }, directFlight: true }, approvedStates: ['CA', 'NV'], stateCode: "CA", boards: [{ name: "ABIM", credits: 14, link: "#" }], hotels: [{ name: "Ritz Carlton Rancho Mirage", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Golf', 'Boutique Stay'], isWellness: false },
    { id: 19, title: "The Art of Surgery: Advanced Laparoscopy", officialListing: "#", dateRange: "Feb 1-4, 2026", date: "2026-02-01", dateEnd: "2026-02-04", location: { name: "Austin, TX", link: "#", airport: { name: "AUS", link: "#" }, directFlight: true }, approvedStates: ['TX', 'OK'], stateCode: "TX", boards: [{ name: "ABS", credits: 20, link: "#" }], hotels: [{ name: "Fairmont Austin", link: "#", isOfficial: true }], registrationLink: "#", tags: ['Big City/Arts', 'Driving Distance'], isWellness: false },
    { id: 20, title: "Photography for Clinicians: Zion Expedition", officialListing: "#", dateRange: "Sept 14-18, 2026", date: "2026-09-14", dateEnd: "2026-09-18", location: { name: "Virgin, UT", link: "#", airport: { name: "LAS", link: "#" }, directFlight: true }, approvedStates: [], stateCode: "UT", boards: [{ name: "General CME", credits: 8, link: "#" }], hotels: [{ name: "Under Canvas Zion", link: "#", isOfficial: true }], registrationLink: "#", tags: ['National Parks', 'Just for Fun'], isWellness: true }
  ], []);

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const scopeStateApproved = activeFilters['State Approved'];
      const scopeWellness = activeFilters['General Wellness'];
      if (scopeStateApproved === -1 && !course.isWellness) return false;
      if (scopeWellness === -1 && course.isWellness) return false;

      const excludedKeys = Object.entries(activeFilters).filter(([_, v]) => v === -1).map(([k]) => k);
      if (excludedKeys.includes(course.stateCode)) return false;
      if (course.tags.some(tag => excludedKeys.includes(tag))) return false;
      
      // New Exclusion Logic: If a license state is excluded, remove courses that fulfill it
      if (course.approvedStates.some(st => excludedKeys.includes(`LIC_${st}`))) return false;

      const includedKeys = Object.entries(activeFilters).filter(([_, v]) => v === 1).map(([k]) => k);
      const lifestyleInclusions = includedKeys.filter(k => k !== 'State Approved' && k !== 'General Wellness' && !k.startsWith('LIC_'));
      const licenseInclusions = includedKeys.filter(k => k.startsWith('LIC_')).map(k => k.replace('LIC_', ''));

      // Intersection Logic for Licenses (OR)
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
  }, [activeFilters, allCourses]);

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

                <section className="space-y-3 pt-4 border-t">
                  <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">Family & Fun</h3>
                  {['Just for Fun', 'Theme Parks', 'Resorts', 'All Inclusive', 'Cruises', 'Kids Approved', 'Teens Approved', 'Pet Approved'].map(item => {
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

                <section className="space-y-3 pt-4 border-t">
                  <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">Relaxation & Wellness</h3>
                  {['Yoga/Retreat', 'Beachfront', 'Fine Dining', 'Boutique Stay'].map(item => {
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

                <section className="space-y-3 pt-4 border-t">
                  <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">Travel Ease</h3>
                  {['Direct Flights', 'One-Stop Flights', 'Driving Distance', 'International', 'Big City/Arts'].map(item => {
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

                    <div className="grid grid-cols-2 gap-4 text-[11px] pt-2 border-t border-slate-100">
                      <div>
                        <p className="font-black text-slate-400 uppercase tracking-tighter mb-1">Lodging</p>
                        {course.hotels.map(h => (
                          <a key={h.name} href={h.link} className={`block truncate hover:underline ${h.isOfficial ? 'font-bold text-[#155DFC]' : 'text-slate-500'}`}>{h.name}</a>
                        ))}
                      </div>
                      <div>
                        <p className="font-black text-slate-400 uppercase tracking-tighter mb-1">Travel</p>
                        <a href={course.location.airport.link} className="block text-slate-500 hover:underline">Airport: {course.location.airport.name}</a>
                        {course.location.directFlight && <span className="text-green-600 font-bold block">✈️ Direct Flight</span>}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50/30 border-t border-slate-100 flex gap-2">
                    <button className="flex-1 bg-[#155DFC] text-white py-2 rounded-lg text-xs font-black shadow-sm hover:bg-[#1447E6]">Register Now</button>
                    <button 
                      onClick={() => toggleCourse(course.id)}
                      className={`px-6 py-2 rounded-lg text-xs font-black border transition-all ${plannedIds.includes(course.id) ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-200 text-slate-900'}`}
                    >
                      {plannedIds.includes(course.id) ? (
                        <span className="flex items-center gap-1"><Check size={14}/> Added</span>
                      ) : (
                        <span className="flex items-center gap-1"><Plus size={14}/> Add</span>
                      )}
                    </button>
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

// End of Patch #171