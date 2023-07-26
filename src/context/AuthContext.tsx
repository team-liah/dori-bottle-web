import { createContext, useState } from 'react';
import { IAuth } from '@/types/user';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  user?: IAuth;
  setUser: (user?: IAuth) => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IAuth>();

  const handleUser = (user?: IAuth) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: handleUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
