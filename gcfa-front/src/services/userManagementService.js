import axios from 'axios';

export function getAllApprentices() {
  return axios.get('/user/apprentices');
}

export function getApprenticesByYear() {
  const DATE = {
  	currentYear: new Date().getFullYear(),
  	currentMonth: new Date().getMonth()
  }
  return getAllApprentices().then(res => {
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
  })
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
