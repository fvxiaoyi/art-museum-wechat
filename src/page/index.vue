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
      
      <div id="nav-bottom" v-if="userInfo.auth">
        <div class="nav-btn" @click="linkHome">
          <div class="icon-wrap">
            <img src="https://store-1256528427.cos.ap-guangzhou.myqcloud.com/wx/img/icon-home-a.png" v-if="path === '/'" />
            <img src="https://store-1256528427.cos.ap-guangzhou.myqcloud.com/wx/img/icon-home-b.png" v-else />
          </div>
          <span :class="['nav-text', path === '/' ? 'active' : '' ]">首页</span>
        </div>
        <div class="middle-btn" @click="onUploadFile">
          <img src="https://store-1256528427.cos.ap-guangzhou.myqcloud.com/wx/img/icon-upload.png">
        </div>
        <div class="nav-btn" @click="linkMe">
          <div class="icon-wrap">
            <img src="https://store-1256528427.cos.ap-guangzhou.myqcloud.com/wx/img/icon-me-a.png" v-if="path.indexOf('/me')!=-1 && userInfo.studentId == viewStudentId" />
            <img src="https://store-1256528427.cos.ap-guangzhou.myqcloud.com/wx/img/icon-me-b.png" v-else />
          </div>
          <span :class="['nav-text', path.indexOf('/me')!=-1 && userInfo.studentId == viewStudentId ? 'active' : '' ]" >我</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'index',
  created() {
    /*console.log('index created')
    if(this.authorization) {
      this.$router.push('me');
    } else {
      this.$router.push('home');
    }*/
  },
  data() {
    return {
      transitionName: ''
    }
  },
  methods: {
    linkHome() {
      this.$router.push("/");
    },
    linkMe() {
      this.$router.push(`/me/${this.userInfo.studentId}`)
    },
    linkCoupon() {
      this.$router.push("/coupon")
    },
    onUploadFile() {
      this.$router.push("/upload")
      /*let file = $event.target.files[0]
      console.log(file)
      this.articleListAddOne()*/
    },
    ...mapMutations({
      articleListAddOne: 'articleListAddOne'
    })
  },
  computed: {
    path() {
      return this.$route.path
    },
    ...mapState(['userInfo', 'viewStudentId'])
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
    height: 1.44rem;
    background-color: #fff;
    display: flex;
    border-top: 0.026rem solid #D9D9D9;
  }

  #nav-bottom .nav-btn {
    margin: 0.1rem 0;
    height: 1.24rem;
    flex: 1;
  }

  #nav-bottom .nav-btn .active {
    color: #353535;
  }

  #nav-bottom .icon-wrap {
    margin: 0 auto;
    height: 0.9rem;
    width: 0.9rem;
  }

  #nav-bottom .middle-btn {
    margin: 0.1rem 0;
    height: 1.24rem;
    width: 1.44rem;
  }

  #nav-bottom .nav-btn span {
    margin: 0 auto;
    width: 1.44rem;
    font-size: 0.24rem;
    font-weight: bold;
    text-align: center;
    display: block;
  }

</style>