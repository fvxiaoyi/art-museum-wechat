<template>
  <div>
    <div id="index">
      <div id="content">
        <transition :name="transitionName">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
      
      <div id="nav-bottom">
        <div :class="['nav-btn', path == '/self' ? 'active' : '' ]" v-if="authorization" @click="linkSelf">
          <i class="iconfont icon-shouye"></i>
          <span class="nav-text">我的作品</span>
        </div>
        <div class="nav-btn" v-else @click="linkCoupon">
          <i class="iconfont icon-shouye3"></i>
          <span class="nav-text">我要试听</span>
        </div>
        <div class="middle-btn" v-if="authorization">
          <i class="iconfont icon-shouye2"></i>
        </div>
        <div class="middle-btn"v-else>logo{{path}}</div>
        <div :class="['nav-btn', path == '/preview' ? 'active' : '' ]" @click="linkPreview">
          <i class="iconfont icon-color"></i>
          <span class="nav-text">美学艺术馆</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'index',
  created() {
    console.log('index created')
    if(this.authorization) {
      this.$router.push('self');
    } else {
      this.$router.push('preview');
    }
  },
  data() {
    return {
      transitionName: ''
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
  },
  watch: {
    $route(to, from) {
      this.transitionName = to.path === '/self' ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style scoped>

  #index {
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
    z-index: 1;
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
    height: 1.2rem;
    line-height: 1.2rem;
    width: 2rem;
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

  .icon-color {
    font-weight: bold;
  }

  .icon-shouye2 {
    font-size: 1rem;
  }


</style>