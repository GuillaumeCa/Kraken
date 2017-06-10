import axios from 'axios';

export function getAllApprentices() {
  
  return axios.get('/user/apprentices');
}

export function createApprenticeFromCSV(file, onUploadProgress) {
  var data = new FormData();
  data.append('file', file);
  return axios.post(`/importcsv/createApprentice`, data, { onUploadProgress });
}

export function getAllTutor() {
  
}

export function getAllConsultant() {
  
}
