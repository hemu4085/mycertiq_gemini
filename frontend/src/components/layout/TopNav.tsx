import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Bell, Search } from 'lucide-react';

export const TopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation configuration
  const navLinks = [
    { name: 'CME Status', path: '/cme-status' },
    { name: 'CME Preferences', path: '/cme-preferences' },
    { name: 'CME Planner', path: '/cme-planner' },
  ];

  return (
    <nav className="w-full h-16 bg-white border-b border-[#E2E8F0] px-8 flex items-center justify-between sticky top-0 z-[100]">
      {/* Left: Navigation Tabs */}
      <div className="flex items-center gap-8 h-full">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`h-full flex items-center pt-1 text-sm font-bold transition-all border-b-2 ${
                isActive 
                  ? 'text-[#155DFC] border-[#155DFC]' 
                  : 'text-[#64748B] border-transparent hover:text-[#155DFC]'
              }`}
            >
              {link.name}
            </button>
          );
        })}
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-5">
        <div className="relative group hidden md:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 w-64 transition-all"
          />
        </div>

        <button className="p-2 text-[#64748B] hover:bg-[#F1F5F9] rounded-lg transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-[#E2E8F0] mx-1"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-[#1E293B]">Dr. Priya Verma</p>
            <p className="text-[11px] font-medium text-[#64748B]">Cardiologist</p>
          </div>
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 bg-[#F1F5F9] rounded-full flex items-center justify-center text-[#64748B] border border-[#E2E8F0] hover:border-[#155DFC] hover:text-[#155DFC] transition-all overflow-hidden"
          >
            <User size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;

