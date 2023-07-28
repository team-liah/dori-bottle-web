import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';
import { fetcher } from '@/service/fetch';
import { IAuth } from '@/types/user';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  user?: IAuth;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data } = useQuery<IAuth>({
    queryKey: ['me'],
    queryFn: () => fetcher('/api/me'),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <AuthContext.Provider value={{ user: data }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
