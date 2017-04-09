import axios from 'axios';

export function setToken(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  localStorage.setItem('token', token);
}

export function isLoggedIn() {
  return !!localStorage.getItem('token')
}

export function login(user, password) {
  setToken('1234');
  return true
}

export function logout() {
  localStorage.removeItem('token');
}
