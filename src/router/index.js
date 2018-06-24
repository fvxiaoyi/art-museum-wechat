import Vue from 'vue'
import Router from 'vue-router'

const index = () => import('@/page/index')
const home = () => import('@/page/home')
const me = () => import('@/page/me')
const detail = () => import('@/page/detail')
const coupon = () => import('@/page/coupon')
const upload = () => import('@/page/upload')

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      component: index,
      children:[{
        path: '/', 
        meta: {
          title: '美学艺术馆'
        },
        component: home
      },{
        path: '/me', 
        meta: {
          title: '小画家主页'
        },
        component: me
      }]
    }, {
      path: '/art/:id',
      meta: {
        title: '作品详细'
      },
      component: detail
    }, {
      path: '/coupon',
      meta: {
        title: '获取试听课程'
      },
      component: coupon
    }, {
      path: '/upload',
      meta: {
        title: '填写作品信息'
      },
      component: upload
    }
  ]
})
