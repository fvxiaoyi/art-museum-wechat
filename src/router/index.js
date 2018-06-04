import Vue from 'vue'
import Router from 'vue-router'

const index = () => import('@/page/index')
const preview = () => import('@/page/preview')
const self = () => import('@/page/self')
const detail = () => import('@/page/detail')
const coupon = () => import('@/page/coupon')


Vue.use(Router)

export default new Router({
  routes: [{
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
      path: '/art/:id',
      component: detail
    }, {
      path: '/coupon',
      component: coupon
    }
  ]
})
