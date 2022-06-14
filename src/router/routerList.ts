import {RouteRecordRaw} from 'vue-router'
import Layout from '../layout/Index.vue'

export const routerList: Array<RouteRecordRaw> = [
    //  处理404
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/error/404.vue')
    },
    //  登陆页面
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    //  layout页面
    {
        path: '/',
        name: 'dashboard',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '首页'
                },
                component: () => import('../views/dashboard/Index.vue')
            }
        ]
    },
    {
        path: '/',
        name: 'system',
        component: Layout,
        meta: {
            title: '系统管理'
        },
        children: [
            {
                path: '/system/user',
                name: 'user',
                meta: {
                    title: '用户管理'
                },
                component: () => import('../views/system/User.vue')
            },
            {
                path: '/system/role',
                name: 'role',
                meta: {
                    title: '角色管理'
                },
                component: () => import('../views/system/Role.vue')
            },
            {
                path: '/system/menu',
                name: 'menu',
                meta: {
                    title: '菜单管理'
                },
                component: () => import('../views/system/Menu.vue')
            }
        ]
    }
]