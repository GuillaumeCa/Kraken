import axios from 'axios';

export function getDocumentTypes() {
  return axios.get('/document/types');
}

export function getDocumentType(id) {
  return axios.get(`/document/type/${id}`);
}

export function deleteDocumentType(id) {
  return axios.delete(`/document/type/${id}`);
}

export function createDocumentType(form) {
  return axios.post(`/document/type`, form);
}

export function updateDocumentType(id, form) {
  return axios.put(`/document/type/${id}`, form);
}
