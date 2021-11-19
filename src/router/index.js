

import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
        },
        {
            path: '/testcases',
            name: 'testcases',
            component: () => import(/* webpackChunkName: "home" */ '../views/TestCases.vue'),
        },
        {
            path: '/edit',
            name: 'task-editor',
            component:() => import(/* webpackChunkName: "home" */ '../components/TaskEditor.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import(/* webpackChunkName: "home" */ '../views/404.vue'),
        }
    ]
})


export default router