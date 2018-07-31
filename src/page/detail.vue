<template>
	<div>
		<div id="detail">
			<div class="art" @click.prevent="wxPreview(`${model.originalUrl}`)">
				<img :src="`${model.thumbnailUrl}?imageView2/2/w/768`">
			</div>
			<div class="star-wrap">
        <div class="star">
          <div class="icon-like"></div>
          <span class="names">{{starNames}}</span>
          <div class="icon-more" v-if="model.totalArticleStar > 3" @click="allNamesVisible = !allNamesVisible"></div>
          <span class="total">{{model.totalArticleStar}}人喜欢此作品</span>
        </div>
				<div class="all-names" v-if="allNamesVisible">{{starNames}}</div>
			</div>
      <div class="title-wrap clear">
        <div class="title left">{{model.name}}</div>
        <div class="btn-wrap right">
          <div :class="[ isStar ? 'icon-fav' : 'icon-no-fav', 'left']" @click="star"></div>
          <div class="icon-share right" @click="handleShare"></div>
        </div>
      </div>
      <div class="author-wrap">
        <div class="author">
          <span>{{model.studentName}}</span>
          <span>|</span>
          <span>{{model.studentAge}}岁作品</span>
        </div>
        <div class="local">
          <div class="icon-local"></div>
          <span>{{model.studentLocalName}}</span>
        </div>
        <div class="count">
          <div class="icon-count"></div>
          <span>{{model.viewCount}}浏览</span>
        </div>
      </div>
      <div class="size">
        <span>综合材料</span>
        <span>|</span>
        <span>{{year}}</span>
      </div>
      <div class="remark" v-if="model.remark">作品描述: {{model.remark}}</div>
      <div class="banner-wrap">
        <div class="banner clear">
          <div class="photo left"></div>
          <div class="author left">
            <div class="name">{{model.studentName}}</div>
            <div>共{{model.totalArticle}}件作品</div>
          </div>
          <div class="fav-total left">{{model.totalStar}}个喜欢</div>
          <div class="link-me-btn right" @click="linkMe">作品主页</div>
        </div>
      </div>
      <div class="comment-input-wrap">
        <textarea class="content" v-model="comment" placeholder="写下一句鼓励宝宝的话, 支持TA快乐成长 :) "></textarea>
        <div class="submit-btn" @click="submitComment">确认</div>
      </div>

			<div class="comment-list">
        <div class="comment-wrap" v-for="(item, index) in model.comments" :key="item.id">
          <div class="comment" :style="index === 0 ? 'border-top: 0.026rem solid #DCDFE6;' : '', item.subComments.length == 0 ? 'border-bottom: 0.026rem solid #DCDFE6;' : ''">
            <div class="photo">
              <img src="https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/comment-student.png" v-if="item.studentId" />
              <img src="https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/comment-other.png" v-else />
            </div>
            <div class="content-wrap">
              <div class="name">{{item.name}}</div>
              <div class="content">{{item.content}}</div>
              <div class="content-bottom">
                <span style="flex: 1;">{{item.descTime}}</span>
                <i class="reply-icon"></i>
                <span style="color: #2B7F8B;" @click="showReplyInput(index)">回复评论</span>
              </div>
            </div>
          </div>
          <div class="sub-comment-warp" v-for="(subItem, sIndex) in item.subComments" :key="subItem.id"  :style=" sIndex == item.subComments.length - 1 ? 'border-bottom: 0.026rem solid #DCDFE6;' : ''">
            <div style="border-top: 0.026rem dashed #D0D4F3; display: flex; padding: 0.5rem 0">
              <div class="content-wrap">
                <div class="name">{{subItem.name}} 回复 : {{item.name}}</div>
                <div class="content">{{subItem.content}}</div>
              </div>
              <div class="photo">
                <img src="https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/comment-student.png" v-if="subItem.studentId" />
                <img src="https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/comment-other.png" v-else />
              </div>
            </div>
          </div>
          <div class="reply-wrap" v-if="item.replyVisible">
            <input class="reply-input" v-model="item.replyComment" type="text" :placeholder="`回复 : ${item.name} 的评论`" />
            <div class="reply-btn" @click="handleReplyComment(item.id, index)">回复</div>
          </div>
        </div>
			</div>

			<div class="more clear">
				<div class="link-div left">
					<div class="link-type" @click="linkHomeWithSubject">
						<div class="icon"></div>
						<div class="text">
							<div>进入此作</div>
							<div>艺术专题</div>
						</div>
					</div>
					<div class="link-home" @click="linkHome">回艺术馆首页</div>
				</div>
				<div class="author-more right">
					<div class="link-author" @click="linkMe">
						<span>|</span>
						<span>{{model.studentName}}的其他作品</span>
						<span class="right">>></span>
					</div>
					<div class="other">
						<div class="other-art left" v-for="item in model.same" :key="item.id">
              <img :src="`${item.thumbnailUrl}?imageView2/1/w/347/h/347`" v-if="item.id" @click.prevent="$router.push(`/art/${item.id}`)">
							<img :src="item.displayImg" v-else >
						</div>
					</div>
				</div>
			</div>
      <div class="back">
        <span @click="$router.go(-1)">返回上一级</span>
        <span>|</span>
        <span @click="linkHome">回到首页</span>
        <span>|</span>
        <span @click="codeDialogVisible = true">关注我们</span>
      </div>
			<div class="ad" @click="$router.push('/coupon')"></div>
		</div>

    <v-two-code :visible="codeDialogVisible"  @close="codeDialogVisible = false"></v-two-code>
    <v-guide :visible="guideVisible" @close="guideVisible = false"></v-guide>
	</div>
