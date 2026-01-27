import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopNav />
      <main>
        {/* This is where CMEPlanner, CMEPreferences, etc. will render */}
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;

