import api from './api';

export const fetcher = async (url: string, params?: any) => {
  const res = await api.get(url, { params });

  return res.data;
};
