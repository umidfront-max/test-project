// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { _TOKEN, _REFRESH_TOKEN } from '../service/auth';
const routes = [
   {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      meta: {
         requiresAuth: true
      },
   }, {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
   },
];

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes,
});

router.beforeEach((to, from, next) => {
   if (to.matched.some(record => record.meta?.requiresAuth)) {
      if (!_REFRESH_TOKEN.value) {
         next('/login');
      } else {
         next();
      }
   } else {
      if (to.path === '/login' && _TOKEN.value) {
         next('/');
      } else {
         next();
      }
   }
});


export default router;
