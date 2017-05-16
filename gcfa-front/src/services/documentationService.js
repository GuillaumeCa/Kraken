import axios from 'axios';
import * as helper from './helperService';

export function getAllDocumentation() {
  return axios.get('/documentation')
              .then(res => res.data)
              .then(data => ({
                  calendars: data.filter(doc => doc.type === 'CALENDAR'),
                  tools: data.filter(doc => doc.type === 'TOOL'),
                  evaluation: data.filter(doc => doc.type === 'EVALUATION')
              }))
              .catch(helper.handleError);
}

export function getDocumentation(id) {
  return axios.get(`/documentation/${id}`, { responseType: 'arraybuffer' })
              .then(res => {
                const filename = res.headers['x-filename'];
                helper.downloadFile(res.data, filename);
              })
              .catch(helper.handleError);
}

export function upload(file, type, onUploadProgress) {
  var data = new FormData();
  data.append('file', file);
  data.append('type', type);
  return axios.post('/documentation', data, { onUploadProgress })
              .catch(helper.handleError);
}

export function editDocumentation(id, file, onUploadProgress) {
  var data = new FormData();
  data.append('file', file);
  return axios.put(`/documentation/${id}`, data, { onUploadProgress });
}

export function deleteDocumentation(id) {
  return axios.delete(`/documentation/${id}`);  
}