import api from '@/service/api';
import { ILoginFormInputs } from '@/types/user';

const useAuth = () => {
  const login = async (data: ILoginFormInputs) => {
    const response = await api.post('/api/account/auth', data);
    if (process.env.NODE_ENV === 'development') {
      document.cookie = `access_token=${response.data.accessToken}; path=/;`;
      document.cookie = `refresh_token=${response.data.refreshToken}; path=/;`;
    }
  };

  const logout = async () => {
    await api.post('/api/account/logout');
  };

  return { login, logout };
};

export default useAuth;
