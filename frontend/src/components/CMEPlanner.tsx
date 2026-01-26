/**
 * CME Planner Filter Logic Implementation (v1.2.1)
 * Implements the hierarchical "Sieve" approach as specified:
 * Pass 1: Hard Veto (EXCLUDE -1)
 * Pass 2: Temporal (Date Range Overlap)
 * Pass 3: Whitelist (INCLUDE +1)
 * Pass 4: Regulatory (approvedStates mapping - handled in compliance calculation)
 * Path: /home/myunix/projects/mycertiq_gemini/frontend/src/components/CMEPlanner.tsx
 */

import React, { useState, useMemo } from 'react';
import { 
  Calendar, MapPin, Plus, Check, 
  CircleDot, MinusCircle, CheckCircle2
} from 'lucide-react';

const DEFAULT_CME_STATUS = {
  states: [
    { name: "Florida", code: "FL", current: 8, required: 30 },
    { name: "Massachusetts", code: "MA", current: 12, required: 50 },
    { name: "Iowa", code: "IA", current: 5, required: 40 }
  ]
};

// All available states for the filter list (Full US Jurisdiction Support)
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

// Tri-state filter values: -1 (EXCLUDE), +1 (INCLUDE), 0/null (Neutral)
type FilterState = -1 | 1 | 0 | null;

