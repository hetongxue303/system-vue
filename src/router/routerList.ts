import {RouteRecordRaw} from "vue-router";
import Home from '../views/Home.vue'

export const routerList: Array<RouteRecordRaw> = [
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
        path: '/index',
        name: 'index',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/',
        component: Home,
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                meta: {
                    title: '首页'
                },
                component: () => import('../views/dashboard/Dashboard.vue')
            }
        ]
    },
    {
        path: '/system',
        component: Home,
        meta: {
            title: '系统管理'
        },
        children: [
            {
                path: 'user',
                name: 'user',
                meta: {
                    title: '用户管理'
                },
                component: () => import('../views/system/User.vue')
            }
        ]
    }
]