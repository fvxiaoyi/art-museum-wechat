<template>
	<div id="art-self">
		<div class="top-bar clear">
			<div class="photo left">
				<img src="../../static/img/icon-student.png">
			</div>
			<div class="text left">
				<span>{{student.name}}</span>
				<span>|</span>
				<span>{{student.age}}岁</span>
			</div>
			<div class="total right">
				<div class="artTotal left">
					<div class="num">{{student.totalArticle}}</div>
					<div class="label">作品</div>
				</div>
				<div class="starTotal left">
					<div class="num">{{student.totalStar}}</div>
					<div class="label">喜欢</div>
				</div>
			</div>
		</div>
		<div class="list-warp" @scroll="loadMore($event)" ref="selfWrap" >
			<div class="art-wrap" v-for="(item, index) in list" :key="item.id">
				<div class="art" @click="$router.push(`/art/${item.id}`)" >
					<img :src="`${item.thumbnailUrl}?imageView2/1/w/696`">
				</div>
				<div class="info clear">
					<div class="text-wrap left">
						<div class="title">{{item.name}}</div>
						<div class="author">
							<span>{{item.studentName}}</span>
							<span>|</span>
							<span>{{item.studentAge}}岁作品</span>
						</div>
						<div class="star">
							<div class="icon-wrap left">
								<img src="../../static/img/icon-like-s.png" />
							</div>
							<div class="left">{{item.totalArticleStar}}人喜欢此作品</div>
						</div>
					</div>
					<div class="btn-wrap right">
	          <div :class="[ item.isStar ? 'icon-fav' : 'icon-no-fav', 'left']" @click="star(item)"></div>
	          <div class="icon-share right" @click="handleShare(item)"></div>
					</div>
				</div>
			</div>
			<div v-if="list.length > 0" class="end">没有更多了</div>
		</div>
    <v-guide :visible="guideVisible" @close="guideVisible = false"></v-guide>
	</div>
</template>

<script>
import { mapState  } from 'vuex'
import url from 'url'

