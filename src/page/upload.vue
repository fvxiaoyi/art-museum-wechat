<template>
  <div id="upload-art">
    <div class="title">
      <span>|</span>
      <span>预览图</span>
      <span>|</span>
    </div>
    <div class="upload-warp center">
      <img v-if="model.displayImg" :src="`${model.thumbnailUrl}?imageView2/1/w/696`">`
      <input class="upload" type="file" accept="image/*" @change="fileChange" />
    </div>
    <div class="desc center">点击预览图更换当前图片</div>
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
    <div class="submit-btn" @click="handleSubmit">确认发表</div>
    <div class="cancel-btn" @click="$router.go(-1)">取消发表</div>
  </div>
</template>

<script>
import { mapState  } from 'vuex'
export default {
  name: 'upload',
  created() {
    let me = this
    me.model.studentId = me.userInfo.studentId
    me.post('/wx/student/getCourse', {
      id: me.userInfo.studentId
    }, (res) => {
      me.courses = res.data
      if(me.courses.length > 0) {
        me.model.courseId = res.data[0].id
      }
    })
  },
  data () {
    return {
      courses: [],
      model: {
        displayImg: '',
        courseId: null
      },
      imgSrc: null
    }
  },
  methods: {
    fileChange($event) {
      let file = $event.target.files[0],
        formData = new FormData(),
        me = this
      formData.append('file', file)
      formData.append('type', 'article')
      this.post('/wx/store/upload', formData, (response) => {
        me.model.displayImg = response.data.fileName
        me.model.originalUrl = response.data.original_url
        me.model.thumbnailUrl = response.data.thumbnail_url
      })
    },
    handleSubmit() {
      let me = this
      this.post('/wx/art/add', me.model, (response) => {
        me.getListData('/wx/art/list', 1, {}, (data, total) => {
          me.$store.commit('clearArticleList', {})
          me.$store.commit('setArticleList', { data, total, page: 1})
          me.$store.commit('setViewStudentId', null)
          me.$router.push(`/me/${me.userInfo.studentId}`)
        })
      })
    }
  },
  computed: {
      ...mapState(['userInfo'])
  }
}
</script>


<style scoped>

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
    background-color: #EFEFEF;
    border-radius: 0.2rem;
    position: relative;
  }

  .upload {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    z-index: 2;
  }

  .upload-warp img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    border-radius: 0.2rem;
    z-index: 1;
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

</style>
