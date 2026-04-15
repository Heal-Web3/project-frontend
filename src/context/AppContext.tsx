import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'doctor' | 'pharmacy' | 'regulator' | null;

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  hasNFT: boolean;
  setHasNFT: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [hasNFT, setHasNFT] = useState(false);

  return (
    <AppContext.Provider value={{ role, setRole, hasNFT, setHasNFT }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
