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

Vue.use(require('vue-wechat-title'))

const wx = require('weixin-js-sdk')

const url = require('url'),
	appid = 'wxaf22660af129589f',
	redirect_uri = encodeURIComponent('http://9ws8zz.natappfree.cc/wechat/login') ,
  server_uri = 'http://9ws8zz.natappfree.cc'

Vue.use(Vuex)

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$server_uri = server_uri

Vue.component('v-dialog', dialog)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Actionsheet.name, Actionsheet)

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

Vue.prototype.post = function(url, param, cb, errCb) {
  let me = this
  me.$http.post(`${server_uri}${url}`, param).then(function (response) {
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
    console.log(error)
    
  })
}

Vue.prototype.wxShare = function (title, desc, link) {
  axios.post(`${server_uri}/wx/sign`, { url: current_url }).then(function (response) {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: appid, // 必填，公众号的唯一标识
      timestamp: response.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
      signature: response.data.signature,// 必填，签名，见附录1
      jsApiList: [
        "onMenuShareTimeline",
        "onMenuShareAppMessage"
      ]
    });
  })
  
  wx.ready(() => {
    wx.onMenuShareAppMessage({ // 分享给朋友
      title: title, // 分享标题
      desc: desc,   // 分享描述
      link: link,   // 分享链接 默认以当前链接
      imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528695538112&di=08a7aeceb13531e9b210f7d27a7b0a31&imgtype=0&src=http%3A%2F%2Fimgx.wadongxi.net%2Fitem%2Fi1%2FTB12RosHVXXXXX7XVXXXXXXXXXX_%2521%25210-item_pic.jpg_400x400Q90.jpg'
    });
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: link,
      imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528695538112&di=08a7aeceb13531e9b210f7d27a7b0a31&imgtype=0&src=http%3A%2F%2Fimgx.wadongxi.net%2Fitem%2Fi1%2FTB12RosHVXXXXX7XVXXXXXXXXXX_%2521%25210-item_pic.jpg_400x400Q90.jpg'
    });
  });
};

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  beforeCreate() {
    if(localStorage.getItem('openid')) {
      this.post('/wx/getLoginInfo', { openid: localStorage.getItem('openid')}, (data) => {
        sessionStorage.setItem('userinfo', JSON.stringify(data.data))
      })
    } else {
      const myURL = url.parse(window.location.href)
      if(myURL.query) {
        let openid = myURL.query.split('&').filter(f => f.indexOf('openid') != -1)
        if(openid.length > 0) {
          openid = openid[0].split('=')[1]
          localStorage.setItem('openid', openid)
          this.post('/wx/getLoginInfo', { openid}, (data) => {
            sessionStorage.setItem('userinfo', data)
          })
        }
      } else {
        let codeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`
        window.location.href = codeUrl
      }
    }
  }
})
