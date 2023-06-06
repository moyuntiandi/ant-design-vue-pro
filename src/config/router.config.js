// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: { title: '主页', icon: 'home' }
      },
      {
        path: '/demo',
        name: 'demo',
        component: RouteView,
        meta: { title: '模板', icon: 'setting' },
        children: [
          {
            path: '/demo',
            name: 'demo',
            component: () => import('@/views/demo'),
            meta: { title: '参考模板', icon: 'user' }
          }
        ]
      },
      {
              path: '/system',
              name: 'system',
              component: RouteView,
              meta: { title: '系统管理', icon: 'setting' },
              children: [
                {
                  path: '/system/user',
                  name: 'user',
                  component: () => import('@/views/system/user'),
                  meta: { title: '用户管理', icon: 'user' }
                },
                {
                  path: '/system/role',
                  name: 'role',
                  component: () => import('@/views/system/role'),
                  meta: { title: '角色管理', icon: 'user' }
                },
                {
                  path: '/system/res',
                  name: 'res',
                  component: () => import('@/views/system/res'),
                  meta: { title: '资源管理', icon: 'user' }
                },
                {
                  path: '/system/dict',
                  name: 'dict',
                  component: () => import('@/views/system/dict'),
                  meta: { title: '字典管理', icon: 'user' }
                }
              ]
            }
    ]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  }
]
