<template>
  <div id="art-preview">
    <div class="banner-wrap">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <div class="banner">
            <img src="../../static/img/home-Banner-1.png">
          </div>
        </mt-swipe-item>
        <mt-swipe-item>
          <div class="banner">
            <img src="../../static/img/home-Banner-2.png">
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="tab">
      <div class="text-left active">新作</div>
      <div class="split">|</div>
      <div class="text-right">专题</div>
    </div>

    <div class="art-wrap" @scroll="loadMore($event)" ref="previewWrap">
      <div class="art-list">
        <div class="item-wrap" v-for="(item, index) in articleList" @click.stop="onItemClick(item, index)" >
            <div class="info-mask" v-if="item.click"></div>
            <div class="info-wrap" v-if="item.click"  @click.stop="onItemCancelClick(item, index)">
              <div class="photo">
                <img src="../../static/boy-pic.jpg">
              </div>
              <div class="author">
                <span>徐晓辉</span>
                <span>|</span>
                <span>20岁</span>
              </div>
              <div class="link" @click.stop="view(item.id)">打开查看完整作品</div>
          </div>
          <img :src="item.src" :class="[item.id ? '' : 'link-coupon']" >
        </div>
      </div>
      
      <div class="end" v-if="loadMoreFinish">没有更多了</div>
    </div>

    <v-dialog :width="8" :height="5.6" :visible="loginDialogVisible" >
      <div class="dialog-content">
        <input type="text" placeholder="请输入手机号进行激活" />
        <div class="btn active" @click="active">激活</div>
        <div class="btn close" @click="closeLoginDialog">关闭</div>
        <div class="errMsg">
          输入的不是老学员的手机号
        </div>
      </div>
    </v-dialog>

  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  activated() {
    this.$refs.previewWrap.scrollTop = this.scrollTop
  },
  deactivated() {
    this.scrollTop = this.$refs.previewWrap.scrollTop
  },
  created() {
    console.log('preview created')
    this.loadArticleList()
  },
  data () {
    return {
      preIndex: null,
      scrollTop: 0,
      loginDialogVisible: false,
      loadMoreFinish: false
    }
  },
  methods: {
    loadMore(e) {
      if(!this.loadMoreFinish) {
        let totalHeight = e.target.scrollHeight,
          warpHeight = e.target.clientHeight,
          scrollTop = e.target.scrollTop
        if(totalHeight - (warpHeight + scrollTop) <= 1) {
          if(this.articleList.length < 19) {
            this.loadArticleList2()
          } else {
            this.loadMoreFinish = true
          }
          
        }
      }
      
    },
    view(id) {
      this.$router.push(`/art/${id}`)
    },
    active() {
      this.changeAuthorization({authorization: true})
      this.closeLoginDialog()
      this.$router.push(`/self`)
    },
    onItemClick(item, index) {
      if(item.id) {
        this.handleArticleListClick({ preIndex: this.preIndex, index: index})
        this.preIndex = index
      } else {
        this.$router.push('/coupon')
      }
    },
    onItemCancelClick(item, index) {
      if(item.id) {
        this.handleArticleListCancelClick({index: index})
        this.preIndex = null
      }
    },
    openLoginDialog() {
      this.loginDialogVisible = true
      this.changeMaskVisible({ visible: this.loginDialogVisible })
    },
    closeLoginDialog() {
      this.loginDialogVisible = false
      this.changeMaskVisible({ visible: this.loginDialogVisible })
    },
    ...mapMutations({
      changeMaskVisible: 'changeMaskVisible',
      changeAuthorization: 'changeAuthorization',
      handleArticleListClick: 'handleArticleListClick',
      handleArticleListCancelClick: 'handleArticleListCancelClick',
      loadArticleList: 'loadArticleList',
      loadArticleList2: 'loadArticleList2',
    })
  },
  computed: {
    ...mapState(['authorization', 'articleList'])
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
    box-shadow: 0 0.1rem 0.2rem #888888;
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

  #art-preview .item-wrap .link-coupon {
    box-shadow: 0 0.1rem 0.1rem #888888;
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

</style>
