import axios from 'axios';
import * as helper from './helperService';

export function getDueDocuments() {
  return axios.get('/document/due');
}

export function getSentDocuments() {
  return axios.get('/document');
}

export function uploadDocument(file, typeId, onUploadProgress) {
  var data = new FormData();
  data.append('file', file);
  return axios.post(`/document/${typeId}`, data, { onUploadProgress });
}

export function getDocument(id) {
  return axios.get(`/document/${id}`, { responseType: 'arraybuffer' })
    .then(res => {
      const filename = res.headers['x-filename'];
      helper.downloadFile(res.data, filename);
      return res;
    });
}

export function deleteDocument(id) {
  return axios.delete(`/document/${id}`);
}
