<template>
  <div>
    <div id="coupon">
      <div class="bg">
        <div class="title">|&nbsp;信息填写&nbsp;|</div>
        <input type="text" placeholder="宝贝姓名（选填）" /> 
        <input type="text" placeholder="宝贝年龄（选填）" /> 
        <input type="text" placeholder="家长手机号" style="margin-bottom:0;" />
        <div class="label">方便接听时段 :</div>
        <div class="time-wrap">
          <div class="time">
            <div class="top">早</div>
            <div class="bottom">9:00~12:30</div>
          </div>
          <div class="time active">
            <div class="top">午</div>
            <div class="bottom">14:00~18:00</div>
          </div>
          <div class="time" style="margin-right:0;">
            <div class="top">晚</div>
            <div class="bottom">18:00~21:30</div>
          </div>
        </div>
        <div class="btn" @click="handleConfirm">提交</div>
      </div>
      
    </div>
  </div>
</template>


<script>
import { mapMutations } from 'vuex'
  export default {
    created() {
      console.log('coupon created')
    },
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
        /*this.confirmDialogVisible = true
        this.changeMaskVisible({ visible: this.confirmDialogVisible })*/
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
  }

  #coupon .bg {
    margin: 0.16rem auto 0 auto;
    width: 9.06rem;
    height: 8.837rem;
    background-image: url("../../static/img/inv-bg.png");
    background-size: 9.06rem 14.73rem;
    background-repeat: no-repeat;
    padding-top: 5.893rem;
  }

  #coupon .title {
    text-align: center;
    color: #FC7E7C;
    font-size: 0.373rem;
    margin-bottom: 0.32rem;
  }

  #coupon input {
    margin: 0 auto;
    display: block;
    width: 5.973rem;
    height: 0.96rem;
    margin-bottom: 0.373rem;
    border-width: 0.05rem;
    color: #919191;
    font-size: 0.32rem;
    padding: 0 0.4rem;
  }

  #coupon input:focus {
    color: #FC7E7C;
    border-color: #FC7E7C;

  }

  #coupon input:focus::-webkit-input-placeholder {
    color: #FC7E7C;
  }

  #coupon .label {
    margin: 0 auto;
    height: 0.853rem;
    line-height: 0.853rem;
    width: 6.773rem;
    color: #FC7E7C;
    text-align: left;
  }

  #coupon .time-wrap {
    margin: 0 auto 0.32rem auto;
    height: 1.44rem;
    width: 6.773rem;
    display: flex;
  }

  #coupon .time {
    border: 0.05rem solid #D9D9D9;
    border-radius: 0.2rem;
    height: 1.34rem;
    width: 2.08rem;
    text-align: center;
    margin-right: 0.1165rem;
    flex: 1;
  }

  #coupon .time .top {
    margin-top: 0.24rem;
    font-size: 0.4rem;
  }

  #coupon .time .bottom {
    font-size: 0.293rem;
  }
 

  #coupon .time-wrap .active {
    color: #FC7E7C;
    font-weight: bold;
    border-color: #FC7E7C;
  }

  #coupon .btn {
    margin: 0 auto;
    background-color: #FC7E7C;
    font-weight: bold;
    font-size: 0.373rem;
    height: 1.066rem;
    width: 4.133rem;
    line-height: 1.066rem;
  }

</style>