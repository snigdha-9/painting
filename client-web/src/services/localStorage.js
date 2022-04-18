function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function setAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

function getUser() {
  return JSON.parse(localStorage.getItem('user')) || null;
}

function setUser(user) {
  return localStorage.setItem('user', JSON.stringify(user));
}

function removeAccessToken() {
  localStorage.removeItem('accessToken');
}

function removeUser() {
  localStorage.removeItem('user');
}

function isAuthenticated() {
  return !!getAccessToken();
}

const localStorageService = {
  getAccessToken,
  setAccessToken,
  setUser,
  getUser,
  removeAccessToken,
  removeUser,
  isAuthenticated
};

export default localStorageService;
