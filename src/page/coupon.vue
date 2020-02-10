<template>
  <div>
    <div id="coupon">
      <div class="back">
        <span @click="$router.push('/')">去美学艺术馆逛逛</span>
        <span style="margin: 0 0.2rem;">|</span>
        <span @click="codeDialogVisible = true">关注我们</span>
      </div>
      <div class="bg">
        <div class="title">|&nbsp;信息填写&nbsp;|</div>
        <input type="text" v-model="model.name" placeholder="宝贝姓名（必填）" /> 
        <input type="number" v-model="model.age" placeholder="宝贝年龄" /> 
        <input type="number" v-model="model.phone" placeholder="家长手机号" />
        <input type="text" v-model="model.area" placeholder="所在地区 （例：厦门市思明区）" />
        <input type="text" v-model="model.introducer" placeholder="推荐人（选填）" style="margin-bottom:0;" />
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
        <div class="title">下拉了解品牌内容</div>
        <div class="btn" @click="handleConfirm">提交</div>
      </div>
      <div class="bg1"></div>
      <div class="bg2"></div>
      <div class="bg3"></div>
      <div class="bg4"></div>
      <div class="bg5"></div>
      <div class="bg6"></div>
      <div class="bg7"></div>
      <div class="bg8"></div>
      <!-- <div class="bg6" @click.prevent="">
        <img src="https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/coupon-bg6.png">
      </div> -->


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
      this.wxShare('Hi,亲爱的家长们,请打开艺术之门吧', '还差一步即可获得价值198元的Hi美学体验礼包', `${this.$current_uri}/?link=coupon`, null)
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
        if(!me.model && me.model.trim().length === 0) {
          me.errMsg = '宝贝姓名还未填写' 
          me.openDialog()
        } else {
          this.post('/wx/coupon/add', me.model, (res) => me.openDialog(), (err) => {
            me.errMsg = err 
            me.openDialog()
          })
        }
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
    margin: 0 auto;
    width: 9.06rem;
    height: 13rem;
    background-image: url("https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/inv-bg.png");
    background-size: 9.06rem 18.6rem;
    background-repeat: no-repeat;
    padding-top: 5.853rem;
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
    height: 1.4rem;
    line-height: 1.4rem;
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
    background-image: url('https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/close.png');
    background-size: 0.426rem 0.426rem;
  }

  .bg1 {
    background-image: url('https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/coupon-bg1.png');
    background-size: 10rem 37.24rem;
    width: 10rem;
    height: 37.24rem;
  }

  .bg2 {
    background-image: url('https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/coupon-bg2.png');
    background-size: 10rem 37.24rem;
    width: 10rem;
    height: 37.24rem;
  }

  .bg3 {
    background-image: url('https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/coupon-bg3.png');
    background-size: 10rem 20.24rem;
    width: 10rem;
    height: 20.24rem;
  }

  .bg4 {
    background-image: url('https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/coupon-bg4.png');
    background-size: 10rem 13.24rem;
    width: 10rem;
    height: 13.24rem;
  }

  .bg5 {
    background-image: url('https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/coupon-bg5.png');
    background-size: 10rem 13.24rem;
    width: 10rem;
    height: 13.24rem;
  }

  .bg6 {
    background-image: url('https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/coupon-bg6.png');
    background-size: 10rem 13.24rem;
    width: 10rem;
    height: 13.24rem;
  }

  .bg7 {
    background-image: url('https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/coupon-bg7.png');
    background-size: 10rem 13.24rem;
    width: 10rem;
    height: 13.24rem;
  }

  .bg8 {
    background-image: url('https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/coupon-bg8.png');
    background-size: 10rem 15.24rem;
    width: 10rem;
    height: 15.24rem;
  }

</style>