<template>
  <div id="app-wrap">
    <transition name="maskFade">
      <div id="mask" v-if="maskVisible" ></div>
    </transition>
    <router-view id="app"></router-view>

  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'App',
    data() {
      return {

      }
    },
    computed: {
      ...mapState(['maskVisible'])
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
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: #303133;
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
    z-index: 1;
  }

  .maskFade-enter-active, .maskFade-leave-active {
    transition: opacity .3s;
  }

  #app {
    height: 100%;
    width: 100%;
  }


</style>
