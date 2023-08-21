import axios from 'axios';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const serverApi = axios.create({
  baseURL: `${serverRuntimeConfig.baseApiUrl}/api/v1`,
  headers: { 'Content-type': 'application/json' }, // data type
});

export default serverApi;
