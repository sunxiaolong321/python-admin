

import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/testcase'
        },
        {
            path: '/testcase',
            name: 'testcase',
            component: () => import(/* webpackChunkName: "home" */ '../views/TestCases.vue')
        },
        {
            path: '/task',
            name: 'task',
            component: () => import(/* webpackChunkName: "home" */ '../components/TaskEditor.vue')
        }
    ]
})


export default router