/**
 * Cursor Agent Patch #79
 * Path: /home/myunix/projects/mycertiq_gemini/frontend/src/components/auth/OnboardingFlow.tsx
 */

import { useState, useEffect } from 'react';
import { Mail, Lock, Calendar, Search, CheckCircle2, UserCheck, ArrowRight } from 'lucide-react';

export const OnboardingFlow = ({ onComplete }: { onComplete: () => void }) => {
  const [view, setView] = useState<'signup' | 'login'>('signup');
  const [step, setStep] = useState<'account' | 'identity' | 'success'>('account');
  const [formData, setFormData] = useState({ email: '', password: '', nip: '', dob: '' });
  const [isVerifying, setIsVerifying] = useState(false);
  const [foundPhysician, setFoundPhysician] = useState<string | null>(null);

  // Figma Logic: Auto-detect name when NPI reaches 10 digits
  useEffect(() => {
    if (formData.nip.length === 10) {
      setFoundPhysician("Dr. Priya Verma");
    } else {
      setFoundPhysician(null);
    }
  }, [formData.nip]);

  const handleAction = () => {
    if (view === 'login') {
      // Returning users bypass identity verification
      onComplete();
    } else {
      // New users follow the verification steps
      if (step === 'account') setStep('identity');
      else if (step === 'identity') {
        setIsVerifying(true);
        setTimeout(() => {
          setIsVerifying(false);
          setStep('success');
        }, 1800);
      }
    }
  };

  return (
    <div className="max-w-md w-full bg-white shadow-2xl rounded-[32px] overflow-hidden border border-[#D1D5DC] transition-all duration-500">
      {/* Progress bar only shows for New Signups */}
      {view === 'signup' && (
        <div className="h-1.5 w-full bg-[#F9FAFB] flex">
          <div 
            className="h-full bg-[#047857] transition-all duration-700" 
            style={{ width: step === 'account' ? '33%' : step === 'identity' ? '66%' : '100%' }}
          />
        </div>
      )}

      <div className="p-10">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">
              {view === 'login' ? 'Welcome Back' : step === 'identity' ? 'Verify Identity' : 'Create Account'}
            </h2>
            <p className="text-[#6A7282] text-sm">
              {view === 'login' ? 'Sign in to access your CME Roadmap' : 'Professional credential management for physicians.'}
            </p>
          </div>

          {(view === 'login' || step === 'account') && (
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-[#99A1AF]" size={18} />
                <input 
                  type="email" 
                  placeholder="Personal Email"
                  className="w-full pl-10 p-3.5 border border-[#D1D5DC] rounded-xl outline-none focus:ring-2 focus:ring-[#047857]/20"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-[#99A1AF]" size={18} />
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full pl-10 p-3.5 border border-[#D1D5DC] rounded-xl outline-none focus:ring-2 focus:ring-[#047857]/20"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>
          )}

          {view === 'signup' && step === 'identity' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 text-[#99A1AF]" size={18} />
                <input 
                  type="text" 
                  placeholder="NIP (10-digit)"
                  maxLength={10}
                  className="w-full pl-10 p-3.5 border border-[#D1D5DC] rounded-xl font-mono outline-none focus:ring-2 focus:ring-[#047857]/20"
                  onChange={(e) => setFormData({...formData, nip: e.target.value})}
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 text-[#99A1AF]" size={18} />
                <input 
                  type="text" 
                  placeholder="Date of Birth (MM/DD/YYYY)"
                  className="w-full pl-10 p-3.5 border border-[#D1D5DC] rounded-xl outline-none"
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                />
              </div>
              {foundPhysician && (
                <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <UserCheck size={18} className="text-[#047857]" />
                  <span className="text-[#047857] font-bold text-sm">Found: {foundPhysician}</span>
                </div>
              )}
            </div>
          )}

          {step !== 'success' && (
            <button 
              onClick={handleAction}
              disabled={view === 'signup' && step === 'identity' && isVerifying}
              className="w-full bg-[#1A1A1A] text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50"
            >
              {view === 'login' ? 'Sign In' : step === 'account' ? 'Continue' : isVerifying ? 'Syncing...' : 'Verify & Sync'} <ArrowRight size={18} />
            </button>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4 py-4 animate-in zoom-in">
              <CheckCircle2 size={48} className="mx-auto text-[#047857]" />
              <h3 className="font-bold text-xl">Identity Verified</h3>
              <button onClick={onComplete} className="w-full bg-[#047857] text-white p-4 rounded-xl font-bold">
                Enter My Dashboard
              </button>
            </div>
          )}

          <div className="text-center pt-4">
            <button 
              onClick={() => { setView(view === 'login' ? 'signup' : 'login'); setStep('account'); }}
              className="text-sm font-bold text-[#047857] hover:underline"
            >
              {view === 'login' ? "Don't have an account? Create one" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
