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
  server_uri = 'http://uxhqti.natappfree.cc',
	redirect_uri = encodeURIComponent(`${server_uri}/wx/login`)
  

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
      this.post('/wx/getLoginInfo', { openid: localStorage.getItem('openid') }, (resp) => {
        this.$store.commit('setUserInfo', resp.data)
      }, (err) => {
        localStorage.removeItem('openid')
        location.reload()
      })
    } else {
      const myURL = url.parse(window.location.href)
      //redi
      if(myURL.query) {
        let queryParam = myURL.query.split('&'),
          openid = queryParam.filter(f => f.indexOf('openid') != -1),
          redirect_uri = queryParam.filter(f => f.indexOf('redirect') != -1),
          me = this
        if(openid.length > 0) {
          openid = openid[0].split('=')[1]
          localStorage.setItem('openid', openid)
          this.post('/wx/getLoginInfo', { openid: localStorage.getItem('openid') }, (resp) => {
            this.$store.commit('setUserInfo', resp.data)
            if(redirect_uri.length > 0) {
              redirect_uri = redirect_uri[0].split('=')[1]
              me.$router.push(redirect_uri)
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

  }
})
