import {menuItem} from "./types";

export const menuListData: Array<menuItem> = [
    {
        name: '首页',
        path: '/dashboard',
        icon: 'location'
    },
    {
        name: '系统管理',
        path: '/system',
        icon: 'setting',
        children: [
            {
                name: '用户管理',
                path: '/system/user',
                icon: 'document'
            },
            {
                name: '角色管理',
                path: '/system/role',
                icon: 'document'
            },
            {
                name: '菜单管理',
                path: '/system/menu',
                icon: 'document'
            }

        ]
    },
    {
        name: '测试管理',
        path: '/test',
        icon: 'setting',
        children: [
            {
                name: '测试1',
                path: '/test/test1',
                icon: 'document'
            },
            {
                name: '测试2',
                path: '/test/test2',
                icon: 'document'
            },
            {
                name: '测试3',
                path: '/test/test3',
                icon: 'document'
            }

        ]
    }
]