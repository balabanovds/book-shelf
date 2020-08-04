import Vue from 'vue';
import VueRouter from 'vue-router';
import BooksList from '../views/BooksList.vue';
import AuthorsList from '../views/AuthorsList.vue';
import NewBook from '../views/NewBook.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/books',
    },
    {
        path: '/books',
        name: 'Books',
        component: BooksList,
    },
    {
        path: '/books/new',
        name: 'NewBook',
        component: NewBook,
    },
    {
        path: '/authors',
        name: 'About',
        component: AuthorsList,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
