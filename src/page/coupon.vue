<template>
  <div>
    <div id="coupon">
      <div class="bg">
        <div class="title">|&nbsp;信息填写&nbsp;|</div>
        <input type="text" v-model="model.name" placeholder="宝贝姓名（选填）" /> 
        <input type="number" v-model="model.age" placeholder="宝贝年龄" /> 
        <input type="number" v-model="model.phone" placeholder="家长手机号" style="margin-bottom:0;" />
        <div class="label">方便接听时段 :</div>
        <div class="time-wrap">
          <div :class="['time', model.timePoint === 'MORNING' ? 'active' : '']" @click="handleTimePointClick('MORNING')">
            <div class="top">早</div>
            <div class="bottom">9:00~12:30</div>
          </div>
          <div :class="['time', model.timePoint === 'AFTERNOON' ? 'active' : '']" @click="handleTimePointClick('AFTERNOON')">
            <div class="top">午</div>
            <div class="bottom">14:00~18:00</div>
          </div>
          <div :class="['time', model.timePoint === 'NIGHT' ? 'active' : '']" style="margin-right:0;" @click="handleTimePointClick('NIGHT')">
            <div class="top">晚</div>
            <div class="bottom">18:00~21:30</div>
          </div>
        </div>
        <div class="btn" @click="handleConfirm">提交</div>
      </div>
      <div class="back">
        <span @click="$router.push('/')">去美学艺术馆逛逛</span>
        <span style="margin: 0 0.2rem;">|</span>
        <span @click="codeDialogVisible = true">关注我们</span>
      </div>
      <v-dialog :width="8" :height="3.6" :visible="confirmDialogVisible" >
        <div class="dialog-content">
          <div class="errMsg" v-if="errMsg">{{errMsg}}</div>
          <div class="successMsg" v-else>预约成功</div>
          <div class="btn" @click="closeDialog">确定</div>
        </div>
      </v-dialog>
      <v-two-code :visible="codeDialogVisible"  @close="codeDialogVisible = false"></v-two-code>
    </div>
  </div>
</template>


<script>
  export default {
    beforeRouteLeave (to, from, next) {
      this.$store.commit('changeMaskVisible', { visible: false })
      next()
    },
    created() {
      this.wxShare('领取hi美学免费课程', '', window.location.href, null)
    },
    data() {
      return {
        confirmDialogVisible: false,
        codeDialogVisible: false,
        errMsg: '',
        model: {
          openid: localStorage.getItem('openid'),
          timePoint: 'MORNING'
        }
      }
    },
    methods: {
      handleConfirm() {
        let me = this
        console.log(me.model)
        this.post('/wx/coupon/add', me.model, (res) => me.openDialog(), (err) => {
          me.errMsg = err 
          me.openDialog()
        })
      },
      handleTimePointClick(timePoint) {
        this.model.timePoint = timePoint
      },
      openDialog() {
        this.confirmDialogVisible = true
        this.$store.commit('changeMaskVisible', { visible: this.confirmDialogVisible })
      },
      closeDialog() {
        this.confirmDialogVisible = false
        this.$store.commit('changeMaskVisible', { visible: this.confirmDialogVisible })
        if(!this.errMsg) {
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style scoped>
  #coupon {
    width: 100%;
    height: 100%;
    overflow: scroll;
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

  #coupon .back {
    height: 2.7733rem;
    line-height: 2.7733rem;
    text-align: center;
    color: #227E8B;
    font-size: 0.32rem;
  }

  .dialog-content {
    padding-top: 0.4rem;
  }

  .errMsg, .successMsg {
    text-align: center;
    font-size: 0.5rem;
    margin-bottom: 0.4rem;
  }

  .errMsg {
    color: #E6A23C;
  }

  .successMsg {
    color: #67C23A;
  }

  .code-tbar {
    height: 1.0666rem;
    line-height: 1.0666rem;
    font-size: 0.4rem;
    padding-right: 0.4rem;
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

  .code-tbar i {
    width: 0.426rem;
    height: 0.426rem;
    margin-top: 0.32rem;
    background-image: url('../../static/img/close.png');
    background-size: 0.426rem 0.426rem;
  }

</style>