<template>
  <div  v-if="visible" @click="close">
    <div class="mask"></div>
    <div class="guide">
      点击右上角即可分享至好友活朋友圈，快快分享鼓励宝贝，为宝贝作品集赞吧！当月可根据积赞数量到线下校区兑换不同面值的购物卡，数量越多面值越大，详情可到线下校区咨询顾问老师。
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

  .guide {
    width: 6.06rem;
    height: 2.286rem;
    background-image: url('../../static/img/guide-bg.png');
    background-size: 6.56rem 2.786rem;
    position: absolute;
    top: 0.24rem;
    right: 0.24rem;
    z-index: 11;
    padding: 0.5rem 0.25rem 0 0.25rem;
    font-size: 0.3rem; 
    color: #FD7D7C;
  }
  
</style>
