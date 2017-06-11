import axios from 'axios';

export function getAllApprentices() {
  return axios.get('/user/apprentices');
}

export function filterApprenticesByYear(res) {
  const DATE = {
  	currentYear: new Date().getFullYear(),
  	currentMonth: new Date().getMonth()
  }
  var list = [];
  list[0] = res.data.filter(function(element) {
    return (element.promotion == DATE.currentYear + 3 && DATE.currentMonth >= 9) || (element.promotion == DATE.currentYear + 2 && DATE.currentMonth < 9)
  });

  list[1] = res.data.filter(function(element) {
    return (element.promotion == DATE.currentYear + 2 && DATE.currentMonth >= 9) || (element.promotion == DATE.currentYear + 1 && DATE.currentMonth < 9)
  });

  list[2] = res.data.filter(function(element) {
    return ((element.promotion == DATE.currentYear + 1 && DATE.currentMonth >= 9) || (element.promotion == DATE.currentYear && DATE.currentMonth <= 10))
  });

  return list;
}


export function createApprenticeFromCSV(file, onUploadProgress) {
  var data = new FormData();
  data.append('file', file);
  return axios.post(`/importcsv/createApprentice`, data, { onUploadProgress });
}

export function getAllApprenticesFromTutor(idTutor) {
  return axios.get(`/user/tutor/apprentices/${idTutor}`);
}

export function getAllTutor() {
	return axios.get('/user/tutors');
}

export function getAllConsultant() {
	return axios.get('/user/consultants');
}

export function createTutor(form) {
  return axios.post('/user/tutor', form);
}

export function getTutor(id) {
  return axios.get(`/user/tutor/${id}`);
}
export function updateTutor(id, data) {
  return axios.put(`/user/tutor/${id}`, data);
}
