import axios from 'axios';
import { logoutUser } from './auth';
import localStorageService from './localStorage';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`
});

api.interceptors.request.use(async conf => {
  const config = conf;
  const token = localStorageService.getAccessToken();
  if (!conf.url.includes('/auth/') && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.headers['Content-Type'] === undefined) {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const isValid401 = error.response.status === 401 || error.response.status === 403;
    if (isValid401) {
      logoutUser();
      return window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default api;
