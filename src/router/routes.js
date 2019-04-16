
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'main', path: '', component: () => import('pages/Index.vue') },
      { name: 'register', path: '/sign-up', component: () => import('pages/SignUp.vue') },
      { name: 'new', path: '/new', component: () => import('pages/New.vue') },
      {
        name: 'meme',
        path: '/m/:memeId/:slug?',
        component: () => import('pages/Meme.vue'),
        props: true,
      },
      {
        name: 'user',
        path: '/u/:username',
        component: () => import('pages/User.vue'),
        props: true,
      },
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
