/**
 * Cursor Agent Patch #128 - Interactive Credit Buckets
 * Path: /home/myunix/projects/mycertiq_gemini/frontend/src/components/CMEStatus.tsx
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, AlertCircle, Zap, 
  ChevronRight, User, LayoutDashboard 
} from 'lucide-react';

export const CMEStatus = ({ statusData }: any) => {
  const navigate = useNavigate();
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSyncing(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Professional Navigation Handler
  const handleBucketClick = (category: string, stateName: string) => {
    // Navigate to planner with pre-filled filters
    navigate(`/planner?category=${category}&state=${stateName}`);
  };

  const BRAND_BLUE = '#155DFC'; 

  return (
    <div className="bg-white min-h-screen font-sans text-[#101828]">
      {/* HEADER REMAINS AS SHOWN IN SUCCESSFUL SCREENSHOT */}
      <nav className="border-b border-[#D1D5DC] px-8 py-4 flex justify-between items-center bg-white sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#155DFC] rounded-lg flex items-center justify-center text-white">
              <ShieldCheck size={20} fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight">MyCertiq Gemini</span>
          </div>
          <div className="flex gap-6 text-sm font-bold text-[#4A5565]">
            <button className="text-[#155DFC] border-b-2 border-[#155DFC] pb-5 translate-y-5">CME Status</button>
            <button onClick={() => navigate('/preferences')} className="hover:text-[#101828] transition-colors">CME Preferences</button>
            <button onClick={() => navigate('/planner')} className="hover:text-[#101828] transition-colors">CME Planner</button>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#155DFC]">
              {isSyncing ? 'Syncing...' : 'Live'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-[#4A5565]">Dr. Priya Verma</span>
            <div className="w-8 h-8 bg-[#F3F4F6] rounded-full border border-[#D1D5DC] flex items-center justify-center">
              <User size={16} className="text-[#4A5565]" />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto py-12 px-6 space-y-10">
        {/* ACTION BANNER REMAINS AS SHOWN IN SUCCESSFUL SCREENSHOT */}
        <div className="bg-[#FFF5F5] border border-[#FEE2E2] rounded-[40px] p-10 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="bg-white p-5 rounded-3xl shadow-sm text-[#E11D48]">
              <AlertCircle size={36} />
            </div>
            <div className="max-w-md">
              <h2 className="text-2xl font-black text-[#101828]">Action Required: Florida License</h2>
              <p className="text-[#4A5565] font-medium mt-1">You are 2.0 credits short for the Jan 31st deadline.</p>
            </div>
          </div>
          
          <button 
            style={{ backgroundColor: BRAND_BLUE, color: 'white', borderRadius: '9999px', padding: '16px 36px', fontWeight: '900', border: 'none' }}
            className="flex items-center gap-3 shadow-lg hover:brightness-110 transition-all active:scale-95"
          >
            <Zap size={20} fill="currentColor" />
            Launch Rescue Plan
          </button>
        </div>

        <div className="space-y-8">
          <h3 className="text-xl font-black text-[#101828] flex items-center gap-2">
            <LayoutDashboard size={20} className="text-[#155DFC]" />
            Detailed Credit Mapping
          </h3>

          {statusData.states.map((state: any) => (
            <div key={state.code} className="bg-white border border-[#D1D5DC] rounded-[48px] p-12 mb-8">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h4 className="text-4xl font-black text-[#101828]">{state.name}</h4>
                  <p className="text-[#4A5565] font-bold mt-2 uppercase tracking-widest text-[11px]">Deadline: {state.deadline}</p>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-black text-[#101828]">{state.current}<span className="text-2xl text-[#94A3B8]">/{state.required}</span></div>
                  <p className="text-xs font-black text-[#155DFC] uppercase tracking-[0.3em] mt-3 text-right">Total Credits</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-16">
                {/* INTERACTIVE BUCKET: Mandatory */}
                <div 
                  onClick={() => handleBucketClick('Mandatory', state.name)}
                  className="space-y-4 cursor-pointer group"
                >
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-[#101828] uppercase group-hover:text-[#155DFC] transition-colors">Mandatory (Errors/HIV)</span>
                    <span className="text-sm font-bold text-[#0D9488]">3 / 5 hrs</span>
                  </div>
                  <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden group-hover:ring-1 group-hover:ring-[#155DFC]/20 transition-all">
                    <div className="h-full bg-[#0D9488] w-[60%] rounded-full" />
                  </div>
                </div>

                {/* INTERACTIVE BUCKET: General */}
                <div 
                  onClick={() => handleBucketClick('General', state.name)}
                  className="space-y-4 cursor-pointer group"
                >
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-[#101828] uppercase group-hover:text-[#155DFC] transition-colors">General Electives</span>
                    <span className="text-sm font-bold text-[#894B00]">35 / 35 hrs</span>
                  </div>
                  <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden group-hover:ring-1 group-hover:ring-[#155DFC]/20 transition-all">
                    <div className="h-full bg-[#894B00] w-full rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// End of Patch #128
