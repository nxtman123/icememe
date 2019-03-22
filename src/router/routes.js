
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { name: 'register', path: '/sign-up', component: () => import('pages/SignUp.vue') },
      { name: 'new', path: '/new', component: () => import('pages/New.vue') },
      { name: 'meme', path: '/m/:memeId/:slug?', component: () => import('pages/Meme.vue') },
      { name: 'user', path: '/u/:userId/:slug?', component: () => import('pages/User.vue') },
      { name: 'settings', path: '/settings', component: () => import('pages/Settings.vue') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
