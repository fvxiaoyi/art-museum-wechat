import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/page/login'
import image from '@/page/image'

const index = () => import('@/page/index')
const preview = () => import('@/page/preview')
const self = () => import('@/page/self')
const detail = () => import('@/page/detail')
const coupon = () => import('@/page/coupon')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children:[{
        path: '/preview', 
        component: preview
      },{
        path: '/self', 
        component: self
      }]
    }, {
      path: '/login/:openid/:url',
      component: login
    }, {
      path: '/art/:id',
      component: detail
    }, {
      path: '/coupon',
      component: coupon
    }
  ]
})
