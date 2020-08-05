import Vue from 'vue';
import VueRouter from 'vue-router';
import BooksList from '../views/BooksList.vue';
import AuthorsList from '../views/AuthorsList.vue';
import BookForm from '../views/BookForm.vue';
import AuthorForm from "../views/AuthorForm";

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
        component: BookForm,
    },
    {
        path: '/authors',
        name: 'Authors',
        component: AuthorsList,
    },
    {
        path: '/authors/new',
        name: 'NewAuthor',
        component: AuthorForm,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
