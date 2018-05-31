<template>
  <div id="app">
    <div id="mask" v-if="maskVisible" ></div>

    <div id="contentWrap">
      <router-view id="content" />
      <div id="nav-bottom">
        <div class="btn" v-if="authorization">我的作品</div>
        <div class="btn" v-else>试听码</div>
        <div class="middle-btn" v-if="authorization">+</div>
        <div class="middle-btn"v-else>logo</div>
        <div class="btn">美学艺术馆</div>
      </div>
    </div>

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
      ...mapState(['maskVisible', 'authorization'])
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

  ul { 
    list-style: none; 
    padding: 0;
    margin: 0;
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

  #app {
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
    opacity: 0.2;
    z-index: 1;
  }

  #contentWrap {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  #content {
    flex: 1;
  }

  /** 导航栏 **/
  #nav-bottom {
    height: 1.2rem;
    background-color: #fff;
    display: flex;
    border-top: 0.02rem solid #DCDFE6;
  }

  #nav-bottom .middle-btn, #nav-bottom .btn {
    text-align: center;
    line-height: 1.2rem;
  }

  #nav-bottom .btn {
    flex: 1;
  }

  #nav-bottom .middle-btn {
    width: 0.8rem;
  }

</style>
