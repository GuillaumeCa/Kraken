import axios from 'axios';

export function getProfile(cb) {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (userData) {
    cb(userData);
  } else {
    axios.get('/user/me').then(res => {
      localStorage.setItem('user', JSON.stringify(res.data));
      cb(res.data);
    });
  }
}

export function getApprenticeProfile() {
  return axios.get('/user/me/detail');
}
