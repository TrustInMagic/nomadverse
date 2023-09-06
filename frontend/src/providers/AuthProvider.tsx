import React, { ReactNode, Dispatch, SetStateAction } from 'react';
// -------------------------------------------------- //

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null | string;
  setUser: Dispatch<SetStateAction<User | null | string>>;
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
  const [user, setUser] = React.useState<User | null | string>(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthProvider };
