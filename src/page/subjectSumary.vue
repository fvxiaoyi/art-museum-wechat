<template>
  <div id="subject-sumary">
    <div class="banner" v-for="item in hot" @click.prevent="handleSubjectClick(item.id)">
      <img :src="item.originalUrl">
    </div>
    <div class="title clear">
      <i class="icon"></i>
      <span style="margin: 0 0.16rem 0 0.24rem;">|</span>
      <span>最新专题</span>
    </div>
    <div class="subject-wrap" v-for="item in list" :key="item.id" @click.prevent="handleSubjectClick(item.id)">
      <div class="img-wrap">
        <img :src="`${item.thumbnailUrl}?imageView2/2/w/204`" v-if="item.displayImg">
      </div>
      <div class="info-wrap">
        <div class="name">
          <span>{{item.courseName}}</span>
          <span>|</span>
          <span>{{item.name}}</span>
        </div>
        <div class="clear">
          <div class="remark">{{item.remark}}</div>
          <div class="time">{{item.createTime && item.createTime.split('T')[0]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    let me = this
    this.$store.commit('setCourseId', null)
    me.post('/wx/subject/sumary', {}, (res) => {
      me.hot = res.data.hot
      me.list = res.data.new
    })
  },
  name: 'subjectSumary',
  data () {
    return {
      hot: [],
      list: []
    }
  },
  methods: {
    handleSubjectClick(id) {
      this.$store.commit('setSubjectId', id)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  #subject-sumary {
    height: 100%;
    margin: 0 0.36rem;
  }

  .banner {
    height: 2.6133rem;
    border-radius: 0.2rem;
    background-color: orange;
    margin-bottom: 0.2666rem;
  }

  .banner img {
    border-radius: 0.2rem;
  }
  
  .title {
    margin-bottom: 0.32rem;
    height: 0.9066rem;
    line-height:  0.9066rem;
  }

  .title i {
    width: 0.9066rem;
    height: 0.9066rem;
    background-image: url('../../static/img/icon-arttopic.png');
    background-size: 0.9066rem 0.9066rem;
    float: left;
  }

  .title span {
    font-size: 0.32rem;
    color: #353535;
    float: left;
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

  .img-wrap img {
    border-radius: 0.2rem;
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
    width: 4.3rem;
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
