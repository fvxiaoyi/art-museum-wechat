<template>
  <div id="subject">
    <div class="subject-list" ref="subjectList" @scroll="loadMore($event)" >
      <div class="subject-wrap" v-for="item in list" :key="item.id" @click.stop="handleSubjectClick(item.id)">
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
  </div>
</template>

<script>
import { mapState  } from 'vuex'
export default {
  name: 'subject',
  created() {
    this.getData()
  },
  data () {
    return {
      list: [],
      total: 0,
      page: 1,
      loadMoreFinish: false
    }
  },
  methods: {
    getData() {
      let me = this
      me.getListData('/wx/subject/list', me.page, {
        courseId: me.courseId
      }, (data, total) => {
        data.forEach(d => me.list.push(d))
        me.total = total
        me.loadMoreFinish = me.page * 10 >= total
      })
    },
    loadMore(e) {
      if(!this.loadMoreFinish) {
        let totalHeight = e.target.scrollHeight,
          warpHeight = e.target.clientHeight,
          scrollTop = e.target.scrollTop
        if(totalHeight - (warpHeight + scrollTop) <= 1) {
          this.page ++
          this.getData()
        }
      }
    },
    handleSubjectClick(id) {
      this.$store.commit('setSubjectId', id)
      this.$router.push('/')
    }
  },
  watch: {
    courseId(val) {
      this.list = []
      this.page = 1
      this.loadMoreFinish = false
      this.$refs.subjectList.scrollTop = 0
      this.getData()
    }
  },
  computed: {
    ...mapState(['courseId'])
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
