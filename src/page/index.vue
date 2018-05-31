<template>
  <div class="index">
    <div id="content">
      <router-view></router-view>
    </div>
    
    <div id="nav-bottom">
      <div class="nav-btn" v-if="authorization" @click="linkSelf">我的作品</div>
      <div class="nav-btn" v-else>我要试听</div>
      <div class="middle-btn" v-if="authorization">+</div>
      <div class="middle-btn"v-else>logo</div>
      <div class="nav-btn" @click="linkPreview">美学艺术馆</div>
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
    }
  },
  computed: {
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
  }

  #nav-bottom .middle-btn, #nav-bottom .nav-btn {
    text-align: center;
    line-height: 1.2rem;
  }

  #nav-bottom .nav-btn {
    flex: 1;
  }

  #nav-bottom .middle-btn {
    width: 0.8rem;
  }
</style>