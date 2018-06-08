import Vue from 'vue'
import Router from 'vue-router'

const index = () => import('@/page/index')
const home = () => import('@/page/home')
const me = () => import('@/page/me')
const detail = () => import('@/page/detail')
const coupon = () => import('@/page/coupon')


Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      component: index,
      children:[{
        path: '/', 
        component: home
      },{
        path: '/me', 
        component: me
      }]
    }, {
      path: '/art/:id',
      component: detail
    }, {
      path: '/coupon',
      component: coupon
    }
  ]
})