</template>

<script>
  import { mapState } from 'vuex'
	export default {
    beforeRouteUpdate(to, from, next) {
      this.$el.children.detail.scrollTop = 0
      this.getData(to.params.id)
      next()
    },
		created() {
      this.getData(this.$route.params.id)
    },
  	data () {
  		return {
        guideVisible: false,
        allNamesVisible: false,
        codeDialogVisible: false,
  			comment: '',
        model: {
          starInfos: [],
          displayImg: '',
          originalUrl: '',
          thumbnailUrl: '',
          comments: []
        }
  		}
  	},
  	methods: {
      getData(id) {
        if(id) {
          let me = this
          this.post('/wx/art/get', { id }, (res) => {
            res.data.comments.map(m => m.replyVisible = false)
            while(res.data.same.length < 2) {
              res.data.same.push({
                id: null,
                displayImg: 'https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/no-image.png'
              })
            }
            me.model = res.data
            let linkUrl = `${this.$current_uri}/?link=art&id=${this.model.id}`
            this.wxShare(`${this.model.studentName}的美学艺术馆作品-${this.model.name}`, this.model.remark, linkUrl, `${this.model.thumbnailUrl}?imageView2/2/w/200`)
          })
        } else {
          this.$router.push('/')
        }
      },
  		back() {
  			this.$router.go(-1)
  		},
      linkHome() {
        this.$store.commit('setSubjectId', null)
        this.$router.push('/')
      },
      linkMe() {
        this.$router.push(`/me/${this.model.studentId}`)
      },
      linkHomeWithSubject() {
        this.$store.commit('setSubjectId', this.model.subjectId)
        this.$router.push('/')
      },
  		star() {
        let me = this
        if(!this.isStar) {
          this.post('/wx/star/mark', { 
            openId: localStorage.getItem('openid'),
            name: me.userInfo.name,
            articleId: me.model.id
          }, (res) => {
            me.model.starInfos.push({
              openId: localStorage.getItem('openid'),
              name: me.userInfo.name
            })
            me.model.totalArticleStar ++ 
            me.model.totalStar ++
          })
        }
  		},
      handleShare() {
        let linkUrl = `${this.$current_uri}/?link=art&id=${this.model.id}`
        // `${this.$current_uri}/#/art/${this.model.id}`
        this.wxShare(`${this.model.studentName}的美学艺术馆作品-${this.model.name}`, this.model.remark, linkUrl, `${this.model.thumbnailUrl}?imageView2/2/w/200`)
        this.guideVisible = true
      },
      showReplyInput(index) {
        let x = this.model.comments[index];
        x.replyVisible = !x.replyVisible
      },
      submitComment() {
        let me = this
        if(this.comment && this.comment.length > 0) {
          this.post('/wx/comment/add', { 
            articleId: me.model.id,
            topicId: null,
            content: me.comment,
            openId: localStorage.getItem('openid')
          }, (res) => {
            me.comment = ''
            me.post('/wx/comment/list', { articleId: me.model.id }, (res) => {
              res.data.map(m => m.replyVisible = false)
              me.model.comments = res.data
            })
          })
        }
      },
      handleReplyComment(topicId, index) {
        let x = this.model.comments[index],
          cmt = x.replyComment
        if(cmt) {
          let me = this
          this.post('/wx/comment/add', { 
            articleId: me.model.id,
            topicId: topicId,
            content: cmt,
            openId: localStorage.getItem('openid')
          }, (res) => {
            x.replyComment = ''
            me.post('/wx/comment/list', { articleId: me.model.id }, (res) => {
              res.data.map(m => m.replyVisible = false)
              me.model.comments = res.data
            })
          })
        }
      }
  	},
    computed: {
      ...mapState(['userInfo']),
      year() {
        if(this.model.createTime) {
          return this.model.createTime.split('-')[0] 
        } else{
          return ''
        }
      },
      starNames() {
        return this.model.starInfos.map(m => m.name).join(" , ") 
      },
      isStar() {
        for(let f of this.model.starInfos) {
          if(f.openId === localStorage.getItem('openid')) {
            return true
          }
        }
        return false
      }
    }
  }

