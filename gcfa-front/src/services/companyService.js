import axios from 'axios';

export function getAllCompany() {
  return axios.get('/company');
}

export function getCompanySite(companyId) {
  return axios.get(`/company/${companyId}/sites`);
}

export function deleteCompany(companyId) {
	return axios.delete(`/company/${companyId}`);
}
