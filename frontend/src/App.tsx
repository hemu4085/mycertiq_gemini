/**
 * Cursor Agent Patch #126 - Routing Force & Navigation Fix
 * Path: /home/myunix/projects/mycertiq_gemini/frontend/src/App.tsx
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CMEStatus } from './components/CMEStatus'; // Ensure this points to the new file
import { CMEPlanner } from './components/CMEPlanner';
import { CMEPreferences } from './components/CMEPreferences';

// MOCK_DATA for CMEStatus component
const MOCK_DATA = {
  states: [
    { name: "Florida", code: "FL", current: 8, required: 30, deadline: "Jan 31, 2026" },
    { name: "Massachusetts", code: "MA", current: 12, required: 50, deadline: "Dec 31, 2026" },
    { name: "Iowa", code: "IA", current: 5, required: 40, deadline: "Dec 31, 2026" }
  ]
};

// FORCE BRAND COLORS AT THE ROOT LEVEL TO KILL THE RED
const GlobalOverrides = () => (
  <style>{`
    #rescue-plan-button-final, 
    .rescue-button, 
    [data-testid="rescue-button"] {
      background-color: #155DFC !important;
      color: white !important;
      border-radius: 9999px !important;
    }
    .bg-red-600, .bg-red-500 {
      background-color: #155DFC !important; /* The Nuclear Option: Force all primary reds to Brand Blue */
    }
  `}</style>
);

function App() {
  return (
    <Router>
      <GlobalOverrides />
      <Routes>
        {/* Force the default landing page to be our new CME Status screen */}
        <Route path="/" element={<Navigate to="/status" replace />} />
        
        <Route path="/status" element={<CMEStatus statusData={MOCK_DATA} />} />
        <Route path="/preferences" element={<CMEPreferences />} />
        <Route path="/planner" element={<CMEPlanner />} />
        
        {/* Fallback to Status if route not found */}
        <Route path="*" element={<Navigate to="/status" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

// End of Patch #126
