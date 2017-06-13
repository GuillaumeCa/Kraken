import axios from 'axios';

export function getAllCompany() {
  return axios.get('/company');
}

export function getCompany(id) {
  return axios.get(`/company/${id}`);
}
export function updateCompany(id, name) {
  return axios.put(`/company/${id}/${name}`);
}

export function createCompany(name) {
  return axios.post(`/company/${name}`);
}

export function deleteCompany(companyId) {
	return axios.delete(`/company/${companyId}`);
}

export function createCompanySite(id, form) {
  return axios.post(`/company/${id}/site`, form);
}

export function updateCompanySite(siteId, form) {
  return axios.put(`/company/site/${siteId}`, form);
}

export function deleteCompanySite(siteId) {
  return axios.delete(`/company/site/${siteId}`);
}

export function getCompanySites(id) {
  return axios.get(`/company/${id}/sites`);
}
