import axios from 'axios';

export const fetcher = async (url: string) => {
  const apiUrl = `/api${url}`;
  const res = await axios.get(apiUrl);

  return res.data;
};
