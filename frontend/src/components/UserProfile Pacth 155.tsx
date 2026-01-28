/**
 * Cursor Agent Patch #155 - Add Iowa License to UserProfile
 * Execution Mode: Atomic Update
 * Path: /home/myunix/projects/mycertiq_gemini/frontend/src/components/UserProfile.tsx
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Shield, MapPin, Mail, Calendar, Building2, 
  Upload, FileText, Globe, Briefcase, Camera, LogOut, Plus, 
  Send, Printer, CheckCircle2, X, History, RotateCcw, Download,
  Award
} from 'lucide-react';

export const UserProfile = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState('United States');
  const [profileImage, setProfileImage] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Priya");
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  const sentHistory = [
    { id: 1, recipient: 'hr-dept@mayoclinic.org', date: 'Jan 22, 2026', docs: ['FL License', 'Board Cert'], docIds: ['1', '3'], status: 'Delivered' },
    { id: 2, recipient: 'licensing@flboard.gov', date: 'Jan 15, 2026', docs: ['Medical Error CME'], docIds: ['4'], status: 'Verified' },
    { id: 3, recipient: 'credentialing@mgh.harvard.edu', date: 'Dec 12, 2025', docs: ['MA License', 'ACLS Cert'], docIds: ['2', '5'], status: 'Archived' }
  ];

  const handleResend = (docIds: string[]) => {
    setSelectedDocs(docIds);
    setShowDispatchModal(true);
  };

  const handleDownload = (id: number) => {
    console.log(`Generating PDF for Bundle #${id}...`);
    alert("Generating your credential bundle PDF for download...");
  };

  const credentials = [
    { id: '1', name: 'FL State License', state: 'Florida', type: 'License', date: '2026' },
    { id: '2', name: 'MA State License', state: 'Massachusetts', type: 'License', date: '2027' },
    { id: '6', name: 'IA State License', state: 'Iowa', type: 'License', date: '2026' },
    { id: '3', name: 'Internal Medicine Board Cert', state: 'National', type: 'Board', date: '2025' },
    { id: '4', name: 'Medical Error Prevention CME', state: 'Florida', type: 'CME', date: '2026' },
    { id: '5', name: 'Ethics in Medicine CME', state: 'Massachusetts', type: 'CME', date: '2025' },
  ];

  const toggleDoc = (id: string) => {
    setSelectedDocs(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const url = URL.createObjectURL(f);
      setProfileImage(url);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Unified Navigation Bar */}
      <nav className="w-full h-16 bg-white border-b border-[#E2E8F0] px-8 flex items-center justify-between sticky top-0 z-[100] mb-8">
        <div className="flex items-center gap-8 h-full">
          <button 
            onClick={() => navigate('/cme-status')} 
            className="h-full flex items-center pt-1 text-sm font-bold text-[#64748B] border-b-2 border-transparent hover:text-[#155DFC] transition-all"
          >
            CME Status
          </button>
          
          <button 
            onClick={() => navigate('/cme-preferences')} 
            className="h-full flex items-center pt-1 text-sm font-bold text-[#64748B] border-b-2 border-transparent hover:text-[#155DFC] transition-all"
          >
            CME Preferences
          </button>
          
          <button 
            onClick={() => navigate('/cme-planner')} 
            className="h-full flex items-center pt-1 text-sm font-bold text-[#64748B] border-b-2 border-transparent hover:text-[#155DFC] transition-all"
          >
            CME Planner
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-[#334155]">Dr. Priya Verma</span>
          <button 
            className="w-10 h-10 bg-[#155DFC] rounded-full flex items-center justify-center text-white border border-[#155DFC] cursor-default"
          >
            <User size={22} />
          </button>
        </div>
      </nav>

      {/* Profile Content Container */}
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in pb-20 relative px-4">
        
        {/* 1. Header with Photo Upload */}
        <div className="bg-white border border-[#D1D5DC] rounded-[32px] p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-[#F9FAFB] overflow-hidden shadow-lg">
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <label className="absolute bottom-0 right-0 p-2 bg-[#047857] text-white rounded-full cursor-pointer hover:scale-110 transition-transform shadow-md">
              <Camera size={16} />
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-bold text-[#1A1A1A]">Dr. Priya Verma</h1>
            <p className="text-[#047857] font-semibold flex items-center justify-center md:justify-start gap-2">
              <Shield size={18} /> Internal Medicine • ABIM Board Certified
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-[#6A7282]">
              <span className="flex items-center gap-1.5"><MapPin size={16} /> Boston, MA, USA</span>
              <span className="flex items-center gap-1.5"><Mail size={16} /> p.verma@medical.org</span>
            </div>
          </div>
        </div>

        {/* CREDENTIAL ACTIONS HUB */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[32px] border border-[#D1D5DC] gap-6 shadow-sm">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-[#1A1A1A]">Credential Dispatch</h3>
              <p className="text-sm text-[#6A7282]">Review history or send new bundles to licensing boards.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className={`flex items-center justify-center gap-2 px-6 py-4 border rounded-2xl font-bold transition-all ${
                  showHistory ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#6A7282] border-[#D1D5DC] hover:bg-[#F9FAFB]'
                }`}
              >
                <History size={18} /> {showHistory ? 'Close History' : 'Last Sent History'}
              </button>
              <button 
                onClick={() => { setSelectedDocs([]); setShowDispatchModal(true); }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#047857] text-white rounded-2xl font-bold hover:bg-[#035e44] transition-all shadow-lg"
              >
                <Send size={18} /> New Dispatch
              </button>
            </div>
          </div>

          {/* EXPANDABLE HISTORY LOG */}
          {showHistory && (
            <div className="bg-white border border-[#D1D5DC] rounded-[24px] overflow-hidden animate-in slide-in-from-top-4 duration-300 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#F1F3F5] bg-[#F9FAFB]">
                      <th className="p-4 text-[10px] font-black text-[#99A1AF] uppercase tracking-widest pl-8">Recipient</th>
                      <th className="p-4 text-[10px] font-black text-[#99A1AF] uppercase tracking-widest">Docs</th>
                      <th className="p-4 text-[10px] font-black text-[#99A1AF] uppercase tracking-widest">Date</th>
                      <th className="p-4 text-[10px] font-black text-[#99A1AF] uppercase tracking-widest pr-8 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F3F5]">
                    {sentHistory.map((item) => (
                      <tr key={item.id} className="group hover:bg-emerald-50/20 transition-colors">
                        <td className="p-4 pl-8">
                          <p className="text-sm font-bold text-[#1A1A1A]">{item.recipient}</p>
                          <span className="text-[9px] font-bold text-[#047857] uppercase">{item.status}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1 flex-wrap max-w-[180px]">
                            {item.docs.map(doc => (
                              <span key={doc} className="text-[9px] bg-white border border-[#D1D5DC] px-2 py-0.5 rounded font-bold text-[#6A7282] whitespace-nowrap">
                                {doc}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-xs font-medium text-[#6A7282]">
                          {item.date}
                        </td>
                        <td className="p-4 pr-8 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleDownload(item.id)}
                              className="p-2 text-[#6A7282] hover:text-[#047857] hover:bg-white rounded-lg transition-all border border-transparent hover:border-emerald-100"
                              title="Download PDF Bundle"
                            >
                              <Download size={16} />
                            </button>
                            <button 
                              onClick={() => handleResend(item.docIds)}
                              className="flex items-center gap-1.5 px-3 py-2 bg-[#1A1A1A] text-white text-[10px] font-bold rounded-lg hover:bg-black transition-all"
                            >
                              <RotateCcw size={12} /> Resend
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* DISPATCH MODAL */}
        {showDispatchModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[40px] max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col relative animate-in zoom-in duration-300">
              
              <div className="p-8 border-b border-[#F1F3F5] flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A]">Send Credentials</h3>
                  <p className="text-sm text-[#6A7282]">Select certificates to include in your PDF bundle.</p>
                </div>
                <button onClick={() => setShowDispatchModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {['Florida', 'Massachusetts', 'Iowa', 'National'].map(state => (
                  <div key={state} className="space-y-3">
                    <h4 className="text-[10px] font-black text-[#99A1AF] uppercase tracking-widest">{state}</h4>
                    <div className="grid gap-3">
                      {credentials.filter(c => c.state === state).map(doc => (
                        <div 
                          key={doc.id}
                          onClick={() => toggleDoc(doc.id)}
                          className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            selectedDocs.includes(doc.id) ? 'border-[#047857] bg-emerald-50' : 'border-[#F1F3F5] hover:border-[#D1D5DC]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={selectedDocs.includes(doc.id) ? 'text-[#047857]' : 'text-[#6A7282]'}>
                              <FileText size={20} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[#1A1A1A]">{doc.name}</p>
                              <p className="text-[10px] text-[#6A7282] uppercase">{doc.type} • {doc.date}</p>
                            </div>
                          </div>
                          {selectedDocs.includes(doc.id) && <CheckCircle2 size={20} className="text-[#047857]" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-[#F9FAFB] border-t border-[#F1F3F5] space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input type="email" placeholder="Recipient Email (e.g. credentialing@hospital.org)" className="w-full p-4 border border-[#D1D5DC] rounded-xl outline-none focus:ring-2 focus:ring-[#047857]/20" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 bg-[#1A1A1A] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black disabled:opacity-30" disabled={selectedDocs.length === 0}>
                    <Mail size={18} /> Email PDF Bundle
                  </button>
                  <button className="px-6 border border-[#D1D5DC] rounded-xl font-bold flex items-center gap-2 hover:bg-white bg-transparent">
                    <Printer size={18} /> Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-[#D1D5DC] rounded-[24px] p-8 space-y-6">
              <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
                <Award size={18} className="text-[#047857]" /> Active State Licenses
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {credentials.filter(c => c.type === 'License').map(license => (
                  <div key={license.id} className="p-4 bg-[#F9FAFB] border border-[#E2E8F0] rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#1A1A1A]">{license.state}</p>
                      <p className="text-[10px] font-bold text-[#6A7282] uppercase">Expires {license.date}</p>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 size={16} />
                      <span className="text-[10px] font-black uppercase">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#D1D5DC] rounded-[24px] p-8 space-y-6">
              <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
                <Briefcase size={18} className="text-[#6A7282]" /> Employment & Residence
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#99A1AF] uppercase">Current Employer</label>
                  <input type="text" placeholder="Hospital or Company Name" className="w-full p-3 border border-[#D1D5DC] rounded-xl outline-none focus:ring-2 focus:ring-[#047857]/20" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#99A1AF] uppercase">Country of Residence</label>
                  <select 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-3 border border-[#D1D5DC] rounded-xl outline-none"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>International</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-[#99A1AF] uppercase">Office Address</label>
                  <input type="text" placeholder="Street Address" className="w-full p-3 border border-[#D1D5DC] rounded-xl outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#99A1AF] uppercase">City</label>
                  <input type="text" className="w-full p-3 border border-[#D1D5DC] rounded-xl outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#99A1AF] uppercase">State/Province</label>
                    <input type="text" placeholder={country === 'United States' ? "MA" : "Region"} className="w-full p-3 border border-[#D1D5DC] rounded-xl outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#99A1AF] uppercase">Zip/Postal</label>
                    <input type="text" className="w-full p-3 border border-[#D1D5DC] rounded-xl outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#D1D5DC] rounded-[24px] p-8 space-y-6">
              <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
                <Globe size={18} className="text-[#6A7282]" /> Medical Boards & Affiliations
              </h3>
              <div className="space-y-4">
                <input type="text" placeholder="e.g. American Board of Internal Medicine (ABIM)" className="w-full p-3 border border-[#D1D5DC] rounded-xl outline-none" />
                <div className="flex flex-wrap gap-2">
                  {['AMA Member', 'ACP Fellow', 'MMS Society'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[#F9FAFB] border border-[#D1D5DC] rounded-full text-xs font-bold text-[#6A7282] flex items-center gap-2">
                      {tag} <Plus size={12} className="cursor-pointer" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1A1A1A] text-white rounded-[24px] p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
                  <FileText size={18} className="text-[#047857]" /> Credential Vault
                </h3>
              </div>
              
              <div className="space-y-4">
                <button className="w-full py-4 border-2 border-dashed border-[#6A7282] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#047857] hover:bg-emerald-50/10 transition-all group">
                  <Upload size={24} className="text-[#6A7282] group-hover:text-[#047857]" />
                  <span className="text-xs font-bold">Upload License or Cert</span>
                </button>

                <div className="space-y-3 pt-4">
                  {[
                    { name: 'FL_License_2026.pdf', date: 'Synced' },
                    { name: 'ACLS_Cert_Final.png', date: 'Oct 2025' }
                  ].map(file => (
                    <div key={file.name} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-[#047857]" />
                        <span className="text-xs font-medium truncate w-32">{file.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#047857]">{file.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 text-red-600 font-bold hover:bg-red-50 rounded-2xl border border-red-100 transition-all"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// End of Patch #155