import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutPage.vue'),
    },
    {
        path: '/partners',
        name: 'Partner',
        component: () => import(/* webpackChunkName: "about" */ '../views/PartnerPage.vue'),
    },
    {
        path: '/curriculum',
        name: 'Database',
        component: () => import(/* webpackChunkName: "about" */ '../views/DatabasePage.vue'),
    },
    {
        path: '/user',
        name: 'User',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserPage.vue'),
    },
];

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes,
});

export default router;
