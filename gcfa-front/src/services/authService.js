import axios from 'axios';
import * as userService from './userService';

export function setToken(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  localStorage.setItem('token', token);
}

export function isLoggedIn() {
  return !!localStorage.getItem('token')
}

export function login(user, password) {
  return axios.post('/login', {
    username: user,
    password: password
  }).then(res => {
    setToken(res.data);
    return userService.getProfile();
  });
}

export function hasRole(roles) {
  const userRaw = localStorage.getItem('user');
  if (userRaw) {
    const user = JSON.parse(userRaw);
    return roles.includes(user.role.name);
  }
  return false;
}

export function logout() {
  axios.defaults.headers.common['Authorization'] = null;
  localStorage.clear();
}

export function handle403Errors(on403) {
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 403) {
        on403();
      }
    });
}

export function modifyPassword(password) {
  return axios.put('/user/modifPassword/'+password);
}
