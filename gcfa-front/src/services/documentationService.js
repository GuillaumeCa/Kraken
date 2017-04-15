import axios from 'axios';

export function getAllDocumentation() {
  return axios.get('/documentation');
}

export function getDocumentation(id) {
  return axios.get(`/documentation/${id}`, { responseType: 'arraybuffer' });
}
