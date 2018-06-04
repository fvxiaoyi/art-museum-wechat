<template>
  <div id="art-preview">
    <div class="login" v-if="!authorization">
      <div class="remark">引导语</div>
      <div class="btn-wrap">
        <div class="btn" @click="openLoginDialog">登录</div>
      </div>
    </div>

    <div class="art-wrap" @scroll="loadMore($event)">
      <div class="art-list">
        <div class="item-wrap" v-for="item in list" :key="item.id" @click="view(item.id)" >
          <img :src="item.src">
        </div>
      </div>
      
      <div class="end" v-if="loadMoreFinish">没有更多了</div>
    </div>

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
  created() {
    console.log('preview created')
  },
  data () {
    return {
      loginDialogVisible: false,
      loadMoreFinish: false,
      list: [{
        id: "1",
        src: "../../static/art2.jpg"
      },{
        id: "2",
        src: "../../static/art1.jpg"
      },{
        id: "3",
        src: "../../static/art2.jpg"
      },{
        id: "4",
        src: "../../static/art1.jpg"
      },{
        id: "5",
        src: "../../static/art2.jpg"
      },{
        id: "6",
        src: "../../static/art1.jpg"
      },{
        id: "7",
        src: "../../static/art1.jpg"
      },{
        id: "8",
        src: "../../static/art1.jpg"
      },{
        id: "9",
        src: "../../static/art1.jpg"
      }]
    }
  },
  methods: {
    loadMore(e) {
      if(!this.loadMoreFinish) {
        let totalHeight = e.target.scrollHeight,
          warpHeight = e.target.clientHeight,
          scrollTop = e.target.scrollTop
        if(totalHeight - (warpHeight + scrollTop) <= 1) {
          if(this.list.length < 19) {
            for(let i=0;i<10;i++) {
              this.list.push({
                id: "1" + i,
                src: "../../static/art1.jpg"
              })
            }
          } else {
            this.loadMoreFinish = true
          }
          
        }
      }
      
    },
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

  #art-preview .dialog-content {
    padding: 0.3rem 0.26rem 0.26rem 0.26rem;
  }

  #art-preview .dialog-content .btn {
    height: 1rem;
    line-height: 1rem;
    margin-bottom: 0.26rem;
  }

  #art-preview .dialog-content .active {
    background-color: #67C23A;
  }

  #art-preview .dialog-content .close {
    background-color: #F56C6C;
  }

  #art-preview .dialog-content .errMsg {
    text-align: center;
    color: #E6A23C;
    font-size: 0.3rem;
  }

  #art-preview .dialog-content input {
    height: 1rem;
    line-height: 1rem;
    width: 95%;
    margin-bottom: 0.26rem;
    font-size: 0.3rem;
  }

  #art-preview {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /** 顶部登录块 **/
  #art-preview .login {
    width: 100%;
    height: 3.2rem;
    border-bottom: 0.02rem solid #DCDFE6;
  }

  #art-preview .login .remark {
    margin-bottom: 1.4rem;
  }

  #art-preview .btn-wrap {
    width: 100%;
  }

  #art-preview .btn-wrap .btn {
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

  #art-preview .art-wrap {
    margin-top: 0.26rem;
    flex: 1;
    overflow: scroll;
  }

  #art-preview .art-list {
    display: flex;
    flex-flow: row wrap;
  }

  #art-preview .item-wrap {
    width: 4.61rem;
    height: 4.74rem;
  }

  #art-preview .item-wrap:nth-child(odd) {
    padding: 0 0.13rem 0.26rem 0.26rem;
  }

  #art-preview .item-wrap:nth-child(even) {
    padding: 0 0.26rem 0.26rem 0.13rem;
  }

  #art-preview .end {
    text-align: center;
    font-size: 0.3rem;
    height: 0.6rem;
    line-height: 0.6rem;
  }

</style>