export const CMEPlanner = ({ cmeStatus = DEFAULT_CME_STATUS }: any) => {
  const [period, setPeriod] = useState('12 Month');
  const [customDates, setCustomDates] = useState({ start: '', end: '' });
  const [plannedIds, setPlannedIds] = useState<number[]>([]);
  const [stateSearch, setStateSearch] = useState('');
  
  // Tri-state filter system: -1 (exclude), +1 (include), 0/null (neutral)
  const [activeFilters, setActiveFilters] = useState<Record<string, FilterState>>({});

  // Filter states based on search query
  const filteredStates = useMemo(() => {
    const query = stateSearch.toLowerCase().trim();
    if (!query) return US_STATES;
    return US_STATES.filter(s => 
      s.name.toLowerCase().includes(query) || 
      s.code.toLowerCase().includes(query)
    );
  }, [stateSearch]);

  const allCourses = useMemo(() => [
    { 
      id: 1, title: "Cardiovascular Medicine: Interventional Mastery", credits: 15, approvedStates: ['FL', 'MA'],
      regFee: 1295, venue: "Grand Wailea Resort", address: "3850 Wailea Alanui Dr, Kihei, HI 96753",
      stateCode: "HI", stateName: "Hawaii",
      nearby: [{ name: "Four Seasons Maui", url: "#" }],
      airport: { name: "Kahului (OGG)", url: "#" }, date: "2026-03-12", dateEnd: "2026-03-16", displayDate: "Mar 12-16, 2026", 
      tags: ['Beach', 'Luxury Resort', 'Direct Flights'],
      isWellness: false // Regulatory Course
    },
    { 
      id: 2, title: "Rocky Mountain Winter Conference on EM", credits: 18, approvedStates: ['MA', 'IA'],
      regFee: 950, venue: "Viewline Resort Snowmass", address: "100 Elbert Ln, Snowmass Village, CO 81615",
      stateCode: "CO", stateName: "Colorado",
      nearby: [{ name: "Limelight Snowmass", url: "#" }],
      airport: { name: "Aspen (ASE)", url: "#" }, date: "2026-02-28", dateEnd: "2026-03-04", displayDate: "Feb 28 - Mar 4, 2026", 
      tags: ['Skiing', 'Mountain', 'Resorts'],
      isWellness: false // Regulatory Course
    },
    { 
      id: 3, title: "Essentials in Primary Care: Winter Session", credits: 20, approvedStates: ['FL', 'IA'],
      regFee: 895, venue: "The Ritz-Carlton, Naples", address: "280 Vanderbilt Beach Rd, Naples, FL 34108",
      stateCode: "FL", stateName: "Florida",
      nearby: [{ name: "LaPlaya Beach Resort", url: "#" }],
      airport: { name: "Fort Myers (RSW)", url: "#" }, date: "2026-02-09", dateEnd: "2026-02-13", displayDate: "Feb 9-13, 2026", 
      tags: ['Beach', 'Golf', 'Fine Dining'],
      isWellness: false // Regulatory Course
    },
    { 
      id: 6, title: "Holistic Physician: Mind-Body Integration", credits: 10, approvedStates: [], 
      regFee: 650, venue: "Miraval Arizona", address: "5000 E. Via Estancia Miraval, Tucson, AZ 85739",
      stateCode: "AZ", stateName: "Arizona",
      nearby: [{ name: "Canyon Ranch Tucson", url: "#" }],
      airport: { name: "Tucson International (TUS)", url: "#" }, date: "2026-04-05", dateEnd: "2026-04-08", displayDate: "Apr 5-8, 2026", 
      tags: ['Yoga/Retreat', 'Boutique Stay'],
      isWellness: true // Non-Regulatory/Wellness Course
    },
    { 
      id: 7, title: "Culinary Medicine & Napa Valley Viticulture", credits: 12, approvedStates: ['CA'],
      regFee: 1100, venue: "The CIA at Copia", address: "500 First St, Napa, CA 94559",
      stateCode: "CA", stateName: "California",
      nearby: [{ name: "Auberge du Soleil", url: "#" }],
      airport: { name: "San Francisco (SFO)", url: "#" }, date: "2026-06-10", dateEnd: "2026-06-12", displayDate: "June 10-12, 2026", 
      tags: ['Fine Dining', 'Just for Fun', 'Boutique Stay'],
      isWellness: true 
    },
    { 
      id: 8, title: "Photography for Clinicians: National Park Expedition", credits: 8, approvedStates: [],
      regFee: 1450, venue: "Under Canvas Zion", address: "3955 Kolob Terrace Rd, Virgin, UT 84779",
      stateCode: "UT", stateName: "Utah",
      nearby: [{ name: "Zion Lodge", url: "#" }],
      airport: { name: "Las Vegas (LAS)", url: "#" }, date: "2026-09-14", dateEnd: "2026-09-18", displayDate: "Sept 14-18, 2026", 
      tags: ['National Parks', 'Just for Fun', 'Photography'],
      isWellness: true 
    }
  ], []);

  /**
   * Hierarchical "Sieve" Filter Logic (v1.2.1 + Credit Scope)
   * Courses are processed through sequential layers.
   * If a course fails a layer, it is excluded immediately.
   */
  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      // PASS 0: Credit Scope Logic (Highest Priority)
      const scopeStateApproved = activeFilters['State Approved'];
      const scopeWellness = activeFilters['General Wellness'];

      // If "State Approved" is excluded, hide regulatory courses
      if (scopeStateApproved === -1 && !course.isWellness) return false;
      // If "General Wellness" is excluded, hide wellness courses
      if (scopeWellness === -1 && course.isWellness) return false;

      // Inclusion Logic: If either is "Included", filter strictly
      if (scopeStateApproved === 1 || scopeWellness === 1) {
        const matchesState = scopeStateApproved === 1 && !course.isWellness;
        const matchesWellness = scopeWellness === 1 && course.isWellness;
        if (!matchesState && !matchesWellness) return false;
      }

      // PASS 1: Hard Veto (Critical Priority)
      // If StateCode OR Tag is marked EXCLUDE (-1), hide the course immediately
      const excludedStates = Object.entries(activeFilters)
        .filter(([_, val]) => val === -1)
        .map(([k]) => k);
      
      // Exclude credit scope filters from state/tag veto (already handled in PASS 0)
      const excludedFilters = excludedStates.filter(k => k !== 'State Approved' && k !== 'General Wellness');
      
      if (excludedFilters.includes(course.stateCode)) return false; // Veto by StateCode
      if (course.tags.some(tag => excludedFilters.includes(tag))) return false; // Veto by Tag

      // PASS 2: Temporal (High Priority)
      // If Period is "Specific Date Range", check overlap: (CStart <= UEnd) AND (CEnd >= UStart)
      if (period === 'Specific Date Range' && customDates.start && customDates.end) {
        const cStart = new Date(course.date);
        const cEnd = new Date(course.dateEnd);
        const uStart = new Date(customDates.start);
        const uEnd = new Date(customDates.end);
        
        // Date overlap check: course overlaps if (CStart <= UEnd) AND (CEnd >= UStart)
        if (!(cStart <= uEnd && cEnd >= uStart)) return false;
      }

      // PASS 3: Whitelist (Medium Priority)
      // If ANY filter is marked INCLUDE (+1), hide everything that does not match at least one Green selection
      const includedFilters = Object.entries(activeFilters)
        .filter(([_, val]) => val === 1)
        .map(([k]) => k);
      
      // Filter out credit scope filters from lifestyle/state matching (already handled in PASS 0)
      const lifestyleTags = includedFilters.filter(i => i !== 'State Approved' && i !== 'General Wellness');
      
      if (lifestyleTags.length > 0) {
        // Course must match at least one included state OR at least one included tag
        const stateMatch = lifestyleTags.includes(course.stateCode);
        const tagMatch = course.tags.some(tag => lifestyleTags.includes(tag));
        if (!stateMatch && !tagMatch) return false; // No match to any included filter
      }

      // PASS 4: Regulatory (Standard Priority)
      // Mapping approvedStates to user's license profile is handled in creditProgress calculation
      // This pass doesn't filter courses, only updates compliance bars
      
      return true;
    });
  }, [activeFilters, allCourses, period, customDates]);

  /**
   * Toggle filter between tri-states: Neutral (0/null) → Include (+1) → Exclude (-1) → Neutral
   */
  const toggleFilter = (key: string, type: 1 | -1) => {
    setActiveFilters(prev => {
      const current = prev[key] || 0;
      // If clicking the same type, reset to neutral (0/null)
      if (current === type) {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      }
      // Otherwise, set to the clicked type
      return { ...prev, [key]: type };
    });
  };

  const toggleCourse = (id: number) => {
    setPlannedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  /**
   * Total Credits: Sum of all credits where plannedIds.includes(course.id)
   * Uses filteredCourses to ensure we only count visible courses
   */
  const totalCredits = useMemo(() => {
    return filteredCourses
      .filter(c => plannedIds.includes(c.id))
      .reduce((sum, c) => sum + c.credits, 0);
  }, [filteredCourses, plannedIds]);

  /**
   * Projected Compliance: Current Credits + Planned Credits
   * where course.approvedStates matches user.licenseState
   * (Pass 4: Regulatory mapping)
   */
  const creditProgress = useMemo(() => {
    return (cmeStatus?.states || []).map((state: any) => {
      const added = filteredCourses
        .filter(c => plannedIds.includes(c.id) && c.approvedStates.includes(state.code))
        .reduce((sum, c) => sum + c.credits, 0);
      return { ...state, projected: state.current + added };
    });
  }, [cmeStatus, plannedIds, filteredCourses]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-[#0A0A0A]">
      <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-8">
        
        {/* SIDEBAR: PRESERVED FULL FILTERS */}
        <aside className="col-span-3 space-y-4">
          <button className="w-full bg-[#155DFC] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#1447E6] transition-all">
             Save Search
          </button>

          <div className="bg-white rounded-2xl border border-[#D1D5DC] p-6 space-y-8 shadow-sm">
            <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => {setActiveFilters({}); setPeriod('12 Month');}} className="text-xs font-bold text-[#155DFC]">Clear All</button>
            </div>
            
            <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
              {/* Time Period Section */}
              <section className="space-y-3">
                <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">Time Period</h3>
                <div className="grid grid-cols-1 gap-1">
                  {['3 Month', '6 Month', '12 Month', 'Specific Date Range'].map(t => (
                    <button key={t} onClick={() => setPeriod(t)} className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${period === t ? 'bg-blue-50 text-[#155DFC] font-bold' : 'text-[#62748E]'}`}>
                      {t}
                    </button>
                  ))}
                </div>
                {period === 'Specific Date Range' && (
                  <div className="pt-2 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-1">
                    <input type="date" value={customDates.start} onChange={e => setCustomDates({...customDates, start: e.target.value})} className="text-[10px] p-2 border border-[#E2E8F0] rounded" />
                    <input type="date" value={customDates.end} onChange={e => setCustomDates({...customDates, end: e.target.value})} className="text-[10px] p-2 border border-[#E2E8F0] rounded" />
                  </div>
                )}
              </section>

              {/* Credit Scope Section */}
              <section className="space-y-3">
                <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">Credit Scope</h3>
                <div className="space-y-1.5">
                  {['State Approved', 'General Wellness'].map(scope => {
                    const filterState = activeFilters[scope] || 0;
                    return (
                      <div key={scope} className="flex items-center justify-between text-[13px]">
                        <span className={`font-medium transition-colors ${
                          filterState === 1 ? 'text-emerald-600' : 
                          filterState === -1 ? 'text-red-400 line-through' : 'text-[#314158]'
                        }`}>
                          {scope}
                        </span>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => toggleFilter(scope, 1)} 
                            className={`p-1 rounded ${
                              filterState === 1 ? 'text-emerald-600 bg-emerald-50' : 'text-gray-300 hover:text-emerald-400'
                            }`}
                            title="Include (Emerald/Circle)"
                          >
                            <CircleDot size={16}/>
                          </button>
                          <button 
                            onClick={() => toggleFilter(scope, -1)} 
                            className={`p-1 rounded ${
                              filterState === -1 ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-red-400'
                            }`}
                            title="Exclude (Red/Minus)"
                          >
                            <MinusCircle size={16}/>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* UNIFIED: State Location with Include/Exclude (Tri-State) */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">CME Location (State)</h3>
                  {stateSearch && (
                    <button 
                      onClick={() => setStateSearch('')}
                      className="text-[10px] font-bold text-[#155DFC] hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Search Input Field */}
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search states (e.g. FL or Hawaii)..."
                    value={stateSearch}
                    onChange={(e) => setStateSearch(e.target.value)}
                    className="w-full text-[12px] p-2 pl-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#155DFC] transition-colors"
                  />
                </div>

                {/* Scrollable frame using filteredStates instead of US_STATES */}
                <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-1.5 border-b border-[#F1F5F9] pb-4">
                  {filteredStates.length > 0 ? (
                    filteredStates.map(state => {
                      const filterState = activeFilters[state.code] || 0;
                      return (
                        <div key={state.code} className="flex items-center justify-between text-[13px]">
                          <span className={`font-medium transition-colors ${
                            filterState === 1 ? 'text-emerald-600' : 
                            filterState === -1 ? 'text-red-400 line-through' : 'text-[#314158]'
                          }`}>
                            {state.name}
                          </span>
                          <div className="flex gap-1">
                            <button 
                              onClick={() => toggleFilter(state.code, 1)} 
                              className={`p-1 rounded ${
                                filterState === 1 ? 'text-emerald-600 bg-emerald-50' : 'text-gray-300 hover:text-emerald-400'
                              }`}
                              title="Include (Emerald/Circle)"
                            >
                              <CircleDot size={16}/>
                            </button>
                            <button 
                              onClick={() => toggleFilter(state.code, -1)} 
                              className={`p-1 rounded ${
                                filterState === -1 ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-red-400'
                              }`}
                              title="Exclude (Red/Minus)"
                            >
                              <MinusCircle size={16}/>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-[11px] text-[#99A1AF] italic text-center py-4">
                      No states matching "{stateSearch}"
                    </div>
                  )}
                </div>
              </section>

              {/* Lifestyle Categories (Tri-State Filtering) */}
              {[
                { name: 'Leisure & Sport', items: ['Golf', 'Tennis', 'Pickleball', 'Skiing', 'National Parks', 'Beach', 'Lake', 'Mountain'] },
                { 
                  name: 'Family & Fun', 
                  items: ['Just for Fun', 'Theme Parks/Amusement', 'Resorts', 'All Inclusive', 'Cruises', 'Kids Approved', 'Teens Approved', 'Pet Approved'] 
                },
                { name: 'Relaxation Spa & Wellness', items: ['Yoga/Retreat', 'Beachfront', 'Fine Dining', 'Boutique Stay'] },
                { name: 'Travel Ease', items: ['Direct Flights', 'One-Stop Flights', 'Driving Distance', 'International', 'Big City/Arts'] }
              ].map(cat => (
                <div key={cat.name} className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                  <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">{cat.name}</h3>
                  <div className="space-y-1.5">
                    {cat.items.map(item => {
                      const filterState = activeFilters[item] || 0;
                      return (
                        <div key={item} className="flex items-center justify-between text-[13px]">
                          <span className={`font-medium transition-colors ${
                            filterState === 1 ? 'text-emerald-600' : 
                            filterState === -1 ? 'text-red-400 line-through' : 'text-[#314158]'
                          }`}>
                            {item}
                          </span>
                          <div className="flex gap-1">
                            <button 
                              onClick={() => toggleFilter(item, 1)} 
                              className={`p-1 rounded ${
                                filterState === 1 ? 'text-emerald-600 bg-emerald-50' : 'text-gray-300 hover:text-emerald-400'
                              }`}
                              title="Include (Emerald/Circle)"
                            >
                              <CircleDot size={16}/>
                            </button>
                            <button 
                              onClick={() => toggleFilter(item, -1)} 
                              className={`p-1 rounded ${
                                filterState === -1 ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-red-400'
                              }`}
                              title="Exclude (Red/Minus)"
                            >
                              <MinusCircle size={16}/>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT: PRESERVED WHITE/GREY LAYOUT */}
        <main className="col-span-9 space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-[#D1D5DC] p-8 shadow-sm">
               <h3 className="text-sm font-bold text-[#45556C] mb-4">Projected Compliance</h3>
               <div className="space-y-4">
                 {creditProgress.map((s:any) => (
                   <div key={s.code}>
                     <div className="flex justify-between text-xs font-bold mb-1"><span>{s.name}</span> <span>{s.projected}/{s.required} hrs</span></div>
                     <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden border border-gray-100">
                       <div className="h-full bg-[#155DFC] transition-all duration-700" style={{width: `${Math.min((s.projected/s.required)*100, 100)}%`}}/>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-[#45556C] p-8 text-[#0A0A0A] flex flex-col justify-center shadow-sm">
              <p className="text-xs font-bold text-[#155DFC] uppercase mb-1 tracking-widest">Planning Summary</p>
              <h2 className="text-4xl font-black">{totalCredits} Total Credits</h2>
            </div>
          </div>

          {/* COURSE CARDS */}
          <div className="grid grid-cols-2 gap-6">
            {filteredCourses.map(course => {
              const isPlanned = plannedIds.includes(course.id);
              return (
                <div key={course.id} className={`bg-white rounded-2xl border transition-all p-6 flex flex-col justify-between ${isPlanned ? 'border-[#155DFC] shadow-md' : 'border-[#E2E8F0]'}`}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold leading-tight w-2/3">{course.title}</h3>
                      <div className="text-right">
                        <p className="text-sm font-black text-[#155DFC]">{course.credits} Credits</p>
                        <p className="text-[10px] text-[#99A1AF] font-bold uppercase">{course.stateName}</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-[13px] text-[#62748E] font-medium">
                      <div className="flex items-center gap-2"><Calendar size={14} className="text-[#155DFC]"/> {course.displayDate}</div>
                      <div className="flex items-start gap-2"><MapPin size={14} className="text-[#155DFC] mt-0.5"/> <span>{course.venue}</span></div>
                      {course.nearby && course.nearby.length > 0 && (
                        <div className="flex flex-wrap gap-2 text-[12px]">
                          <span className="text-[#99A1AF]">Hotels:</span>
                          {course.nearby.map((hotel: any, idx: number) => (
                            <a key={idx} href={hotel.url} className="text-[#155DFC] font-normal hover:underline" target="_blank" rel="noopener noreferrer">
                              {hotel.name}
                            </a>
                          ))}
                        </div>
                      )}
                      {course.airport && (
                        <div className="flex items-center gap-2 text-[12px]">
                          <span className="text-[#99A1AF]">Airport:</span>
                          <a href={course.airport.url} className="text-[#155DFC] font-normal hover:underline" target="_blank" rel="noopener noreferrer">
                            {course.airport.name}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pt-6 mt-6 flex items-center justify-between border-t border-[#F1F5F9]">
                    <span className="text-xl font-black">${course.regFee}</span>
                    <button onClick={() => toggleCourse(course.id)} className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${isPlanned ? 'bg-[#155DFC] text-white' : 'bg-[#F1F3F5] text-[#1A1A1A]'}`}>
                      {isPlanned ? <><CheckCircle2 size={16}/> Added</> : <><Plus size={16}/> Add to Plan</>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

// End of Patch #116
