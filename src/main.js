// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import Vuex from 'vuex'
import { Swipe, SwipeItem, Actionsheet } from 'mint-ui'
import 'mint-ui/lib/style.css'
import storeConfig from './store/index'
import dialog from './components/dialog'
import guide from './components/guide'
import code from './components/code'

Vue.use(require('vue-wechat-title'))
const wx = require('weixin-js-sdk')
const url = require('url'),
	appid = 'wxaf22660af129589f',
  current_uri= 'http://wx.blcow.cn',
  server_uri = 'http://api.blcow.cn',
	redirect_uri = encodeURIComponent(`${server_uri}/wx/login`)

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$server_uri = server_uri
Vue.component('v-dialog', dialog)
Vue.component('v-guide', guide)
Vue.component('v-two-code', code)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

let current_url = window.location.href.split('#')[0]
const store = new Vuex.Store(storeConfig)

axios.interceptors.request.use(
  config => {
    if(localStorage.getItem("openid")) {
      config.headers.common['openid'] = localStorage.getItem("openid")
    }
    return config
  },
  err => {
    return Promise.reject(err)
})
let post = function(url, param, cb, errCb) {
  let me = this
  axios.post(`${server_uri}${url}`, param).then(function (response) {
    if(response.data.success) {
      cb(response.data)
    } else {
      if(errCb) {
        errCb(response.data.msg)
      } else {
        console.log(response.data.msg)
      }
    }
  }).catch(function(error) {
    console.error(error)
  })
}

Vue.prototype.post = post

Vue.prototype.getListData = function(url, page, params, cb, paramCb) {
  let me = this,
      limit = 10,
      start
  if(page === 1) {
    start = 0
  } else {
    start = limit * (page - 1)
  }
  let _params = { start, limit }
  for(let x in params) {
    if(!params[x]) {
      delete params[x]
    }
  }
  Object.assign(_params, params)
  paramCb && paramCb(_params)
  this.post(url, _params, (response) => {
    cb(response.data, response.total)
  })
}

Vue.prototype.wxShare = function (title, desc, link, imgUrl) {
  axios.post(`${server_uri}/wx/sign`, { url: current_url }).then(function (response) {
    wx.config({
      debug: false,
      appId: appid,
      timestamp: response.data.timestamp,
      nonceStr: response.data.nonceStr,
      signature: response.data.signature,
      jsApiList: [
        "onMenuShareTimeline",
        "onMenuShareAppMessage"
      ]
    })
  })
  wx.ready(() => {
    wx.onMenuShareAppMessage({
      title: title, 
      desc: desc,
      link: link,
      imgUrl: imgUrl
    })
    wx.onMenuShareTimeline({
      title: title,
      link: link,
      imgUrl: imgUrl
    })
  })
}

if(localStorage.getItem('openid')) {
  post('/wx/getLoginInfo', { openid: localStorage.getItem('openid') }, (resp) => {
    store.commit('setUserInfo', resp.data)
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
  }, (err) => {
    localStorage.removeItem('openid')
    window.location.href = '/'
  })
} else {
  const myURL = url.parse(window.location.href)
  if(myURL.query) {
    let queryParam = myURL.query.split('&'),
      openid = queryParam.filter(f => f.indexOf('openid') != -1),
      redirect_uri = queryParam.filter(f => f.indexOf('redirect') != -1)
    if(openid.length > 0) {
      openid = openid[0].split('=')[1]
      localStorage.setItem('openid', openid)
      post('/wx/getLoginInfo', { openid: localStorage.getItem('openid') }, (resp) => {
        store.commit('setUserInfo', resp.data)
        if(redirect_uri.length > 0) {
          redirect_uri = redirect_uri[0].split('=')[1]
          window.location.href = `${current_uri}/#${redirect_uri}`
        }
      }, (err) => {
        localStorage.removeItem('openid')
        window.location.href = '/'
      })
    }
  } else {
    let hash
    if(myURL.hash && myURL.hash.length > 1) {
      hash = myURL.hash.substring(1, myURL.hash.length)
    }
    let codeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${hash}&connect_redirect=1#wechat_redirect`
    window.location.href = codeUrl
  }
}