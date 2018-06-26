<template>
	<div>
		<div id="detail">
			<div class="art">
				<img :src="`${model.thumbnailUrl}?imageView2/2/w/768`">
			</div>
			<div class="star">
				<div class="icon-like"></div>
				<span class="names">中文名,ABC,ABC,中文名中文名,ABC,中文名,ABC</span>
				<div class="icon-more" v-if="model.totalStar"></div>
				<span class="total">{{model.totalStar}}人喜欢此作品</span>
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
          <span>1083浏览</span>
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
          <div class="photo left">
            <img src="../../static/img/icon-student.png" />
          </div>
          <div class="author left">
            <div class="name">{{model.studentName}}</div>
            <div>共28件作品</div>
          </div>
          <div class="fav-total left">488个喜欢</div>
          <div class="link-me-btn right" @click="linkMe">作品主页</div>
        </div>
      </div>
      <div class="comment-input-wrap">
        <textarea class="content" placeholder="写下一句鼓励宝宝的话, 支持TA快乐成长 :) "></textarea>
        <div class="submit-btn">确认</div>
      </div>

			<div class="comment-list">
				<div class="comment">
          <div class="author clear">
            <div class="photo left">
              <img src="../../static/art1.jpg">
            </div>
            <div class="left">
              <div class="name">游客001</div>
              <div class="time">一个月前</div>
            </div>
          </div>  
          <div class="content">这是评论。。</div>     
        </div>
			</div>

			<div class="more clear">
				<div class="link-div left">
					<div class="link-type">
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
						<span>徐晓辉的其他作品</span>
						<span class="right">>></span>
					</div>
					<div class="other">
						<div class="other-art left">
							<img src="../../static/art1.jpg">
						</div>
						<div class="other-art left">
							<img src="../../static/art1.jpg">
						</div>
					</div>
				</div>
			</div>
			<div class="ad"></div>
		</div>
	</div>
</template>

<script>
	export default {
		created() {
      if(this.$route.params.id) {
        let me = this
        this.post('/wx/art/get', { id: this.$route.params.id}, (res) => me.model = res.data)

      }
    },
  	data () {
  		return {
  			isStar: false,
  			startCount: 500,
        model: {},
  			comments: [{
  				id: 1,
  				photo: '',
  				name: '张三',
  				date: '2018-6-1',
  				content: '这是一条留言'
  			}]
  		}
  	},
  	methods: {
  		back() {
  			this.$router.go(-1)
  		},
      linkHome() {
        this.$router.push('/')
      },
      linkMe() {
        this.$router.push('/me')
      },
  		star() {
  			this.isStar = !this.isStar
  			if(this.isStar) {
  				this.startCount ++
  			} else {
  				this.startCount --
  			}
  		},
      handleShare() {
        this.wxShare(`title`, 'descXXX', window.location.href)
      }
  	},
    computed: {
      year() {
        return new Date(this.model.createTime).getFullYear()
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

	#detail .star {
		padding-left: 0.32rem;
		min-height: 1.2rem;
		color: #FD7D7C;
    display: flex;
    align-items: center;
    border-bottom: 0.026rem solid #DCDFE6;
	}

  #detail .star .icon-like, #detail .star .icon-more {
    width: 0.8rem;
    height: 0.8rem;
    background-size: 0.8rem 0.8rem;
    background-repeat: no-repeat;
  }

  #detail .star .icon-like {
    background-image: url("../../static/img/icon-more-like.png");
  }

  #detail .star .icon-more {
    background-image: url("../../static/img/icon-more.png");
  }

	#detail .star .names {
		flex: 1;
		color: #353535;
		margin: 0 0.26rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	#detail .star .total {
		margin-right: 0.48rem;
	}

	#detail .star span {
		font-size: 0.4rem;
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
  }

  #detail .title-wrap .icon-share, #detail .title-wrap .icon-no-fav, #detail .title-wrap .icon-fav {
    height: 1.066rem;
    width: 1.066rem;
    background-size:  1.066rem 1.066rem;
    background-repeat: no-repeat;
    margin-top: 0.117rem;
  }

  #detail .title-wrap .icon-share {
    background-image: url("../../static/img/icon_share.png");
    margin-right: 0.2735rem;
  }

  #detail .title-wrap .icon-no-fav {
    background-image: url("../../static/img/icon-like1.png");
    margin-left: 0.2735rem;
  }

  #detail .title-wrap .icon-fav {
    background-image: url("../../static/img/icon-like2.png");
    margin-left: 0.2735rem;
  }

  #detail .title-wrap .btn-wrap {
    margin-top: 0.26rem;
    height: 1.3rem;
    width: 3.226rem;
    border-radius: 0.2rem;
    background-image: url("../../static/img/board-like.png");
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
    background-image: url("../../static/img/icon-more-like.png");
  }

  #detail .author-wrap .icon-count {
    background-image: url("../../static/img/icon-more-like.png");
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
    padding-top: 0.2666rem;
    background-color: #F2F2F2;
    color: #353535;
	}

  #detail .comment-list .comment {
    height: 2.0537rem;
    background-color: #fff;
    border-top: 0.026rem solid #DCDFE6;
    border-bottom: 0.026rem solid #DCDFE6;
    padding: 0.373rem 0.666rem 0.5333rem 0.666rem;
  }

  #detail .comment-list .comment .name {
    font-size: 0.346rem;
    font-weight: bold;
    margin: 0.16rem 0 0.14rem 0;
  }

  #detail .comment-list .comment .time {
    font-size: 0.266rem;
  }

  #detail .comment-list .comment .photo {
    height: 1.066rem;
    width: 1.066rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 0.19rem;
  }

  #detail .comment-list .comment .content {
    margin-top: 0.5333rem;
    font-size: 0.32rem;
  }

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
		background-image: url("../../static/img/icon-arttopic.png");
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
		background-image: url("../../static/img/ad-link.png");
		background-size: 10rem 2.32rem;
		background-repeat: no-repeat;
	}

</style>