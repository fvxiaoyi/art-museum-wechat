<template>
  <div id="art-preview">
    <div class="banner-wrap" v-if="subjectId == null">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in banners" :key="item.id">
          <div class="banner" @click.prevent="bannerClick(item.id)">
            <img :src="item.originalUrl">
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="tab">
      <div :class="['text-left', subjectId ? '' : 'active']" @click="$store.commit('setSubjectId', null)">新作</div>
      <div class="split">|</div>
      <div class="text-right" @click="handleLinkSubject">专题</div>
    </div>

    <div class="art-wrap" @scroll="loadMore($event)" ref="previewWrap">
      <div class="art-list">
        <div class="item-wrap" v-for="(item, index) in list" @click.prevent="onItemClick(item, index)" >
            <div class="info-mask" v-if="item.click"></div>
            <div class="info-wrap" v-if="item.click"  @click.prevent="onItemCancelClick(item, index)">
              <div class="photo">
                <img src="https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/icon-student.png">
              </div>
              <div class="author">
                <span>{{item.studentName}}</span>
                <span>|</span>
                <span>{{item.studentAge}}岁</span>
              </div>
              <div class="link" @click.prevent="view(item.id)">打开查看完整作品</div>
          </div>
          <img v-lazy="`${item.thumbnailUrl}?imageView2/1/w/347/h/347`" v-if="item.id" />
          <img src="https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/btn-home-inv.png" class="link-coupon" v-else />
        </div>
      </div>
      
      <div class="end" v-if="loadMoreFinish">没有更多了</div>
    </div>

    <v-dialog :width="8" :height="6" :visible="loginDialogVisible" >
      <div class="dialog-content">
        <input type="text" v-model="activePhone" placeholder="请输入手机号进行激活" />
        <div class="btn active" @click="active">激活</div>
        <div class="btn close" @click="closeLoginDialog">关闭</div>
        <div class="errMsg" v-if="activeErrMsg">{{activeErrMsg}}</div>
      </div>
    </v-dialog>

  </div>
</template>

