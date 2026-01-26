/**
 * Cursor Agent Patch #88
 * Path: /home/myunix/projects/mycertiq_gemini/frontend/src/components/Dashboard.tsx
 */

import { useState } from 'react';
import { 
  AlertCircle, Zap, ArrowRight, X, Info, Shield, MousePointerClick
} from 'lucide-react';

export const Dashboard = ({ navigateToPlanner }: { navigateToPlanner: (filterKey: string, requirementName: string) => void }) => {
  const [showRescueModal, setShowRescueModal] = useState(false);
  
  const licenseData = [
    { 
      state: 'Florida', 
      core: { current: 3, target: 5, label: 'Mandatory (Errors/HIV)', filterKey: 'FL-MANDATORY' },
      elective: { current: 35, target: 35, label: 'General Electives', filterKey: 'GENERAL' },
      status: 'Urgent', 
      deadline: 'Jan 31, 2026'
    },
    { 
      state: 'Massachusetts', 
      core: { current: 10, target: 10, label: 'Risk Mgmt/Opioids', filterKey: 'MA-RISK' },
      elective: { current: 0, target: 40, label: 'General Electives', filterKey: 'GENERAL' },
      status: 'On Track', 
      deadline: 'May 22, 2027'
    }
  ];
  
  const rescueCourse = {
    title: "Florida Mandatory: Medical Error Prevention",
    credits: 2,
    delivery: "On-Demand Video",
    duration: "120 Minutes",
    price: "$49",
    provider: "FL Medical Association"
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* URGENT ALERTS - Triggering the Rescue Plan */}
      <div className="bg-red-50 border border-red-100 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 animate-pulse">
            <AlertCircle size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A]">Action Required: Florida License</h2>
            <p className="text-sm text-red-600 font-medium">You are 2.0 credits short for the Jan 31st deadline.</p>
          </div>
        </div>
        <button 
          onClick={() => setShowRescueModal(true)}
          className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-100"
        >
          <Zap size={18} /> Launch Rescue Plan
        </button>
      </div>

      {/* RESCUE PLAN MODAL */}
      {showRescueModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] max-w-xl w-full p-10 relative animate-in zoom-in duration-300">
            <button 
              onClick={() => setShowRescueModal(false)}
              className="absolute top-6 right-6 text-[#6A7282] hover:text-[#1A1A1A]"
            >
              <X size={24} />
            </button>

            <div className="space-y-6">
              <div className="inline-flex p-3 bg-amber-50 text-amber-600 rounded-2xl">
                <Zap size={24} fill="currentColor" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#1A1A1A]">Gap Coverage Identified</h3>
                <p className="text-[#6A7282] text-sm leading-relaxed">
                  We found the most efficient way to close your <strong>Florida deficit</strong> before the Jan 31st deadline. 
                  This course is 100% compliant with FL Board requirements.
                </p>
              </div>

              <div className="p-6 bg-[#F9FAFB] border border-[#D1D5DC] rounded-3xl space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-[#1A1A1A] max-w-[200px]">{rescueCourse.title}</h4>
                  <span className="bg-white px-3 py-1 rounded-lg text-xs font-black text-[#047857] border border-emerald-100">
                    +{rescueCourse.credits} HRS
                  </span>
                </div>
                <div className="flex gap-4 text-xs font-bold text-[#6A7282]">
                  <span className="flex items-center gap-1"><Zap size={12}/> {rescueCourse.delivery}</span>
                  <span className="flex items-center gap-1 font-mono">{rescueCourse.price}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-[#1A1A1A] text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
                  Take Course Now <ArrowRight size={18} />
                </button>
                <p className="text-[10px] text-center text-[#99A1AF] font-medium">
                  Completion will be auto-reported to CE Broker for Florida.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#1A1A1A]">Detailed Credit Mapping</h3>
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#6A7282] uppercase tracking-widest">
            <MousePointerClick size={12} /> Click a bucket to find courses
          </span>
        </div>

        {licenseData.map((license) => {
          const totalCurrent = license.core.current + license.elective.current;
          const totalTarget = license.core.target + license.elective.target;
          const isDeficit = totalCurrent < totalTarget;

          return (
            <div key={license.state} className="bg-white border border-[#D1D5DC] rounded-[32px] overflow-hidden shadow-sm hover:border-[#047857] transition-all">
              <div className="p-8 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-bold text-[#1A1A1A]">{license.state}</h4>
                    <p className="text-sm text-[#6A7282]">Deadline: {license.deadline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#1A1A1A]">{totalCurrent}<span className="text-[#99A1AF] text-lg">/{totalTarget}</span></p>
                    <p className="text-[10px] font-bold text-[#047857] uppercase tracking-tighter">Total Credits</p>
                  </div>
                </div>

                {/* Granular Bars - Now Clickable */}
                <div className="space-y-6">
                  {/* 1. Mandatory/Core Bucket */}
                  <button 
                    onClick={() => navigateToPlanner(license.core.filterKey, license.core.label)}
                    className="w-full text-left space-y-2 group block"
                  >
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 group-hover:text-[#047857] transition-colors">
                        <Shield size={14} className="text-[#047857]" /> {license.core.label}
                      </span>
                      <span className="text-[11px] font-mono text-[#6A7282] group-hover:font-bold transition-all">
                        {license.core.current}/{license.core.target} →
                      </span>
                    </div>
                    <div className="h-2 w-full bg-[#F9FAFB] rounded-full overflow-hidden border border-[#F1F3F5] group-hover:border-[#047857]/30">
                      <div 
                        className="h-full bg-[#047857] transition-all duration-1000 group-hover:brightness-110"
                        style={{ width: `${(license.core.current/license.core.target)*100}%` }}
                      />
                    </div>
                  </button>

                  {/* 2. Elective Bucket */}
                  <button 
                    onClick={() => navigateToPlanner(license.elective.filterKey, license.elective.label)}
                    className="w-full text-left space-y-2 group block"
                  >
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 group-hover:text-amber-600 transition-colors">
                        <Zap size={14} className="text-amber-500" /> {license.elective.label}
                      </span>
                      <span className="text-[11px] font-mono text-[#6A7282] group-hover:font-bold transition-all">
                        {license.elective.current}/{license.elective.target} →
                      </span>
                    </div>
                    <div className="h-2 w-full bg-[#F9FAFB] rounded-full overflow-hidden border border-[#F1F3F5] group-hover:border-amber-300">
                      <div 
                        className="h-full bg-amber-400 transition-all duration-1000 group-hover:brightness-110"
                        style={{ width: `${(license.elective.current/license.elective.target)*100}%` }}
                      />
                    </div>
                  </button>
                </div>

                {/* Deficit Insight */}
                {isDeficit && (
                  <button 
                    onClick={() => navigateToPlanner(license.core.filterKey, license.core.label)}
                    className="w-full p-4 bg-red-50 rounded-2xl flex items-center justify-between gap-3 border border-red-100 hover:bg-red-100 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Info size={16} className="text-red-600" />
                      <p className="text-xs font-bold text-red-600">
                        Requirement Missing: {license.core.target - license.core.current} more hours of {license.core.label} needed.
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-red-600 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
