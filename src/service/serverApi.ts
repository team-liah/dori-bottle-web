import axios from 'axios';

const serverApi = axios.create({
  baseURL: `${process.env.BASE_API_URL}/api/v1`,
  headers: { 'Content-type': 'application/json' }, // data type
});

export default serverApi;
