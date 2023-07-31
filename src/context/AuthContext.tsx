import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';
import { fetcher } from '@/service/fetch';
import { IAuth } from '@/types/user';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  user?: IAuth;
  refreshUser: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, refetch } = useQuery<IAuth>({
    queryKey: ['me'],
    queryFn: () => fetcher('/api/me'),
  });

  return (
    <AuthContext.Provider value={{ user: data, refreshUser: refetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
