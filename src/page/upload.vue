<template>
  <div id="upload-art">
    <div class="loading" v-if="loadingVisible">上传中...</div>
    <div class="title">
      <span>|</span>
      <span>预览图</span>
      <span>|</span>
    </div>
    <div class="upload-warp center" @click="handleWxUpload" :style="model.displayImg ? 'background-image:none;': ''">
      <img v-if="model.displayImg" :src="`${model.thumbnailUrl}?imageView2/1/w/696`">`
    </div>
    <div class="desc center">点击上方空白区域上传作品</div>
    <div class="title center">
      <span>|</span>
      <span>作品名称</span>
      <span>|</span>
    </div>
    <input v-model="model.name" class="art-name" type="text" placeholder="请输入作品名称,限8个字符" />
    <div class="title" v-if="courses.length > 0">
      <span>|</span>
      <span>作品类型</span>
      <span>|</span>
    </div>
    <div class="course clear">
      <div :class="model.courseId == item.id ? 'active' : ''" 
            :style="index == 2 || index == 5 ? '':'margin-right: 0.2rem;'" 
            v-for="(item, index) of courses"
            @click="model.courseId = item.id">
      {{item.name}}
      </div>
    </div>
    <div class="title">
      <span>|</span>
      <span>作品描述</span>
      <span>|</span>
    </div>
    <textarea v-model="model.remark" class="content" placeholder="请输入作品描述,限140字"></textarea>
    <div class="title" v-if="userInfo.localName">收藏校区 : {{userInfo.localName}}</div>
    <div v-if="errMsg" class="err-msg">*{{errMsg}}</div>
    <div class="submit-btn" @click="handleSubmit">确认发表</div>
    <div class="cancel-btn" @click="$router.go(-1)">取消发表</div>
  </div>
</template>

<script>
import { mapState  } from 'vuex'
export default {
  name: 'upload',
  beforeRouteLeave (to, from, next) {
    this.$store.commit('changeMaskVisible', { visible: false })
    next()
  },
  created() {
    let me = this
    if(!me.userInfo.auth) {
      this.$router.push('/')
    } else {
      me.model.studentId = me.userInfo.studentId
      me.post('/wx/student/getCourse', {
        id: me.userInfo.studentId
      }, (res) => {
        me.courses = res.data
        if(me.courses.length > 0) {
          me.model.courseId = res.data[0].id
        }
      })
    }
  },
  data () {
    return {
      loadingVisible: false,
      courses: [],
      model: {
        displayImg: '',
        originalUrl: '',
        thumbnailUrl: '',
        courseId: null
      },
      errMsg: null
    }
  },
  methods: {
    handleWxUpload() {
      this.wxUpload((serverId) => {
        if(serverId && serverId.length > 0) {
          this.post('/wx/store/upload', {serverId, type: 'article'}, (response) => {
            this.model.displayImg = response.data.fileName
            this.model.originalUrl = response.data.original_url
            this.model.thumbnailUrl = response.data.thumbnail_url
            this.loadingVisible = false
          }, (err) => {
            this.loadingVisible = false
            this.errMsg = err
          })
        } else {
          this.loadingVisible = false
          this.errMsg = '上传图片失败'
        }
      }, () => this.loadingVisible = true )
    },
    handleSubmit() {
      let me = this
      this.post('/wx/art/add', me.model, (response) => {
        this.$store.commit('changeMaskVisible', { visible: true })
        me.getListData('/wx/art/list', 1, {}, (data, total) => {
          me.$store.commit('setReloadHome', true)
          me.$store.commit('setReloadMe', true)
          me.$router.push(`/me/${me.userInfo.studentId}`)
        })
      }, (err) => me.errMsg = err)
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    loadingVisible(val) {
      this.$store.commit('changeMaskVisible', { visible: val })
    }
  }
}
</script>


<style scoped>

  .loading {
    position: absolute;
    width: 2rem;
    height: 0.6rem;
    left: 4rem;
    top: 4rem;
    z-index: 11;
    color: #2A808A;
    text-align: center;
    font-size: 0.4rem;
  }

  .course {
    margin: 0 0.5333rem;
  }

  .course div {
    width: 2.744rem;
    height: 0.88rem;
    line-height: 0.88rem;
    margin-bottom: 0.16rem;
    border: 0.05rem solid #F2F2F2;
    border-radius: 0.2rem;
    background-color: #F2F2F2;
    float: left;
    text-align: center;
  }

  .course .active {
    background-color: #fff;
    border-color: #FC7E7C;
    color: #FC7E7C;
  }

  #upload-art {
    height: 100%;
    width: 100%;
    overflow: scroll;
  }

  .center {
    width: 9.066rem;
    margin: 0 auto;
  }

  .title, .desc {
    font-size: 0.32rem;
    color: #353535;
    text-align: center;
  }

  .title {
    height: 1rem;
    line-height: 1rem;
  }

  .desc {
    height: 0.853rem;
    line-height: 0.853rem;
    border-bottom: 0.05rem dotted #29818A;
  }

  .upload-warp {
    height: 6.8rem;
    border-radius: 0.2rem;
    background-image: url('https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/upload-bg.png');
    background-size: 9.066rem 6.8rem;
    background-repeat: no-repeat;
  }

  .upload-warp img {
    width: 100%;
    height: 100%;
    border-radius: 0.2rem;
  }

  #upload-art .art-name {
    display: block;
    margin: 0 auto;
    width: 8.266rem;
    height: 0.96rem;
    border-width: 0.05rem;
    color: #919191;
    font-size: 0.32rem;
    padding: 0 0.4rem;
  }

  .content {
    display: block;
    margin: 0 auto;
    width: 8.266rem;
    height: 2.4rem;
    border: 0.05rem solid #DCDFE6;
    border-radius: 0.2rem;
    resize: none;
    padding: 0.4rem 0.533rem;
    font-size: 0.346rem;
    color: #919191;
  }

  .submit-btn, .cancel-btn {
    background-color: #FC7E7C;
    border-radius: 0.2rem;
    height: 1.0666rem;
    width: 9.34rem;
    color: #fff;
    font-weight: bold;
    font-size: 0.373rem;
    text-align: center;
    line-height: 1.0666rem;
    margin:  0.48rem auto 0 auto;
  }
  
  .cancel-btn {
    background-color: #fff;
    color: #FC7E7C;
    width: 9.3rem;
    border: 0.02rem solid #FC7E7C;
    margin-bottom: 0.8666rem;
  }

  .err-msg {
    text-align: center;
    color: #FC7E7C;
  }

</style>
