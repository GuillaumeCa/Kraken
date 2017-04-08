import axios from 'axios';

export const BASE_URL = "http://localhost:8001";
export const REQUEST_TIMEOUT = 5000;

axios.defaults = {
  ...axios.defaults,
  baseUrl: BASE_URL,
  timeout: REQUEST_TIMEOUT
}


const TOKEN = localStorage.getItem('token');
if (TOKEN) axios.defaults.headers.common['Authorization'] = 'Bearer ' + TOKEN;
