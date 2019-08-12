import Vue from 'vue/dist/vue.esm.js'
import Router from 'vue-router'
import LayoutAdmin from '@/layouts/admin'
import Login from '@/pages/login'
import Regist from '@/pages/regist'
import Search from '@/pages/search'
import FillInfo from '@/pages/fill_info'
import UserInfo from '@/pages/user_info'
import Pay from '@/pages/pay'
import CallbackPay from '@/pages/callback_pay'
import OrderList from '@/pages/order_list'
import Detail from '@/pages/order_detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 机票相关
      path: '/',
      name: 'HomePage',
      component: LayoutAdmin,
      children: [
        {
          path: '',
          redirect: 'Search'
        },
        {
          path: '/search',
          component: Search,
          meta: {
            // 验证登录
            requireAuth: true,
            // 验证用户账户状态必须为 SUCCESS
            isVerifyStatus: true
          }
        },
        {
          path: '/fillinfo',
          component: FillInfo,
          meta: {
            requireAuth: true,
            isVerifyStatus: true
          }
        },
        {
          path: '/pay',
          component: Pay,
          meta: {
            requireAuth: true,
            isVerifyStatus: true
          }
        },
        {
          path: '/callback_pay/:id',
          component: CallbackPay,
          meta: {
            requireAuth: true,
            isVerifyStatus: true
          }
        },
        {
          path: '/order',
          component: { template: `
            <router-view></router-view>
        ` },
          children: [
            {
              path: '',
              redirect: 'all'
            },
            {
              path: 'detail/:id',
              component: Detail
            }, {
              path: 'all',
              component: OrderList
            }
          ]

        }

      ]
    },

    {
      path: '/login',
      name: 'Logiun',
      component: Login
    },
    {
      path: '/regist',
      name: 'Regist',
      component: Regist
    },
    {
      path: '/userinfo',
      name: 'UserInfo',
      component: UserInfo,
      meta: {
        requireAuth: true
      }
    }
  ]
})
