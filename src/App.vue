<template>
  <div id="app-wrap">
    <div v-wechat-title="$route.meta.title"></div>
    <transition name="maskFade">
      <div id="mask" v-if="maskVisible" ></div>
    </transition>
    <transition :name="transitionName">
      <keep-alive include="index" >
        <router-view class="app"></router-view>
      </keep-alive>
    </transition>

  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'App',
    data() {
      return {
        transitionName: ''
      }
    },
    computed: {
      ...mapState(['maskVisible'])
    },
    watch: {
      $route(to, from) {
        this.transitionName = to.path === '/' ? '' : 'slide-left'
      }
    }
  }
</script>

<style>
  /** 37.5 **/
  html, body {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    font-family: '-apple-system', "Helvetica Neue", "Roboto", "Segoe UI", sans-serif;
    color: #BDBDBD;
  }

  div {
    -webkit-tap-highlight-color: transparent;
  }

  ul, li{ 
    list-style: none; 
    padding: 0;
    margin: 0;
  } 

  input {
    height: 0.8rem;
    border: 0.02rem solid #DCDFE6;
    border-radius: 0.16rem;
    outline:none;
    padding-left: 0.26rem;
    -webkit-appearance:none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mint-swipe-indicators {
    left: 90%;
    bottom: 0.13rem;
  }

  .mint-swipe-indicator {
    background: #EDEDED;
    opacity: 1;
  }

  .mint-swipe-indicator.is-active {
    background: #008692;
  }

  .btn {
    border-radius: 0.16rem;
    text-align: center;
    color: #fff;
    display: block;
    background-color: orange;
  }

  .clear:after{
    content: '';
    display: block;
    clear: both;
  }

  .clear{
    zoom:1;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  #app-wrap {
    font-size: 0.32rem;
    height: 100%;
    width: 100%;
    position: relative;
  }

  #mask {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #000;
    opacity: 0.4;
    z-index: 10;
  }

  .maskFade-enter-active, .maskFade-leave-active {
    transition: opacity .2s;
  }

  .app {
    height: 100%;
    width: 100%;
  }

  .slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }
  .slide-right-enter {
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-enter {
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    transform: translate3d(-100%, 0, 0);
  }

</style>
