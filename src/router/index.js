import {
    createRouter,
    createWebHistory
} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            name: 'index',
            redirect: '/dashboard',
            meta: {
                isLogin: true,
                title: '首页'
            },
            hidden: true,
        },
        {
            path: '/login',
            name: 'login',
            component: () => import( /* webpackChunkName: "home" */ '../views/Login.vue'),
            meta: {
                isLogin: false,
                title: '登录'
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import( /* webpackChunkName: "home" */ '../views/Dashboard.vue'),
            meta: {
                isLogin: true,
                title: '首页'
            }
        },
        {
            path: '/testcases',
            name: 'testcases',
            component: () => import( /* webpackChunkName: "home" */ '../views/TestCases.vue'),
            meta: {
                isLogin: true,
                title: '题目管理'
            }
        },

        {
            path: '/demo',
            name: 'demo',
            component: () => import( /* webpackChunkName: "home" */ '../views/demo.vue'),
            meta: {
                isLogin: true,
                title: 'demo'
            }
        },
        {
            path: '/edit',
            name: 'task-editor',
            component: () => import( /* webpackChunkName: "home" */ '../components/TaskEditor.vue'),
            meta: {
                isLogin: true,
                title: '题目编辑'
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import( /* webpackChunkName: "home" */ '../views/404.vue'),
            meta: {
                isLogin: false,
                title: '404'
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.isLogin && localStorage.getItem('token')) {
        next()
    } else if (to.meta.isLogin && !localStorage.getItem('token')) {
        next({
            path: '/login'
        })
    } else {
        next()
    }
})

router.afterEach((to, from) => {
    document.title = to.meta.title
})

export default router