export const publicsRoutes = {
  home: { path: '/', exact: true, component: 'home' },
  login: { path: '/login', exact: true, component: 'login', auth: true },
  register: { path: '/register', exact: true, component: 'register', auth: true }
};

export const privatesRoutes = {
  publish: { path: '/publish', exact: true, component: 'publish' }
};
