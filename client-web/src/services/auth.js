import api from './api';
import localStorageService from './localStorage';
import { getCurrentUser } from './users';

export async function registerUser(user) {
  const response = await api.post('/auth/register', user);

  return response.data;
}

export async function loginUser(user) {
  const response = await api.post('/auth/login', user);

  localStorageService.setAccessToken(response.data.accessToken);

  const userInfo = await getCurrentUser();
  localStorageService.setUser(userInfo);

  return response.data;
}

export function logoutUser() {
  localStorageService.removeAccessToken();
  localStorageService.removeUser();
}
