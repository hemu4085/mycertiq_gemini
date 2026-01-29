/**
 * Cursor Agent Patch #CP179 - Restore Detailed Course Card Information
 * Execution Mode: Atomic Update
 * Path: /home/myunix/projects/mycertiq_gemini/frontend/src/components/CMEPlanner.tsx
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Check, Plane,
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
    { id: 1, title: "Cardiovascular Medicine: Interventional Mastery", officialListing: "#", dateRange: "Mar 12-16, 2026", date: "2026-03-12", dateEnd: "2026-03-16", location: { name: "Maui, HI", link: "#", airport: { name: "OGG", link: "#", dist: "15 mi" }, directFlight: true }, approvedStates: ['FL', 'MA', 'HI'], stateCode: "HI", boards: [{ name: "ABIM", credits: 15, link: "#" }], hotels: [{ name: "Grand Wailea", link: "#", isOfficial: true }], nearbyHotels: [{name: "Four Seasons Maui", dist: "0.4 mi", link: "#"}, {name: "Andaz Maui", dist: "1.2 mi", link: "#"}, {name: "Hotel Wailea", dist: "2.5 mi", link: "#"}], registrationLink: "#", tags: ['Beach', 'Luxury Resort', 'Direct Flights', 'General Electives'], isWellness: false },
    { id: 2, title: "Pediatric Emergency Medicine Summit", officialListing: "#", dateRange: "Apr 5-8, 2026", date: "2026-04-05", dateEnd: "2026-04-08", location: { name: "Orlando, FL", link: "#", airport: { name: "MCO", link: "#", dist: "12 mi" }, directFlight: true }, approvedStates: ['FL', 'GA', 'TX'], stateCode: "FL", boards: [{ name: "ABP", credits: 18, link: "#" }], hotels: [{ name: "Disney Yacht Club", link: "#", isOfficial: true }], nearbyHotels: [{name: "Swan Reserve", dist: "0.8 mi", link: "#"}, {name: "Wyndham Grand", dist: "2.1 mi", link: "#"}, {name: "Waldorf Astoria", dist: "3.4 mi", link: "#"}], registrationLink: "#", tags: ['Family & Fun', 'Theme Parks', 'General Electives'], isWellness: false },
    { id: 11, title: "Florida Medical Errors & HIV Update", officialListing: "#", dateRange: "Apr 10, 2026", date: "2026-04-10", dateEnd: "2026-04-10", location: { name: "Miami, FL", link: "#", airport: { name: "MIA", link: "#", dist: "8 mi" }, directFlight: true }, approvedStates: ['FL'], stateCode: "FL", boards: [{ name: "General CME", credits: 5, link: "#" }], hotels: [], nearbyHotels: [], registrationLink: "#", tags: ['Mandatory (Errors/HIV)', 'Driving Distance'], isWellness: false },
    { id: 3, title: "Neurology Update & Stroke Management", officialListing: "#", dateRange: "May 10-14, 2026", date: "2026-05-10", dateEnd: "2026-05-14", location: { name: "Boston, MA", link: "#", airport: { name: "BOS", link: "#", dist: "4 mi" }, directFlight: true }, approvedStates: ['MA', 'NY', 'CT'], stateCode: "MA", boards: [{ name: "ABPN", credits: 20, link: "#" }], hotels: [{ name: "The Liberty Hotel", link: "#", isOfficial: true }], nearbyHotels: [{name: "The Whitney", dist: "0.3 mi", link: "#"}, {name: "Wyndham Beacon Hill", dist: "0.5 mi", link: "#"}, {name: "XV Beacon", dist: "0.9 mi", link: "#"}], registrationLink: "#", tags: ['Big City/Arts', 'Driving Distance', 'General Electives'], isWellness: false },
    { id: 4, title: "Alpine Sports Medicine & Orthopedic Care", officialListing: "#", dateRange: "Feb 15-20, 2026", date: "2026-02-15", dateEnd: "2026-02-20", location: { name: "Aspen, CO", link: "#", airport: { name: "ASE", link: "#", dist: "3 mi" }, directFlight: false }, approvedStates: ['CO', 'UT'], stateCode: "CO", boards: [{ name: "ABOS", credits: 22, link: "#" }], hotels: [{ name: "Little Nell", link: "#", isOfficial: true }], nearbyHotels: [{name: "St. Regis Aspen", dist: "0.2 mi", link: "#"}, {name: "Hotel Jerome", dist: "0.5 mi", link: "#"}, {name: "Limelight Hotel", dist: "0.4 mi", link: "#"}], registrationLink: "#", tags: ['Skiing', 'Mountain', 'General Electives'], isWellness: false },
    { id: 6, title: "Mindfulness & Physician Well-being Retreat", officialListing: "#", dateRange: "Sept 12-15, 2026", date: "2026-09-12", dateEnd: "2026-09-15", location: { name: "Sedona, AZ", link: "#", airport: { name: "PHX", link: "#", dist: "115 mi" }, directFlight: true }, approvedStates: [], stateCode: "AZ", boards: [{ name: "General CME", credits: 12, link: "#" }], hotels: [{ name: "Enchantment Resort", link: "#", isOfficial: true }], nearbyHotels: [{name: "Mii Amo", dist: "0.1 mi", link: "#"}, {name: "Amara Resort", dist: "5.2 mi", link: "#"}, {name: "Sky Rock Sedona", dist: "4.8 mi", link: "#"}], registrationLink: "#", tags: ['Yoga/Retreat', 'General Wellness'], isWellness: true },
    { id: 9, title: "Primary Care Golf & Clinical Update", officialListing: "#", dateRange: "Nov 4-7, 2026", date: "2026-11-04", dateEnd: "2026-11-07", location: { name: "Scottsdale, AZ", link: "#", airport: { name: "PHX", link: "#", dist: "20 mi" }, directFlight: true }, approvedStates: ['AZ', 'TX'], stateCode: "AZ", boards: [{ name: "ABFM", credits: 15, link: "#" }], hotels: [{ name: "TPC Scottsdale Resort", link: "#", isOfficial: true }], nearbyHotels: [{name: "Fairmont Scottsdale", dist: "0.2 mi", link: "#"}, {name: "Westin Kierland", dist: "2.5 mi", link: "#"}, {name: "Hyatt Regency Gainey", dist: "4.1 mi", link: "#"}], registrationLink: "#", tags: ['Golf', 'General Electives'], isWellness: false }
  ], []);

  const filteredCourses = useMemo(() => {
    const today = new Date('2026-01-28');

    return allCourses.filter(course => {
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

      const scopeStateApproved = activeFilters['State Approved'];
      const scopeWellness = activeFilters['General Wellness'];
      const scopeMandatory = activeFilters['Mandatory (Errors/HIV)'];
      const scopeElectives = activeFilters['General Electives'];

      if (scopeStateApproved === -1 && !course.isWellness) return false;
      if (scopeWellness === 1 && !course.tags.includes('General Wellness')) return false;
      if (scopeWellness === -1 && course.tags.includes('General Wellness')) return false;
      if (scopeMandatory === 1 && !course.tags.includes('Mandatory (Errors/HIV)')) return false;
      if (scopeMandatory === -1 && course.tags.includes('Mandatory (Errors/HIV)')) return false;
      if (scopeElectives === 1 && !course.tags.includes('General Electives')) return false;
      if (scopeElectives === -1 && course.tags.includes('General Electives')) return false;

      const excludedKeys = Object.entries(activeFilters).filter(([_, v]) => v === -1).map(([k]) => k);
      if (excludedKeys.includes(course.stateCode)) return false;
      if (course.tags.some(tag => excludedKeys.includes(tag))) return false;
      if (course.approvedStates.some(st => excludedKeys.includes(`LIC_${st}`))) return false;

      const includedKeys = Object.entries(activeFilters).filter(([_, v]) => v === 1).map(([k]) => k);
      const lifestyleInclusions = includedKeys.filter(k => 
        k !== 'State Approved' && k !== 'General Wellness' && 
        k !== 'Mandatory (Errors/HIV)' && k !== 'General Electives' && 
        !k.startsWith('LIC_')
      );
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
    
    const stateData = cmeStatus.states.map((state: any) => {
      const addedCredits = plannedCourses.filter(c => c.approvedStates.includes(state.code)).reduce((sum, c) => sum + (c.boards[0]?.credits || 0), 0);
      return { ...state, projected: state.current + addedCredits };
    });

    const totalCurrent = cmeStatus.states.reduce((sum: number, s: any) => sum + s.current, 0);
    const totalRequired = cmeStatus.states.reduce((sum: number, s: any) => sum + s.required, 0);
    const totalAdded = plannedCourses.reduce((sum, c) => sum + (c.boards[0]?.credits || 0), 0);

    return [
      ...stateData,
      { 
        name: "Total Elective Progress", 
        code: "TOTAL", 
        current: totalCurrent, 
        projected: totalCurrent + totalAdded, 
        required: totalRequired,
        isTotal: true 
      }
    ];
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
                  {['State Approved', 'Mandatory (Errors/HIV)', 'General Electives', 'General Wellness'].map(scope => {
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
                    <div 
                      key={s.code} 
                      className={`flex justify-between items-center p-3 rounded-lg border ${
                        s.isTotal ? 'bg-blue-50 border-blue-200' : 'bg-[#F8FAFC] border-[#E2E8F0]'
                      }`}
                    >
                      <span className={`font-bold ${s.isTotal ? 'text-blue-700' : 'text-slate-700'}`}>{s.name}</span>
                      <div className="flex items-center gap-2">
                         <span className={`text-xs font-bold ${s.projected > s.current ? 'text-emerald-600' : 'text-slate-400'}`}>
                           {s.current} {s.projected > s.current && `→ ${s.projected}`}
                         </span>
                         <span className={`${s.isTotal ? 'text-blue-700' : 'text-blue-600'} font-black`}>/ {s.required} hrs</span>
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
                    <div className="flex flex-col gap-1 text-xs font-bold text-slate-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><Calendar size={14}/> {course.dateRange}</span>
                        <a href={course.location.link} className="flex items-center gap-1 text-blue-600 underline"><MapPin size={14}/> {course.location.name}</a>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <a href={course.location.airport?.link} className="flex items-center gap-1 text-slate-400 hover:text-blue-500">
                          <Plane size={14}/> {course.location.airport?.name} ({course.location.airport?.dist})
                        </a>
                        {course.location.directFlight && (
                          <span className="flex items-center text-emerald-600 text-[10px] gap-0.5">
                            <Plane size={10} className="rotate-45"/> Direct
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-grow space-y-4">
                    <div className="flex gap-2">
                      {course.boards.map(b => (
                        <div key={b.name} className="flex-1 flex justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold">
                          <span className="text-slate-500">{b.name}</span>
                          <span className="text-[#155DFC]">{b.credits} Credits</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hotels</p>
                      {course.hotels.map(h => (
                        <a key={h.name} href={h.link} className="flex items-center justify-between p-2.5 rounded-xl border border-blue-100 bg-blue-50/50 group hover:border-blue-300 transition-colors">
                          <div className="flex items-center gap-2">
                            <Hotel size={14} className="text-blue-600"/>
                            <span className="text-xs font-bold text-blue-900">{h.name}</span>
                          </div>
                          <span className="text-[9px] font-black text-blue-600 uppercase">Official Venue</span>
                        </a>
                      ))}
                      <div className="grid grid-cols-1 gap-1.5">
                        {course.nearbyHotels.map(h => (
                          <a key={h.name} href={h.link} className="flex items-center justify-between p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all">
                            <span className="text-[11px] font-bold text-slate-700">{h.name}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{h.dist}</span>
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

// End of Patch #CP179