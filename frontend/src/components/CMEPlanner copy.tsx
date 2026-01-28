/**
 * CME Planner Concierge Logistics Implementation (v1.2.5)
 * Fix: Restored all filter categories and logic while maintaining the new Concierge card design.
 * Path: /home/myunix/projects/mycertiq_gemini/frontend/src/components/CMEPlanner.tsx
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Plus, Check, 
  CircleDot, MinusCircle, CheckCircle2, User,
  ExternalLink, Plane, Hotel, Award, Map, ArrowRight
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
  const [customDates, setCustomDates] = useState({ start: '', end: '' });
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
    { 
      id: 1, 
      title: "Cardiovascular Medicine: Interventional Mastery", 
      officialListing: "https://example.com/cme-cardio",
      dateRange: "Mar 12-16, 2026",
      date: "2026-03-12",
      dateEnd: "2026-03-16",
      location: { 
        name: "Kihei, Maui, HI", 
        link: "https://www.google.com/maps?q=Grand+Wailea+Resort+Maui",
        airport: { name: "Kahului (OGG)", link: "https://www.google.com/flights?q=OGG" },
        directFlight: true 
      },
      approvedStates: ['FL', 'MA', 'HI'],
      stateCode: "HI",
      boards: [
        { name: "ABIM", credits: 15, link: "https://www.abim.org" },
        { name: "AOA", credits: 10, link: "https://osteopathic.org" }
      ],
      hotels: [
        { name: "Grand Wailea Resort", link: "https://example.com/hotel-wailea", isOfficial: true },
        { name: "Four Seasons Maui", link: "https://example.com/hotel-fourseasons", isOfficial: false }
      ],
      registrationLink: "https://example.com/register-cardio",
      tags: ['Beach', 'Luxury Resort', 'Direct Flights'],
      isWellness: false 
    },
    { 
      id: 3, 
      title: "Essentials in Primary Care: Winter Session", 
      officialListing: "https://example.com/cme-primary",
      dateRange: "Feb 9-13, 2026",
      date: "2026-02-09",
      dateEnd: "2026-02-13",
      location: { 
        name: "Naples, FL", 
        link: "https://www.google.com/maps?q=Ritz+Carlton+Naples+FL",
        airport: { name: "Fort Myers (RSW)", link: "https://www.google.com/flights?q=RSW" },
        directFlight: true 
      },
      approvedStates: ['FL', 'IA', 'TX'],
      stateCode: "FL",
      boards: [
        { name: "ABFM", credits: 20, link: "https://www.theabfm.org" }
      ],
      hotels: [
        { name: "The Ritz-Carlton, Naples", link: "https://example.com/hotel-ritz", isOfficial: true },
        { name: "LaPlaya Beach Resort", link: "https://example.com/hotel-laplaya", isOfficial: false }
      ],
      golfLink: "https://www.google.com/search?q=golf+courses+near+Naples+FL",
      registrationLink: "https://example.com/register-primary",
      tags: ['Beach', 'Golf', 'Fine Dining'],
      isWellness: false 
    }
  ], []);

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      // 1. Scope Logic
      const scopeStateApproved = activeFilters['State Approved'];
      const scopeWellness = activeFilters['General Wellness'];
      if (scopeStateApproved === -1 && !course.isWellness) return false;
      if (scopeWellness === -1 && course.isWellness) return false;

      // 2. Exclusion Logic
      const excludedKeys = Object.entries(activeFilters).filter(([_, v]) => v === -1).map(([k]) => k);
      if (excludedKeys.includes(course.stateCode)) return false;
      if (course.tags.some(tag => excludedKeys.includes(tag))) return false;

      // 3. Date Range Logic
      if (period === 'Specific Date Range' && customDates.start && customDates.end) {
        const cStart = new Date(course.date);
        const cEnd = new Date(course.dateEnd);
        const uStart = new Date(customDates.start);
        const uEnd = new Date(customDates.end);
        if (!(cStart <= uEnd && cEnd >= uStart)) return false;
      }

      // 4. Inclusion Logic
      const includedKeys = Object.entries(activeFilters).filter(([_, v]) => v === 1).map(([k]) => k);
      const lifestyleInclusions = includedKeys.filter(k => k !== 'State Approved' && k !== 'General Wellness');
      if (lifestyleInclusions.length > 0) {
        const stateMatch = lifestyleInclusions.includes(course.stateCode);
        const tagMatch = course.tags.some(tag => lifestyleInclusions.includes(tag));
        if (!stateMatch && !tagMatch) return false;
      }

      return true;
    });
  }, [activeFilters, allCourses, period, customDates]);

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
    return allCourses
      .filter(c => plannedIds.includes(c.id))
      .reduce((sum, c) => sum + (c.boards[0]?.credits || 0), 0);
  }, [plannedIds, allCourses]);

  const creditProgress = useMemo(() => {
    return (cmeStatus?.states || []).map((state: any) => {
      const added = allCourses
        .filter(c => plannedIds.includes(c.id) && c.approvedStates.includes(state.code))
        .reduce((sum, c) => sum + (c.boards[0]?.credits || 0), 0);
      return { ...state, projected: state.current + added };
    });
  }, [cmeStatus, plannedIds, allCourses]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0A0A0A]">
      {/* NAV BAR */}
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
          {/* FULL FILTERS SIDEBAR */}
          <aside className="col-span-3 space-y-4">
            <button className="w-full bg-[#155DFC] text-white py-4 rounded-xl font-bold shadow-sm hover:bg-[#1447E6]">Save Search</button>
            <div className="bg-white rounded-2xl border border-[#D1D5DC] p-6 space-y-8 shadow-sm">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => {setActiveFilters({}); setPeriod('12 Month');}} className="text-xs font-bold text-[#155DFC]">Clear All</button>
              </div>

              <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {/* Time Period */}
                <section className="space-y-3">
                  <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">Time Period</h3>
                  <div className="grid grid-cols-1 gap-1">
                    {['3 Month', '6 Month', '12 Month', 'Specific Date Range'].map(t => (
                      <button key={t} onClick={() => setPeriod(t)} className={`text-left px-3 py-2 rounded-lg text-sm ${period === t ? 'bg-blue-50 text-[#155DFC] font-bold' : 'text-[#62748E]'}`}>{t}</button>
                    ))}
                  </div>
                  {period === 'Specific Date Range' && (
                    <div className="pt-2 grid grid-cols-2 gap-2">
                      <input type="date" value={customDates.start} onChange={e => setCustomDates({...customDates, start: e.target.value})} className="text-[10px] p-2 border border-[#E2E8F0] rounded" />
                      <input type="date" value={customDates.end} onChange={e => setCustomDates({...customDates, end: e.target.value})} className="text-[10px] p-2 border border-[#E2E8F0] rounded" />
                    </div>
                  )}
                </section>

                {/* Credit Scope */}
                <section className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                  <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">Credit Scope</h3>
                  <div className="space-y-1.5">
                    {['State Approved', 'General Wellness'].map(scope => {
                      const filterState = activeFilters[scope] || 0;
                      return (
                        <div key={scope} className="flex items-center justify-between text-[13px]">
                          <span className={`font-medium ${filterState === 1 ? 'text-emerald-600' : filterState === -1 ? 'text-red-400 line-through' : 'text-[#314158]'}`}>{scope}</span>
                          <div className="flex gap-1">
                            <button onClick={() => toggleFilter(scope, 1)} className={`p-1 rounded ${filterState === 1 ? 'text-emerald-600 bg-emerald-50' : 'text-gray-300 hover:text-emerald-400'}`}><CircleDot size={16}/></button>
                            <button onClick={() => toggleFilter(scope, -1)} className={`p-1 rounded ${filterState === -1 ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-red-400'}`}><MinusCircle size={16}/></button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* State Search */}
                <section className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                  <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">CME State</h3>
                  <input type="text" placeholder="Search states..." value={stateSearch} onChange={(e) => setStateSearch(e.target.value)} className="w-full text-[12px] p-2 border border-[#E2E8F0] rounded-lg" />
                  <div className="max-h-[200px] overflow-y-auto space-y-1.5">
                    {filteredStates.map(state => {
                      const filterState = activeFilters[state.code] || 0;
                      return (
                        <div key={state.code} className="flex items-center justify-between text-[13px]">
                          <span className={filterState === 1 ? 'text-emerald-600 font-bold' : filterState === -1 ? 'text-red-400 line-through' : ''}>{state.name}</span>
                          <div className="flex gap-1">
                            <button onClick={() => toggleFilter(state.code, 1)} className={filterState === 1 ? 'text-emerald-600' : 'text-gray-300'}><CircleDot size={16}/></button>
                            <button onClick={() => toggleFilter(state.code, -1)} className={filterState === -1 ? 'text-red-500' : 'text-gray-300'}><MinusCircle size={16}/></button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Lifestyle Categories */}
                {[
                  { name: 'Leisure & Sport', items: ['Golf', 'Tennis', 'Skiing', 'National Parks', 'Beach'] },
                  { name: 'Travel Ease', items: ['Direct Flights', 'Driving Distance', 'International'] }
                ].map(cat => (
                  <div key={cat.name} className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                    <h3 className="text-xs font-black text-[#45556C] uppercase tracking-widest">{cat.name}</h3>
                    <div className="space-y-1.5">
                      {cat.items.map(item => {
                        const filterState = activeFilters[item] || 0;
                        return (
                          <div key={item} className="flex items-center justify-between text-[13px]">
                            <span className={filterState === 1 ? 'text-emerald-600 font-bold' : filterState === -1 ? 'text-red-400 line-through' : ''}>{item}</span>
                            <div className="flex gap-1">
                              <button onClick={() => toggleFilter(item, 1)} className={filterState === 1 ? 'text-emerald-600' : 'text-gray-300'}><CircleDot size={16}/></button>
                              <button onClick={() => toggleFilter(item, -1)} className={filterState === -1 ? 'text-red-500' : 'text-gray-300'}><MinusCircle size={16}/></button>
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

          {/* MAIN CONTENT AREA */}
          <main className="col-span-9 space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl border border-[#D1D5DC] p-8 shadow-sm">
                <h3 className="text-sm font-bold text-[#45556C] mb-4">Projected Compliance</h3>
                <div className="space-y-4">
                  {creditProgress.map((s:any) => (
                    <div key={s.code}>
                      <div className="flex justify-between text-xs font-bold mb-1"><span>{s.name}</span> <span>{s.projected}/{s.required} hrs</span></div>
                      <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden border border-gray-100">
                        <div className="h-full bg-[#155DFC] transition-all" style={{width: `${Math.min((s.projected/s.required)*100, 100)}%`}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#45556C] p-8 flex flex-col justify-center shadow-sm">
                <p className="text-xs font-bold text-[#155DFC] uppercase mb-1 tracking-widest">Planning Summary</p>
                <h2 className="text-4xl font-black">{totalCredits} Total Credits</h2>
              </div>
            </div>

            <div className="space-y-6">
              {filteredCourses.map(course => (
                <div key={course.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* CONCIERGE CARD HEADER */}
                  <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                    <div className="flex justify-between items-start mb-3">
                      <a href={course.officialListing} target="_blank" rel="noopener noreferrer" className="text-xl font-black text-slate-900 hover:text-[#155DFC] flex items-center gap-2 group">
                        {course.title}
                        <ExternalLink size={18} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                      </a>
                      <div className="flex gap-2">
                        {course.approvedStates.map(state => (
                          <span key={state} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase">
                            {state} APPROVED
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-600">
                      <div className="flex items-center gap-1.5"><Calendar size={16} className="text-[#155DFC]"/> {course.dateRange}</div>
                      <a href={course.location.link} target="_blank" className="flex items-center gap-1.5 text-blue-600 hover:underline"><MapPin size={16}/> {course.location.name}</a>
                      {course.location.directFlight && <span className="flex items-center gap-1.5 text-emerald-600"><Plane size={16}/> Direct Flight</span>}
                    </div>
                  </div>

                  {/* CONCIERGE CARD CONTENT */}
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {course.boards.map(board => (
                        <a key={board.name} href={board.link} target="_blank" className="flex justify-between items-center p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#155DFC] transition-colors">
                          <span className="font-bold flex items-center gap-2 text-slate-700"><Award size={16} className="text-[#155DFC]"/> {board.name}</span>
                          <span className="text-[#155DFC] font-black">{board.credits} Credits</span>
                        </a>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-slate-100">
                      <div className="md:col-span-4 space-y-3">
                        <h4 className="font-black text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2"><Hotel size={14}/> Lodging</h4>
                        <div className="space-y-2">
                          {course.hotels.map(hotel => (
                            <a key={hotel.name} href={hotel.link} target="_blank" className={`block text-sm hover:underline ${hotel.isOfficial ? 'font-bold text-[#155DFC]' : 'text-slate-600'}`}>
                              {hotel.name} {hotel.isOfficial && '(Official)'}
                            </a>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-4 space-y-3">
                        <h4 className="font-black text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2"><Map size={14}/> Travel Logistics</h4>
                        <div className="space-y-2">
                          <a href={course.location.airport.link} target="_blank" className="block text-sm text-slate-600 hover:underline">Airport: {course.location.airport.name}</a>
                          {course.golfLink && <a href={course.golfLink} target="_blank" className="block text-sm text-emerald-600 font-bold hover:underline">⛳ Golf Course Access Nearby</a>}
                        </div>
                      </div>

                      <div className="md:col-span-4 flex flex-col justify-between gap-3">
                        <a href={course.registrationLink} target="_blank" className="w-full bg-[#155DFC] text-white text-center py-3.5 rounded-xl font-bold hover:bg-[#1447E6] transition-all flex items-center justify-center gap-2">
                          Register for Course <ArrowRight size={18}/>
                        </a>
                        <button onClick={() => toggleCourse(course.id)} className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${plannedIds.includes(course.id) ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'}`}>
                          {plannedIds.includes(course.id) ? <><CheckCircle2 size={18}/> In Your Plan</> : <><Plus size={18}/> Add to Plan</>}
                        </button>
                      </div>
                    </div>
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

// End of Patch #161