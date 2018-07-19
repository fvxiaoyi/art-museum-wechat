<template>
  <div  v-if="visible">
    <div class="mask"></div>
    <div class="code-wrap">
      <div class="code-tbar clear">
        <i class="right" @click="close"></i>
      </div>
      <div class="code-title">Hi美学 少儿艺术实验室</div>
      <div class="code-img">
        <img src="../../static/img/pop-code.png">
      </div>
      <div class="code-bottom">长按识别公众号二维码</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>


<style scoped>
  .code-wrap {
    background-color: #fff;
    border-radius: 0.2rem;
    width: 7.4rem;
    height: 7.4rem;
    position: absolute;
    top: 2rem;
    left: 1.3rem;
    z-index: 11;
  }

  .code-tbar {
    height: 1.0666rem;
    font-size: 0.4rem;
    padding-right: 0.4rem;
  }

  .code-tbar i {
    width: 0.426rem;
    height: 0.426rem;
    margin-top: 0.32rem;
    background-image: url('https://store-1256528427.cos.ap-guangzhou.myqcloud.com/wx/img/close.png');
    background-size: 0.426rem 0.426rem;
  }

  .code-title {
    height: 0.96rem;
    line-height: 0.96rem;
    color: #2B7F8B;
    font-size: 0.4rem;
    text-align: center;
  }

  .code-img {
    width: 3.56rem;
    height: 3.426rem;
    margin: 0 auto;
  }

  .code-bottom {
    text-align: center;
    color: #353535;
    font-size: 0.32rem;
    margin-top: 0.16rem;
  }

  .mask {
    width: 100%;
    height: 100%;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #000;
    opacity: 0.4;
    z-index: 10;
    top: 0;
  }
  
</style>
