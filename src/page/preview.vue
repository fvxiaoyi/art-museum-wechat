<template>
  <div class="pv">
    <div class="login" v-if="!authorization">
      <div class="remark">引导语</div>
      <div class="btn-wrap">
        <div class="btn" @click="openLoginDialog">登录</div>
      </div>
    </div>

    <ul class="art-list">
      <li v-for="item in list" :key="item.id" >
        <div class="img-wrap" @click="view(item.id)">
          <img :src="item.src">
        </div>
      </li>
    </ul>
    
    <v-dialog :width="8" :height="5.6" :visible="loginDialogVisible" >
      <div class="dialog-content">
        <input type="text" placeholder="请输入手机号进行激活" />
        <div class="btn active" @click="active">激活</div>
        <div class="btn close" @click="closeLoginDialog">关闭</div>
        <div class="errMsg">
          输入的不是老学员的手机号
        </div>
      </div>
    </v-dialog>

  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      loginDialogVisible: false,
      list: [{
        id: "1",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "2",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "3",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "4",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "5",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "6",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "7",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "8",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      },{
        id: "9",
        src: "https://mailimg.teambition.com/logos/cover-demo.jpg"
      }]
    }
  },
  methods: {
    view(id) {
      this.$router.push(`/art/${id}`)
    },
    active() {
      this.changeAuthorization({authorization: true})
      this.closeLoginDialog()
      this.$router.push(`/self`)
    },
    openLoginDialog() {
      this.loginDialogVisible = true
      this.changeMaskVisible({ visible: this.loginDialogVisible })
    },
    closeLoginDialog() {
      this.loginDialogVisible = false
      this.changeMaskVisible({ visible: this.loginDialogVisible })
    },
    ...mapMutations({
      changeMaskVisible: 'changeMaskVisible',
      changeAuthorization: 'changeAuthorization'
    })
  },
  computed: {
    ...mapState(['authorization'])
  }
}

</script>

<style scoped>

  .dialog-content {
    padding: 0.3rem 0.26rem 0.26rem 0.26rem;
  }

  .dialog-content .btn {
    height: 1rem;
    line-height: 1rem;
    margin-bottom: 0.26rem;
  }

  .dialog-content .active {
    background-color: #67C23A;
  }

  .dialog-content .close {
    background-color: #F56C6C;
  }

  .dialog-content .errMsg {
    text-align: center;
    color: #E6A23C;
  }

  .dialog-content input {
    height: 1rem;
    line-height: 1rem;
    width: 95%;
    margin-bottom: 0.26rem;
  }

  .pv {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /** 顶部登录块 **/
  .pv .login {
    width: 100%;
    height: 3.2rem;
    border-bottom: 0.02rem solid #DCDFE6;
  }

  .pv .login .remark {
    margin-bottom: 1.4rem;
  }

  .pv .btn-wrap {
    width: 100%;
  }

  .pv .btn-wrap .btn {
    width: 3rem;
    height: 1rem;
    background-color: orange;
    margin: 0 auto;
    text-align: center;
    color: #fff;
    line-height: 1rem;
    border-radius: 0.2rem;
  }

  /** 列表 **/

  .pv .art-list {
    flex: 1;
    overflow: scroll;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 0.26rem 0 0.26rem 0;
  }

  .pv .art-list li {
    width: 50%;
    height: 5rem;
  }

  .pv .img-wrap {
    padding: 2%;
    height: 96%;
  }

  .pv .art-list img {
    width: 100%;
    height: 100%;
    object-fit:cover;
  }

</style>
