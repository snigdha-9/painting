import api from './api';

export async function createToken(data) {
  const response = await api.post('auth/workflows/token', data);

  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get('users/me');

  return response.data;
}

export async function deleteToken(id) {
  return api.delete('auth/workflows/token/' + id);
}
