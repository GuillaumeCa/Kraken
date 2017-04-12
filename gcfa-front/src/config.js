import axios from 'axios';

export const BASE_URL = "http://localhost:8081";
export const REQUEST_TIMEOUT = 5000;


axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = REQUEST_TIMEOUT;


const TOKEN = localStorage.getItem('token');
if (TOKEN) axios.defaults.headers.common['Authorization'] = 'Bearer ' + TOKEN;
