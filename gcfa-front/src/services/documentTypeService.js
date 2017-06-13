import axios from 'axios';

export function getNextDueDate(sdate, day, month, dyear) {
  return new Date(sdate + dyear, month - 1, dyear);
}

export function getDocumentTypes() {
  return axios.get('/document/types');
}

export function getDocumentType(id) {
  return axios.get(`/document/type/${id}`);
}

export function deleteDocumentType(id) {
  return axios.delete(`/document/type/${id}`);
}

export function createDocumentType(id, form) {
  return axios.post(`/document/type/${id}`, form);
}

export function updateDocumentType(id, form) {
  return axios.put(`/document/type/${id}`, form);
}
