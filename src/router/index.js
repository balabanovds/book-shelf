import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/books',
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import('../views/BooksList.vue'),
  },
  {
    path: '/books/new',
    name: 'NewBook',
    component: () => import('../views/BookForm.vue'),
  },
  {
    path: '/authors',
    name: 'Authors',
    component: () => import('../views/AuthorsList.vue'),
  },
  {
    path: '/authors/new',
    name: 'NewAuthor',
    component: () => import("../views/AuthorForm"),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
