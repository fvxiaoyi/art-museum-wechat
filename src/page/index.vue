<template>
  <div class="index">
    <div id="content">
      <router-view></router-view>
    </div>
    
    <div id="nav-bottom">
      <div class="nav-btn" v-if="authorization" @click="linkSelf">
        <i :class="['iconfont', path == '/self' ? ['icon-accountfilling', 'active'] : 'icon-account']"></i>
        <span class="nav-text">我的作品</span>
      </div>
      <div class="nav-btn" v-else @click="linkCoupon">
        <i class="iconfont icon-phone"></i>
        <span class="nav-text">我要试听</span>
      </div>
      <div class="middle-btn" v-if="authorization">+</div>
      <div class="middle-btn"v-else>logo{{path}}</div>
      <div class="nav-btn" @click="linkPreview">
        <i :class="['iconfont', path == '/preview' ? ['icon-color-filling', 'active'] : 'icon-color']"></i>
        <span class="nav-text">美学艺术馆</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created() {
    if(this.authorization) {
      this.$router.push('self');
    } else {
      this.$router.push('preview');
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    linkPreview() {
      this.$router.push("/preview");
    },
    linkSelf() {
      this.$router.push("/self");
    },
    linkCoupon() {
      this.$router.push("/coupon")
    }
  },
  computed: {
    path() {
      return this.$route.path
    },
    ...mapState(['authorization'])
  }
}
</script>

<style scoped>
  .index {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #content {
    flex: 1;
    overflow: auto;
  }

  /** 导航栏 **/
  #nav-bottom {
    height: 1.2rem;
    background-color: #fff;
    display: flex;
    border-top: 0.02rem solid #DCDFE6;
    border-bottom: 0.02rem solid #DCDFE6;
  }

  #nav-bottom .middle-btn, #nav-bottom .nav-btn {
    text-align: center;
    
  }

  #nav-bottom .nav-btn {
    flex: 1;
  }

  #nav-bottom .middle-btn {
    width: 2rem;
    border-left: 0.02rem solid #DCDFE6;
    border-right: 0.02rem solid #DCDFE6;
  }

  #nav-bottom .nav-btn .iconfont {
    font-size: 0.5rem;
    display: block;
    margin: 0.12rem 0 0.02rem 0;
  }

  #nav-bottom .nav-text {
    font-size: 0.3rem;
    margin-left: 0.26rem;
  }

  #nav-bottom .active {
    color: #FFBD17;
  }

</style>