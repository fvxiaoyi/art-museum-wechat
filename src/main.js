// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

const url = require('url'),
	appid = 'wxaf22660af129589f',
	redirect_uri = 'http%3a%2f%2fe3evv4.natappfree.cc%2fvail'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  beforeCreate() {
  	console.log('main start')
  	let openId = sessionStorage.getItem('openid')
  	if(!openId) {
  		const myURL = url.parse(window.location.href)
	  	let hash
	  	if(myURL.hash && myURL.hash.length > 1) {
	  		hash = myURL.hash.substring(1, myURL.hash.length)
	  		let codeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${hash}#wechat_redirect`
	  		window.location.href = codeUrl
	  	}
  	}
  }
})