</script>

<style scoped>

	#detail {
		height: 100%;
		width: 100%;
		overflow: scroll;
	}

	#detail .art {
		width: 100%;
	}

	/** 点赞 **/

  #detail .star-wrap {
    border-bottom: 0.026rem solid #DCDFE6;
  }

	#detail .star {
		padding-left: 0.32rem;
		height: 1.2rem;
		color: #FD7D7C;
    display: flex;
    align-items: center;
	}

  #detail .star .icon-like, #detail .star .icon-more {
    width: 0.8rem;
    height: 0.8rem;
    background-size: 0.8rem 0.8rem;
    background-repeat: no-repeat;
  }

  #detail .star .icon-like {
    background-image: url("https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/icon-more-like.png");
  }

  #detail .star .icon-more {
    background-image: url("https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/icon-more.png");
  }

	#detail .star .names {
		flex: 1;
		color: #353535;
		margin: 0 0.26rem;
		overflow: hidden;
		text-overflow: clip;
		white-space: nowrap;
	}

	#detail .star .total {
		margin-right: 0.48rem;
	}

	#detail .star span {
		font-size: 0.4rem;
	}

  #detail .all-names {
    padding: 0 0.48rem 0 1.38rem;
    color: #353535;
    font-size: 0.4rem;
    margin-bottom: 0.36rem;
  }

  /** 标题 **/

  #detail .title-wrap, #detail .author-wrap, #detail .size, #detail .remark {
    background-color: #FAFAFA;
    padding: 0 0.346rem;
  }

  #detail .title-wrap {
    height: 1.86rem;
  }

  #detail .title-wrap .title {
    margin-top: 0.5rem;
    font-size: 0.64rem;
    font-weight: bold;
    color: #353535;
    width: 5.6rem;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #detail .title-wrap .icon-share, #detail .title-wrap .icon-no-fav, #detail .title-wrap .icon-fav {
    height: 1.066rem;
    width: 1.066rem;
    background-size:  1.066rem 1.066rem;
    background-repeat: no-repeat;
    margin-top: 0.117rem;
  }

  #detail .title-wrap .icon-share {
    background-image: url("https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/icon_share.png");
    margin-right: 0.2735rem;
  }

  #detail .title-wrap .icon-no-fav {
    background-image: url("https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/icon-like1.png");
    margin-left: 0.2735rem;
  }

  #detail .title-wrap .icon-fav {
    background-image: url("https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/icon-like2.png");
    margin-left: 0.2735rem;
  }

  #detail .title-wrap .btn-wrap {
    margin-top: 0.26rem;
    height: 1.3rem;
    width: 3.226rem;
    border-radius: 0.2rem;
    background-image: url("https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/board-like.png");
    background-size: 3.226rem 1.3rem ;
    overflow: hidden;
  }
		
	/** 作者 **/
  #detail .author-wrap {
    display: flex;
    font-size: 0.373rem;
    color: #2B7F8B;
  }

  #detail .author-wrap .author {
    flex: 1;
  }
  
  #detail .author-wrap .local, #detail .author-wrap .count {
    display: flex;
    align-items: center;
  }

  #detail .author-wrap .count {
    margin-left: 0.26rem;
  }

  #detail .author-wrap .icon-local, #detail .author-wrap .icon-count {
    height: 0.5333rem;
    width: 0.5333rem;
    background-size:  0.5333rem 0.5333rem;
    background-repeat: no-repeat;
  }

  #detail .author-wrap .icon-local {
    background-image: url("https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/icon-like-local.png");
  }

  #detail .author-wrap .icon-count {
    background-image: url("https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/icon-like-liulan.png");
  }

  #detail .size {
    font-size: 0.4rem;
    color: #353535;
    height: 1.413rem;
    line-height: 1.413rem;
  }

  #detail .remark {
    font-size: 0.373rem;
    color: #96B4BE;
    max-height: 1.6rem;
  }

  #detail .banner-wrap {
    background-color: #FAFAFA;
    padding: 0.48rem 0.346rem;
    height: 2.666rem;
  }

  #detail .banner {
    height: 2.666rem;
    background-color: #fff;
    border-radius: 0.2rem;
    color: #2B7F8B;
    font-size: 0.32rem;
    padding: 0 0.4rem;
    box-shadow: 0 0.1rem 0.3rem #DBDBDB;
  }

  #detail .banner .photo {
    margin: 0.586rem 0.346rem 0 0;
    width: 1.573rem;
    height: 1.573rem;
    border-radius: 50%;
    overflow: hidden;
    background-image: url('https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/icon-student.png');
    background-size: 1.573rem 1.573rem;
  }

  #detail .banner .author {
    margin-top: 0.773rem;
  }

  #detail .banner .author .name {
    margin-bottom: 0.388rem;
    color: #353535;
    font-size: 0.4rem;
    font-weight: bold;
  }

  #detail .banner .fav-total {
    margin: 1.68rem 0 0 0.4rem;
  }

  #detail .banner .link-me-btn {
    width: 2.146rem;
    height: 0.973rem;
    border: 0.05rem solid #2B7F8B;
    border-radius: 0.2rem;
    line-height: 1.013rem;
    text-align: center;
    margin-top: 0.853rem;
  }
	
  /** 留言  **/

  #detail .comment-input-wrap  {
    height: 5.06rem;
    background-color: #fff;
    border-top: 0.026rem solid #DCDFE6;
    border-bottom: 0.026rem solid #DCDFE6;
    padding: 0 0.346rem;
  }

  #detail .comment-input-wrap .content {
    height: 2.4rem;
    width: 8.267rem;
    background-color: #F2F2F2;
    border: none;
    border-radius: 0.2rem;
    resize: none;
    margin: 0.266rem 0 0.32rem 0;
    padding: 0.4rem 0.533rem;
    font-size: 0.346rem;
    color: #919191;
  }

  #detail .comment-input-wrap .submit-btn {
    background-color: #FC7E7C;
    border-radius: 0.2rem;
    height: 0.933rem;
    width: 2.666rem;
    color: #fff;
    font-weight: bold;
    font-size: 0.373rem;
    text-align: center;
    line-height: 0.933rem;
    margin-left: 6.266rem;
  }


	#detail .comment-list {
    padding: 0.2666rem 0;
    background-color: #F2F2F2;
    color: #353535;
	}

  #detail .comment {
    min-height: 2.0537rem;
    background-color: #fff;
    padding: 0.373rem 0.666rem;
    display: flex;
  }

  #detail .comment .reply-icon {
    width: 0.426rem;
    height: 0.426rem;
    display: block;
    background-image: url("https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/icon-reply.png");
    background-size: 0.426rem 0.426rem;
    margin-right: 0.05rem;
  }

  #detail .comment .content-wrap {
    flex: 1; 
    display: flex; 
    flex-direction: column;
  }

  #detail .content-bottom {
    font-size: 0.266rem; 
    display: flex; 
    height: 0.426rem; 
    line-height: 0.426rem;
  }

  #detail .comment-list .name {
    font-size: 0.346rem;
    font-weight: bold;
    margin-bottom: 0.02rem;
  }

  #detail .comment-list .photo {
    height: 1.066rem;
    width: 1.066rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 0.24rem;
  }

  #detail .comment .content {
    font-size: 0.32rem;
    flex: 1;
    word-wrap: break-word;
    word-break: break-all;
    margin-bottom: 0.373rem;
  }

  #detail .reply-wrap {
    height: 2.76rem;
    background-color: #FFF;
    border-bottom: 0.026rem solid #DCDFE6;
    padding-top: 0.2rem;
  }

  #detail .reply-input {
    display: block;
    border: none;
    height: 0.3rem;
    line-height: 0.3rem;
    width: 8.3333rem;
    background-image: url("https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/reply-input-bg.png");
    background-size: 9.3333rem 1.4rem;
    background-repeat: no-repeat;
    padding: 0.65rem 0.5rem;
    margin: 0 auto;
    color: #353535;
    font-size: 0.266rem;
  }

  #detail .reply-btn {
    background-color: #FC7E7C;
    border-radius: 0.2rem;
    height: 0.933rem;
    width: 2.666rem;
    color: #fff;
    font-weight: bold;
    font-size: 0.373rem;
    text-align: center;
    line-height: 0.933rem;
    margin-left: 7rem;
  }

  #detail .sub-comment-warp {
    min-height: 2.346rem;
    padding: 0 0.666rem;
    background-color: #fff;
  }

  #detail .sub-comment-warp .content-wrap {
    flex: 1;
    text-align: right;
    margin-right: 0.24rem;
  }

  #detail .sub-comment-warp .content {
    font-size: 0.32rem;
    word-wrap: break-word;
    word-break: break-all;
  }

  /** **/

	#detail .more {
		height: 5.333rem;
		background-color: #FAFAFA;
		padding: 0 0.373rem;
	}

	#detail .more .link-div {
		width: 2.986rem;
		margin-right: 0.426rem;
	}

	#detail .more .link-type {
		margin-top: 0.693rem;
		width: 2.986rem;
		height: 2.186rem;
		background-color: #2A808A;
		border-radius: 0.2rem;
		display: flex;
    justify-content: center;
    align-items: center;
	}

	#detail .more .link-type .icon {
		width: 0.906rem;
		height: 0.906rem;
		background-image: url("https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/icon-arttopic.png");
		background-size: 0.906rem 0.906rem;
		background-repeat: no-repeat;
	}

	#detail .more .link-type .text {
		margin-left: 0.26rem;
		color: #fff;
		font-size: 0.346rem;
		font-weight: bold;
	}

	#detail .more .link-home {
		margin-top: 0.346rem;
		height: 1.28rem;
		background-color: #2A808A;
		border-radius: 0.2rem;
		text-align: center;
		line-height: 1.28rem;
		color: #fff;
		font-size: 0.346rem;
		font-weight: bold;
	}

	#detail .more .author-more {
		width: 5.8rem;
	}

	#detail .more .author-more .link-author {
		margin-top: 0.98rem;
		color: #2B7F8B;
		font-size: 0.426rem;
	}

	#detail .more .author-more .other {
		margin-top: 0.26rem;
	}

	#detail .more .author-more .other-art {
		width: 2.72rem;
		height: 2.72rem;
	}

	#detail .more .author-more :first-child{ 
		margin-right: 0.18rem;
	}

	#detail .more .author-more .other-art img {
		width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.2rem;
    box-shadow: 0 0.1rem 0.1rem #DBDBDB;
	}

	#detail .ad {
		height: 2.32rem;
		background-image: url("https://hiart-1257069300.cos.ap-guangzhou.myqcloud.com/wx/img/ad-link.png");
		background-size: 10rem 2.32rem;
		background-repeat: no-repeat;
	}

  .back {
    height: 2.4rem;
    line-height: 2.4rem;
    text-align: center;
    background-color: #FAFAFA;
    color: #2B7F8B;
  }

  .back span {
    margin-right: 0.12rem;
  }

  .full-img {
    width: 100%;
    height: 100%;
    background-color: #353535;
    position: absolute;
    top: 0;
  }

  .full-img img {
    object-fit: contain;
  }

  /*img{ pointer-events: none; }*/
</style>