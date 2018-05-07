<template>
  <div id="app">
    <div id="mask"></div>
    <div id="contentWrap">
      <div id="nav-top"></div>
      <router-view id="content" />
      <div id="nav-bottom"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  /** 37.5 **/
  html, body {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
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
    background-color: orange;
  }

  #nav-top {
    height: 0.8rem;
    background-color: #fff;
    position: absolute;
    width: 100%;
    top: 0;
  }

  #nav-bottom {
    height: 0.8rem;
    background-color: #fff;
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  #content {
    margin: 0.8rem 0;
    flex: 1;
    overflow: scroll;
  }
</style>
