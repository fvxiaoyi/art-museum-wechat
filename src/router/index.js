import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/page/login'
import image from '@/page/image'

const index = () => import('@/page/index')
const preview = () => import('@/page/preview')
const detail = () => import('@/page/detail')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    }, {
      path: '/login/:openid/:url',
      component: login
    }, {
      path: '/image',
      component: image
    }, {
      path: '/preview',
      component: preview
    }, {
      path: '/index',
      component: index
    }, {
      path: '/art/:id',
      component: detail
    }
  ]
})