export default {
	activated() {
    if(this.viewStudentId != this.$route.params.id) {
      this.$store.commit('setViewStudentId', this.$route.params.id)
    } else {
    	if(this.reloadMe) {
    		this.reload()
    		this.$store.commit('setReloadMe', false)
    	} else {
    		this.$refs.selfWrap.scrollTop = this.scrollTop
    	}
    }
	},
	deactivated() {
    this.scrollTop = this.$refs.selfWrap.scrollTop
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.commit('setViewStudentId', to.params.id)
    next()
  },
	created() {
		this.$store.commit('setViewStudentId', this.$route.params.id)
	},
	data() {
		return {
      guideVisible: false,
			scrollTop: 0,
			loadMoreFinish: false,
      student: {},
			list: [],
      total: 0,
      page: 1
		}
	},
	methods: {
    getStudentData(id) {
      let me = this
      me.post('/wx/student/getTotal', {id}, (res) => {
        me.student = res.data
      })
    },
    reload() {
    	this.$refs.selfWrap.scrollTop = 0
    	this.list = []
    	this.page = 1
    	this.loadMoreFinish = false
    	this.getData(() => {
    		this.wxShare(`${this.student.name}的美学艺术馆`, '我在hi美学的作品全在这哦', window.location.href, '../../static/img/icon-student.png')
    	})
    },
		getData(shareCb) {
      let me = this
      me.post('/wx/student/getTotal', {id: me.viewStudentId}, (res) => {
        me.student = res.data
        shareCb && shareCb()
      })
      me.getListData('/wx/art/listByStudent', me.page, { 
        studentId: me.viewStudentId,
        openId: localStorage.getItem('openid')
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
    star(item) {
      let me = this
      if(!item.isStar) {
        this.post('/wx/star/mark', { 
          openId: localStorage.getItem('openid'),
          name: me.userInfo.name,
          articleId: item.id
        }, (res) => {
          item.isStar = true
          item.totalArticleStar ++ 
          me.student.totalStar ++
        })
      }
    },
    handleShare(item) {
      const myURL = url.parse(window.location.href)
    	this.wxShare(item.name, item.remark, `${myURL.protocol}//${myURL.host}#/art/${item.id}`, `${item.thumbnailUrl}?imageView2/2/w/200`)
      this.guideVisible = true
    }
	},
	computed: {
    ...mapState(['userInfo', 'viewStudentId', 'reloadMe'])
	},
	watch: {
		viewStudentId(val) {
			this.reload()
		}
	}
}
</script>

<style scoped>
	#art-self {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	#art-self .top-bar {
		height: 1.626rem;
		padding: 0 0.533rem;
		border-bottom: 0.026rem solid #D9D9D9;
	}

	#art-self .top-bar .photo {
		width: 1.28rem;
		height: 1.28rem;
		border-radius: 50%;
		overflow: hidden;
		margin: 0.173rem 0.24rem 0 0;
	}

	#art-self .top-bar .photo img {
		width: 1.28rem;
		height: 1.28rem;
	}

	#art-self .top-bar .text {
		height: 1.626rem;
		line-height: 1.626rem;
	}

	#art-self .top-bar .text span {
		font-size: 0.4rem;
		color: #2B7F8B;
		margin-left: 0.12rem;
	}

  #art-self .top-bar .total {
  	height: 1.626rem;
		display: flex;
    justify-content: center;
    align-items: center;
  }

	#art-self .top-bar .artTotal {
		color: #2B7F8B;
	}

	#art-self .top-bar .starTotal {
		margin-left: 0.26rem;
		color: #FE7D7C;
	}

	#art-self .top-bar .num {
		font-weight: bold;
		font-size: 0.5rem;
	}

	#art-self .top-bar .label {
		font-size: 0.32rem;
	}

	#art-self .top-bar .num, #art-self .top-bar .label {
		text-align: center;
	}

	/** 列表 **/

	#art-self .list-warp {
		padding-top: 0.48rem;
		flex: 1;
		overflow: scroll;
		background-color: #FAFAFA;
	}

	#art-self .art-wrap {
		margin-bottom: 0.506rem;
	}

	#art-self .art {
		margin: 0 auto;
		width: 9.066rem;
		height: 6.82rem;
		border-radius: 0.2rem;
		overflow: hidden;
	}

	#art-self .info {
		margin: 0 auto;
		width: 9.066rem;
		height: 2.98rem;
		border-bottom: 0.026rem solid #DCDFE6;
	}

	#art-self .info .text-wrap {
		margin-top: 0.28rem;
		padding-left: 0.106rem;
	}

	#art-self .info .title {
		font-size: 0.64rem;
		font-weight: bold;
		margin-bottom: 0.2rem;
		color: #353535;
	}

	#art-self .info .author {
		margin-bottom: 0.24rem;
	}

	#art-self .info .author span {
		font-size: 0.4rem;
		color: #2B7F8B;
		margin-left: 0.12rem;
	}

	#art-self .info .star {
		height: 0.533rem;
		line-height: 0.533rem;
		color: #2B7F8B;
	}

	#art-self .info .star .icon-wrap {
		width: 0.533rem;
		height: 0.533rem;
	}

	#art-self .info .btn-wrap {
		margin: 0.8rem 0.08rem 0 0;
    height: 1.3rem;
    width: 3.226rem;
    border-radius: 0.2rem;
    background-image: url("../../static/img/board-like.png");
    background-size: 3.226rem 1.3rem ;
    overflow: hidden;
	}

	#art-self .info .btn-wrap .icon-share, #art-self .info .btn-wrap .icon-no-fav, #art-self .info .btn-wrap .icon-fav {
    height: 1.066rem;
    width: 1.066rem;
    background-size:  1.066rem 1.066rem;
    background-repeat: no-repeat;
    margin-top: 0.117rem;
  }

  #art-self .info .btn-wrap .icon-share {
    background-image: url("../../static/img/icon_share.png");
    margin-right: 0.2735rem;
  }

	#art-self .info .btn-wrap .icon-no-fav {
    background-image: url("../../static/img/icon-like1.png");
    margin-left: 0.2735rem;
  }

  #art-self .info .btn-wrap .icon-fav {
    background-image: url("../../static/img/icon-like2.png");
    margin-left: 0.2735rem;
  }

  .end {
    text-align: center;
    font-size: 0.3rem;
    height: 0.6rem;
    line-height: 0.6rem;
  }
	
</style>