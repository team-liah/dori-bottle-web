import axios from 'axios';
import mem from 'mem';

const api = axios.create({
  headers: { 'Content-type': 'application/json' }, // data type
});

api.interceptors.response.use(
  function (response) {
    // if res.status is 200, return response
    return response;
  },
  async function (error) {
    const originalConfig = error.config;

    // if res.status is 401, refresh
    if (error.response.status === 401) {
      if (originalConfig.url === '/api/me') {
        return Promise.reject(error);
      }
      try {
        await memorizedRefresh();

        return api(originalConfig);
      } catch (error) {
        // if refresh fails, redirect to login page
        window.location.href = `/login?callbackUrl=${window.location.pathname}`;
      }
    }

    return Promise.reject(error);
  },
);

export default api;

const memorizedRefresh = mem(
  async () => {
    try {
      await axios.post('/api/account/refresh-auth');
      // 로컬에서 테스트 할때 내부 IP로 접속하면 Same-site 문제가 발생하여 강제로 쿠키 설정 (Only Dev)
      // if (process.env.NODE_ENV === 'development') {
      //   document.cookie = `access_token=${response.data.accessToken}; path=/;`;
      //   document.cookie = `refresh_token=${response.data.refreshToken}; path=/;`;
      // }
    } catch (error) {
      throw error;
    }
  },
  {
    maxAge: 3000,
  },
);
