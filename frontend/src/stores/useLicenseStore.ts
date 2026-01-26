import { create } from 'zustand';

interface License {
  state: string;
  expiryDate: string;
  requiredCredits: number;
  currentCredits: number;
  status: 'active' | 'expiring' | 'urgent';
}

interface LicenseState {
  npi: string | null;
  licenses: License[];
  setNPI: (npi: string) => void;
  updateLicenses: (data: License[]) => void;
}

export const useLicenseStore = create<LicenseState>((set) => ({
  npi: null,
  licenses: [
    { 
      state: 'FL', 
      expiryDate: '2026-01-31', 
      requiredCredits: 40, 
      currentCredits: 38, 
      status: 'urgent' 
    },
    { 
      state: 'MA', 
      expiryDate: '2026-06-15', 
      requiredCredits: 50, 
      currentCredits: 10, 
      status: 'active' 
    },
    { 
      state: 'IA', 
      expiryDate: '2026-12-31', 
      requiredCredits: 40, 
      currentCredits: 5, 
      status: 'active' 
    }
  ],
  setNPI: (npi) => set({ npi }),
  updateLicenses: (licenses) => set({ licenses }),
}));