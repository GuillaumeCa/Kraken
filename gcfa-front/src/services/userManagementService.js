import axios from 'axios';

export function getAllApprentice() {
  
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
