import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import nProgress from 'nprogress'


const routes: Array<RouteRecordRaw> = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/error/404.vue')
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/Index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    nProgress.start()
    next()
})

router.afterEach(() => {
    nProgress.done()
})

nProgress.configure({
    ease: 'linear',
    speed: 500,
    showSpinner: false  // 是否使用进度环
})
export default router