import axios from 'axios';

export function getAllDocumentation() {
  return axios.get('/documentation');
}
