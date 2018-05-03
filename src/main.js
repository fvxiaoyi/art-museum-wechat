// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'

const wx = require('weixin-js-sdk')

const url = require('url'),
	appid = 'wxaf22660af129589f',
	redirect_uri = 'http%3a%2f%2fthy8k9.natappfree.cc%2fvail',
  server_uri = /*'http://127.0.0.1'*/ 'http://thy8k9.natappfree.cc'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$server_uri = server_uri

let current_url = window.location.href.split('#')[0]

axios.post(`${server_uri}/getJsAPITicket`, { url: current_url }).then(function (response) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appid, // 必填，公众号的唯一标识
    timestamp: response.data.timestamp, // 必填，生成签名的时间戳
    nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
    signature: response.data.signature,// 必填，签名，见附录1
    jsApiList: [
      "onMenuShareTimeline",
      "onMenuShareAppMessage",
      "chooseImage",
      "uploadImage",
      "previewImage",
      "downloadImage",
      "getLocalImgData"
    ]
  });
})

let me = this

wx.ready(function(){

  wx.checkJsApi({
    jsApiList: ['chooseImage', "uploadImage", "previewImage", "downloadImage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function(res) {
      Vue.prototype.$wx = wx
      if(res.errMsg === 'checkJsApi:ok') {
        new Vue({
          el: '#app',
          router,
          components: { App },
          template: '<App/>',
          beforeCreate() {
            if(this.$route.path.indexOf('/login') === -1) {
              let openId = sessionStorage.getItem('openid')
              if(!openId) {
                const myURL = url.parse(window.location.href)
                let hash
                if(myURL.hash && myURL.hash.length > 1) {
                  hash = myURL.hash.substring(1, myURL.hash.length)
                  let codeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${hash}#wechat_redirect`
                  window.location.href = codeUrl
                }
              } else {
                Vue.prototype.$openId = openId
                console.log(openId)
              }
            }
          
          }
        })
      } else {
        alert('在最新版微信中打开')
      }
    }
  });

});

wx.error(function(res){
  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  alert(res)
});