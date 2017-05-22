import axios from 'axios';
import { TWO_YEARS, THREE_YEARS } from '../constants';

export function getProfile() {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (userData) {
    return Promise.resolve(userData);
  } else {
    return axios.get('/user/me')
                .then(res => {
                  localStorage.setItem('user', JSON.stringify(res.data));
                  return res.data
                })
  }
}

export function getUserProfile() {
  return axios.get('/user/me/detail');
}


export function getApprenticeStartDate() {
  return getProfile().then(res => {
    switch (res.data.contractType) {
      case TWO_YEARS:
        return res.data.promotion - 2;
      case THREE_YEARS:
        return res.data.promotion - 3;
      default:
        return Promise.reject("Wrong contract type");
    }
  })
}
