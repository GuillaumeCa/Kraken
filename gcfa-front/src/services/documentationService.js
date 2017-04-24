import axios from 'axios';

export function getAllDocumentation() {
  return axios.get('/documentation')
              .then(res => res.data)
              .then(data => ({
                  calendars: data.filter(doc => doc.type == 'CALENDAR'),
                  tools: data.filter(doc => doc.type == 'TOOL'),
                  evaluation: data.filter(doc => doc.type == 'EVALUATION')
              }));
}

export function getDocumentation(id) {
  return axios.get(`/documentation/${id}`, { responseType: 'arraybuffer' });
}
