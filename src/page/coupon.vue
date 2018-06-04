<template>
  <div>
    <div id="coupon">
      <div class="top-bar">
        <div class="title">我要试听</div>
        <i class="iconfont icon-back" @click="back"></i>
      </div>
      <div class="content-wrap">
        <div class="remark">
          获取试听的流程，和注意事项
        </div>
        <div class="form">
          <input type="text" placeholder="请输入手机号码" />  
          <input type="text" placeholder="姓名（选填）" /> 
          <input type="text" placeholder="年龄（选填）" /> 
          <div class="btn" @click="handleConfirm">提交</div>
        </div>
        <div class="profile">
          品牌简介
        </div>
      </div>

      <v-dialog :width="8" :height="5" :visible="confirmDialogVisible" >
        <div class="dialog-content">
        <div class="success icon">
          <i class="iconfont icon-success"></i>
        </div>
        <div class="success content">提交成功,请留意近期来电....</div>
        <div class="btn" @click="close">好的</div>
        </div>
      </v-dialog>
    </div>
  </div>
</template>


<script>
import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        confirmDialogVisible: false
      }
    },
    methods: {
      back() {
        this.$router.push("/preview")
      },
      handleConfirm() {
        this.confirmDialogVisible = true
        this.changeMaskVisible({ visible: this.confirmDialogVisible })
      },
      close() {
        this.confirmDialogVisible = false
        this.changeMaskVisible({ visible: this.confirmDialogVisible })
        this.$router.go(-1)
      },
      ...mapMutations({
        changeMaskVisible: 'changeMaskVisible'
      })
    }
  }
</script>

<style scoped>
  #coupon {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #coupon .top-bar {
    height: 1.4rem;
    line-height: 1.4rem;
    padding: 0 0.26rem;
    border-bottom: 0.02rem solid #DCDFE6;
    position: relative;
  }

  #coupon .top-bar .title {
    margin: 0 auto;
    text-align: center;
  }

  #coupon .top-bar .icon-back {
    position: absolute;
    top: 0;
  }

  #coupon .content-wrap {
    flex: 1;
    padding: 0 0.26rem;
    overflow: scroll;
  }

  #coupon .top-bar, #coupon .remark, #coupon .form input {
    margin-bottom: 0.26rem;
  }

  #coupon .form {
    margin-bottom: 0.6rem;
  }

  #coupon .remark {
    height: 0.8rem;
  }

  #coupon .form input {
    width: 95%;
  }

  #coupon .form .btn {
    margin: 0 auto;
    width: 4rem;
    height: 1rem;
    line-height: 1rem;
  }

  #coupon .dialog-content {
    padding: 0.26rem;
  }

  #coupon .dialog-content .success {
    color: #67C23A;
  }

  #coupon .dialog-content .icon, #coupon .dialog-content .content {
    margin-bottom: 0.26rem;
  }

  #coupon .dialog-content .icon {
    height: 2rem;
    line-height: 2rem;
    text-align: center;
  }

  #coupon .dialog-content .iconfont {
    font-size: 1.4rem;
  }

  #coupon .dialog-content .content {
    text-align: center;
  }

  #coupon .dialog-content .btn {
    margin: 0 auto;
    width: 2.4rem;
    height: 0.8rem;
    line-height: 0.8rem;
  }

</style>