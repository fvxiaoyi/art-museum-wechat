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

const appid = 'wxaf22660af129589f',
  current_uri= 'http://hiart.natapp1.cc',
  server_uri = 'http://6kvwia.natappfree.cc'

Vue.use(wxTitle)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.component('v-dialog', dialog)
Vue.component('v-guide', guide)
Vue.component('v-two-code', code)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

Vue.prototype.$server_uri = server_uri
Vue.prototype.$current_uri = current_uri

let current_url = window.location.href.split('#')[0]
Vue.prototype.wxShare = function (title, desc, link, imgUrl) {
  imgUrl = imgUrl || 'https://store-1256528427.cos.ap-guangzhou.myqcloud.com/logo.png'
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

Vue.prototype.post = function(url, param, cb, errCb) {
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
    if ((error.response && error.response.status === 401) || error.message == 'Network Error') {
  		localStorage.removeItem('openid')
    	window.location.reload()
    } else {
      console.error(error)
    }
  })
}

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

const store = new Vuex.Store(storeConfig)

export default function (cb) {
	cb && cb(store)
	new Vue({
	  el: '#app',
	  router,
	  store,
	  components: { App },
	  template: '<App/>'
	})
}