<template>
  <div id="subject">
    <div class="subject-list">
      <div class="subject-wrap" v-for="item in list" :key="item.id">
        <div class="img-wrap">
          <img :src="imgSrc" v-if="imgSrc">
        </div>
        <div class="info-wrap">
          <div class="name">
            <span>{{item.courseName}}</span>
            <span>|</span>
            <span>{{item.name}}</span>
          </div>
          <div class="clear">
            <div class="remark">{{item.remark}}</div>
            <div class="time">时间</div>
          </div>
        </div>
      </div>
      
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'subject',
  beforeRouteUpdate (to, from, next) {
    let me = this
    me.courseId = to.params.id
    me.list = []
    me.page = 1
    me.getData()
    next()
  },
  created() {
    let me = this
    me.courseId = me.$route.params.id
    me.getData()
  },
  data () {
    return {
      courseId: null,
      list: [],
      total: 0,
      page: 1,
      imgSrc: '',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getData() {
      let me = this
      me.getListData('/wx/subject/list', me.page, {
        courseId: me.courseId
      }, (data, total) => {
        console.log(data)
        data.forEach(d => me.list.push(d))
      })
    }
  }
}
</script>


<style scoped>
  #subject {
    height: 100%;
    margin: 0 0.36rem;
    display: flex;
  }

  .subject-list {
    flex: 1;
    overflow: scroll;
  }

  .subject-wrap {
    display: flex;
    border-bottom: 0.05rem dotted #F2F2F2;
    padding-bottom: 0.2666rem;
    margin-bottom: 0.2666rem;
  }

  .img-wrap {
    width: 2.666rem;
    height: 1.653rem;
    background-color: #F2F2F2;
    border-radius: 0.2rem;
    margin-right: 0.346rem;
  }

  .info-wrap {
    color: #353535;
    font-size: 0.32rem;
    flex: 1;
  }

  .subject-wrap .name {
    font-size: 0.36rem;
    margin-bottom: 0.4rem;
  }
  
  .subject-wrap .remark {
    width: 5rem;
    overflow: hidden;
    text-overflow: clip;
    white-space: nowrap;
    float: left;
  }

  .subject-wrap .time {
    margin: 0 0.12rem;
    float: right;
  }

</style>
