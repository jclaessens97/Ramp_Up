import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/home.vue';
import Login from './pages/login.vue';
import Callback from './pages/callback.vue';
import { getAccessToken } from './services/authService';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/callback', component: Callback },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const publicRoutes = ['/login'];

router.beforeEach((to, from, next) => {
  if (to.path === '/callback') return next();

  const isAuthenticated = getAccessToken();
  console.log(isAuthenticated);

  if (!publicRoutes.includes(to.path) && !isAuthenticated) {
    return next('/login');
  }

  if (publicRoutes.includes(to.path) && isAuthenticated) {
    return next('/');
  }

  next();
});

export default router;
