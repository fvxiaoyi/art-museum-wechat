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
import wx from 'weixin-js-sdk'
import wxTitle from 'vue-wechat-title'
import VueLazyload from 'vue-lazyload'

const url = require('url'),
  appid = 'wx500ec50f770a445a',
  current_uri= 'http://wx.himeixue.com',
  server_uri = 'http://api.himeixue.com',
	redirect_uri = encodeURIComponent(`${server_uri}/wx/login`),
  logo_uri = 'https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/logo.png'

Vue.use(VueLazyload, {
  loading: 'https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/no-image.png'
})
Vue.use(Vuex)
Vue.use(wxTitle)
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
        alert(response.data.msg)
      }
    }
  }).catch(function(error) {
    if ((error.response && error.response.status === 401) || error.message === 'Network Error') {
      window.location.reload()
    } else {
      alert(`${url} throw ex => ${error.message}`)
    }
  })
}

Vue.prototype.post = post
Vue.prototype.$current_uri = current_uri

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
  imgUrl = imgUrl || logo_uri
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

Vue.prototype.wxUpload = function (cb, openLoaing) {
  axios.post(`${server_uri}/wx/sign`, { url: current_url }).then(function (response) {
    wx.config({
      debug: false,
      appId: appid,
      timestamp: response.data.timestamp,
      nonceStr: response.data.nonceStr,
      signature: response.data.signature,
      jsApiList: [
        "chooseImage",
        "uploadImage"
      ]
    })
  })
  wx.ready(() => {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'], 
      sourceType: ['album', 'camera'], 
      success: function (res) {
        let localIds = res.localIds.toString()
        openLoaing && openLoaing()
        wx.uploadImage({
          localId: localIds,
          isShowProgressTips: 0,
          success: function (_res) {
            let serverId = _res.serverId
            cb(serverId)
          }
        })
      }
    })
  })
}

Vue.prototype.wxPreview = function (imgUrl) {
  axios.post(`${server_uri}/wx/sign`, { url: current_url }).then(function (response) {
    wx.config({
      debug: false,
      appId: appid,
      timestamp: response.data.timestamp,
      nonceStr: response.data.nonceStr,
      signature: response.data.signature,
      jsApiList: [
        "chooseImage",
        "uploadImage"
      ]
    })
  })
  wx.ready(() => {
    wx.previewImage({
      current: imgUrl,
      urls: [imgUrl]
    })
  })
}

const routerUrl = url.parse(window.location.href)
//分享链接进入
if(routerUrl.query && routerUrl.query.indexOf('link') != -1) {
  let queryParam = routerUrl.query.split('&'),
     link = queryParam.filter(f => f.indexOf('link') != -1),
     linkUrl = link[0].split('=')[1]
  if(linkUrl === 'art' || linkUrl === 'me') {
    let idParam = queryParam.filter(f => f.indexOf('id') != -1),
      id = idParam[0].split('=')[1]
    window.location.href = `${current_uri}/#/${linkUrl}/${id}`
  } else {
    window.location.href = `${current_uri}/#/${linkUrl}`
  }
} else {
//页面正常跳转
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
      window.location.reload()
    })
  } else {
    if(routerUrl.query && routerUrl.query.indexOf('openid') != -1) {
      let queryParam = routerUrl.query.split('&'),
        openid = queryParam.filter(f => f.indexOf('openid') != -1),
        redirect_uri = queryParam.filter(f => f.indexOf('redirect') != -1)
      if(openid.length > 0) {
        openid = openid[0].split('=')[1]
        post('/wx/getLoginInfo', { openid }, (resp) => {
          localStorage.setItem('openid', openid)
          store.commit('setUserInfo', resp.data)
          if(redirect_uri.length > 0) {
            redirect_uri = redirect_uri[0].split('=')[1]
            window.location.href = `${current_uri}/#${redirect_uri}`
          }
        }, (err) => {
          localStorage.removeItem('openid')
          window.location.href = `${current_uri}/#${redirect_uri}`
        })
      }
    } else {
      let hash = '/'
      if(routerUrl.hash && routerUrl.hash.length > 1) {
        hash = routerUrl.hash.substring(1, routerUrl.hash.length)
      }
      let codeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${hash}&connect_redirect=1#wechat_redirect`
      window.location.href = codeUrl
    }
  }
}