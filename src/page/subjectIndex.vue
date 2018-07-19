<template>
  <div id="subject-index">
    <div class="tab">
      <div class="text-left" @click="back">新作</div>
      <div class="split">|</div>
      <div class="text-right active">专题</div>
    </div>
    <div class="course clear">
      <div v-for="(item, index) in courses"
          :class="courseId == item.id ? 'active' : ''" 
          :key="item.id"
          :style="(index + 1) % 3 == 0? '':'margin-right: 0.17rem;'"
          @click="handleCourseClick(item.id)"
          >{{item.name}}</div>
    </div>
    <div class="title clear">
      <i class="icon"></i>
      <span style="margin: 0 0.16rem 0 0.24rem;">|</span>
      <span v-if="courseId">所有{{courseName}}专题</span>
      <span v-else>推荐专题</span>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState  } from 'vuex'
export default {
  name: 'subject-index',
  created() {
    let me = this
    me.post('/wx/course/list', {}, (res) => {
      res.data.forEach(d => me.courses.push(d))
    })
  },
  data () {
    return {
      courses: [{
        id: null,
        name: '推荐专题'
      }]
    }
  },
  methods: {
    handleCourseClick(id) {
      this.$store.commit('setCourseId', id)
      if(id) {
        this.$router.push('/subject/list')
      } else {
        this.$router.push('/subject/sumary')
      }
    },
    back() {
      this.$store.commit('setSubjectId', null)
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState(['courseId']),
    courseName() {
      return this.courses.filter(f => f.id === this.courseId)[0].name
    }
  }
}
</script>


<style scoped>
  #subject-index {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .tab {
    height: 1.52rem;
    display: flex;
    align-items: center;
  }

  .tab .split {
    margin: 0 0.666rem;
  }

  .tab .text-left, .tab .text-right {
    flex: 1;
    color: #353535;
    font-size: 0.373rem;
  }

  .tab .text-left {
    text-align: right;
  }

  .tab .text-right {
    text-align: left;
  }

  .tab .active {
    font-weight: bold;
    font-size: 0.48rem;
  }

  .course {
    margin: 0 0.36rem;
  }

  .course div {
    width: 2.88rem;
    height: 0.88rem;
    line-height: 0.88rem;
    margin-bottom: 0.48rem;
    border: 0.05rem solid #F2F2F2;
    border-radius: 0.2rem;
    background-color: #F2F2F2;
    float: left;
    text-align: center;
  }

  .course .active {
    background-color: #FAF16B;
    border-color: #FAF16B;
  }

  .title {
    margin: 0 0.36rem 0.32rem 0.36rem;
    height: 0.9066rem;
    line-height:  0.9066rem;
  }

  .title i {
    width: 0.9066rem;
    height: 0.9066rem;
    background-image: url('https://store-1256528427.cos.ap-guangzhou.myqcloud.com/wx/img/icon-arttopic.png');
    background-size: 0.9066rem 0.9066rem;
    float: left;
  }

  .title span {
    font-size: 0.32rem;
    color: #353535;
    float: left;
  }

  .content {
    flex: 1;
    overflow: scroll;
  }

</style>
