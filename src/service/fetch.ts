import { AxiosRequestConfig } from 'axios';
import api from './api';
import serverApi from './serverApi';

export const fetcher = async (url: string, params?: any) => {
  const res = await api.get(url, { params });

  return res.data;
};

export const serverFetcher = async (
  url: string,
  config?: AxiosRequestConfig<any>,
) => {
  const res = await serverApi.get(url, config);

  return res.data;
};
