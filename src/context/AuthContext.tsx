import { createContext, useState } from 'react';
import { IAuth } from '@/types/user';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  auth?: IAuth;
  setAuth: (auth?: IAuth) => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<IAuth>();

  const handleAuth = (auth?: IAuth) => {
    setAuth(auth);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: handleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
