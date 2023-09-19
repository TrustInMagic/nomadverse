'use client';

import React, { ReactNode, Dispatch, SetStateAction } from 'react';
// types
import { UserInterface } from '../../types/models';
// -------------------------------------------------- //

interface AuthContextType {
  user: UserInterface | null;
  setUser: Dispatch<SetStateAction<UserInterface | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<UserInterface | null>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthProvider };
