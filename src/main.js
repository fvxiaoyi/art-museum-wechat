import axios from 'axios'

const url = require('url'),
  appid = 'wx500ec50f770a445a',
  current_uri= 'http://wx.blcow.cn',
  server_uri = 'http://api.blcow.cn',
  redirect_uri = encodeURIComponent(`${server_uri}/wx/login`)

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

if(localStorage.getItem('openid')) {
  post('/wx/getLoginInfo', { openid: localStorage.getItem('openid') }, (resp) => {
    let x = require('./newVue')
    x.default((store) => store.commit('setUserInfo', resp.data))
  }, (err) => {
    localStorage.removeItem('openid')
    window.location.reload()
  })
} else {
  const myURL = url.parse(window.location.href)
  if(myURL.query) {
    let queryParam = myURL.query.split('&'),
      openid = queryParam.filter(f => f.indexOf('openid') != -1),
      redirect_uri = queryParam.filter(f => f.indexOf('redirect') != -1)
    if(openid.length > 0) {
      openid = openid[0].split('=')[1]
      post('/wx/getLoginInfo', { openid }, (resp) => {
        localStorage.setItem('openid', openid)
        redirect_uri = redirect_uri[0].split('=')[1]
        window.location.href = `${current_uri}/#${redirect_uri}`
      }, (err) => {
        localStorage.removeItem('openid')
        window.location.href = '/'
      })
    }
  } else {
    let hash = '/'
    if(myURL.hash && myURL.hash.length > 1) {
      hash = myURL.hash.substring(1, myURL.hash.length)
    }
    let codeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${hash}&connect_redirect=1#wechat_redirect`
    window.location.href = codeUrl
  }
}