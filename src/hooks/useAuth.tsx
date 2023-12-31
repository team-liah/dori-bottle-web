import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { ILoginFormInputs, ILoginResponse } from '@/types/user';

const useAuth = () => {
  const { user, refreshUser } = useContext(AuthContext);

  const login = async (data: ILoginFormInputs) => {
    const response = await axios.post<ILoginResponse>(
      '/api/account/auth',
      data,
    );

    // 로컬에서 테스트 할때 내부 IP로 접속하면 Same-site 문제가 발생하여 강제로 쿠키 설정 (Only Dev)
    // if (process.env.NODE_ENV === 'development') {
    //   document.cookie = `access_token=${response.data.accessToken}; path=/;`;
    //   document.cookie = `refresh_token=${response.data.refreshToken}; path=/;`;
    // }
    refreshUser();

    return response.data;
  };

  const logout = async () => {
    await axios.post('/api/account/logout');
    refreshUser();
  };

  return { user, refreshUser, login, logout };
};

export default useAuth;