<script>
import { mapState  } from 'vuex'
export default {
  activated() {
    if(this.reloadHome) {
      this.reload()
      this.$store.commit('setReloadHome', false)
    } else {
      this.$refs.previewWrap.scrollTop = this.scrollTop
    }
  },
  deactivated() {
    this.scrollTop = this.$refs.previewWrap.scrollTop
  },
  created() {
    let me = this
    me.post('/wx/subject/banner', {}, (res) => {
      if(!me.userInfo.auth) {
        me.banners.push({
          id: 0,
          originalUrl: 'https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/home-Banner-1.png'
        })
      }
      res.data.forEach(b => me.banners.push(b))
    })
    me.getData(() => this.wxShare('美学艺术馆', '', window.location.href, null))
  },
  data () {
    return {
      activePhone: null,
      activeErrMsg: null,
      banners: [],
      list: [],
      loadMoreFinish: false,
      total: 0,
      page: 1,
      preIndex: null,
      scrollTop: 0,
      loginDialogVisible: false
    }
  },
  methods: {
    getData(cb) {
      let me = this,
        searchParam = {}
      if(this.subjectId) {
        searchParam.subjectId = this.subjectId
      }
      me.getListData('/wx/art/list', me.page, searchParam, (data, total) => {
        if(!me.userInfo.auth) {
          me.list.push({
            id: null
          })
        }
        data.forEach(d => {
          d.click = false
          me.list.push(d)
        })
        me.total = total
        me.loadMoreFinish = me.page * 10 >= total
        cb && cb()
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
    view(id) {
      this.$router.push(`/art/${id}`)
    },
    active() {
      let me = this,
        openid = localStorage.getItem('openid')
      me.post('/wx/student/active', { openid, phone: me.activePhone }, (res) => {
        location.reload()
      }, (err) => me.activeErrMsg = err)
    },
    onItemClick(item, index) {
      if(item.id) {
        if(this.preIndex != null) {
          this.list[this.preIndex].click = false
        }
        this.list[index].click = true
        this.preIndex = index
      } else {
        this.$router.push('/coupon')
      }
    },
    onItemCancelClick(item, index) {
      if(item.id) {
        this.list[index].click = 0
        this.preIndex = null
      }
    },
    openLoginDialog() {
      this.loginDialogVisible = true
      this.$store.commit('changeMaskVisible', { visible: this.loginDialogVisible })
    },
    closeLoginDialog() {
      this.loginDialogVisible = false
      this.$store.commit('changeMaskVisible', { visible: this.loginDialogVisible })
    },
    bannerClick(id) {
      if(id === 0) {
        this.openLoginDialog()
      } else {
        this.$store.commit('setSubjectId', id)
      }
    },
    handleLinkSubject() {
      this.$store.commit('setCourseId', null)
      this.$router.push('/subject/sumary')
    },
    reload() {
      this.$refs.previewWrap.scrollTop = 0
      this.page = 1
      this.loadMoreFinish = false
      this.list = []
      this.preIndex = null
      this.getData()
    }
  },
  computed: {
    ...mapState(['userInfo', 'subjectId', 'reloadHome'])
  },
  watch: {
    subjectId() {
      this.reload()
    }
  }
}

</script>

<style scoped>

  #art-preview {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #art-preview .banner-wrap {
    margin: 0.32rem 0.32rem 0 0.32rem;
    height: 2.613rem;
    box-shadow: 0 0.1rem 0.2rem #DBDBDB;
  }

  #art-preview .banner {
    height: 100%;
  }

  #art-preview .banner-wrap, #art-preview .banner, #art-preview .banner img {
    border-radius: 0.2rem;
    overflow: hidden;
  }

  #art-preview .tab {
    height: 1.52rem;
    display: flex;
    align-items: center;
  }

  #art-preview .tab .split {
    margin: 0 0.666rem;
  }

  #art-preview .tab .text-left, #art-preview .tab .text-right {
    flex: 1;
    color: #353535;
    font-size: 0.373rem;
  }

  #art-preview .tab .text-left {
    text-align: right;
  }

  #art-preview .tab .text-right {
    text-align: left;
  }

  #art-preview .tab .active {
    font-weight: bold;
    font-size: 0.48rem;
  }


  /** 列表 **/

  #art-preview .art-wrap {
    flex: 1;
    overflow: scroll;
  }

  #art-preview .art-list {
    display: flex;
    flex-flow: row wrap;
  }

  #art-preview .item-wrap {
    width: 4.52rem;
    height: 4.52rem;
    margin-bottom: 0.4rem;
    position: relative;
  }

  #art-preview .item-wrap .info-mask {
    border-radius: 0.2rem;
    width: 4.52rem;
    height: 4.52rem;
    position: absolute;
    z-index: 1;
    opacity: 0.5;
    background: #000;
  }

  #art-preview .item-wrap .info-wrap {
    border-radius: 0.2rem;
    width: 4.52rem;
    height: 4.52rem;
    position: absolute;
    z-index: 2;
  }

  #art-preview .item-wrap .info-wrap .photo {
    margin: 0.5rem auto 0 auto;
    border-radius: 50%;
    height: 1.573rem;
    width: 1.573rem;
    overflow: hidden;
  }

  #art-preview .item-wrap .info-wrap .author {
    height: 0.986rem;
    text-align: center;
    line-height: 0.986rem;
    color: #FDFDFD;
  }

  #art-preview .item-wrap .info-wrap .link {
    margin: 0 auto;
    width: 4rem;
    height: 1.066rem;
    border: 0.05rem solid #FDFDFD;
    border-radius: 0.2rem;
    text-align: center;
    line-height: 1.066rem;
    color: #FDFDFD;
    z-index: 3
  }

  #art-preview .item-wrap .info-wrap .author span {
    margin-right: 0.16rem;
  }

  #art-preview .item-wrap img {
    box-shadow: 0 0.1rem 0.1rem #DBDBDB;
  }

  #art-preview .item-wrap img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  #art-preview .item-wrap:nth-child(odd) {
    padding: 0 0.16rem 0 0.32rem;
  }

  #art-preview .item-wrap:nth-child(even) {
    padding: 0 0.32rem 0 0.16rem;
  }

  #art-preview .end {
    text-align: center;
    font-size: 0.3rem;
    height: 0.6rem;
    line-height: 0.6rem;
  }

  #art-preview .dialog-content {
    display: flex;
    flex-direction: column;
    padding: 0.3rem 0.26rem 0.26rem 0.26rem;
  }

  #art-preview .dialog-content .btn {
    flex: 1;
    line-height: 1.0666rem;
    height: 1.0666rem;
    margin-bottom: 0.26rem;
    font-weight: bold;
    font-size: 0.373rem;
    text-align: center;
    border: 0.02rem solid #FC7E7C;
  }

  #art-preview .dialog-content .active {
    background-color: #FC7E7C;
    color: #fff;  
  }

  #art-preview .dialog-content .close {
    background-color: #fff;
    color: #FC7E7C;
  }

  #art-preview .dialog-content .errMsg {
    flex: 1;
    text-align: center;
    color: #E6A23C;
    font-size: 0.3rem;
  }

  #art-preview .dialog-content input {
    flex: 1;
    margin: 0.26rem 0;
    height: 0.96rem;
    line-height: 0.96rem;
    border-width: 0.05rem;
    color: #919191;
    font-size: 0.32rem;
  }

</style>
