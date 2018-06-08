<template>
	<div>
		<div id="detail">
			<div class="art">
				<img src="../../static/art1.jpg">
			</div>
			<div class="star">
				<div class="icon-wrap">
					<img src="../../static/img/icon-more-like.png" />
				</div>
				<span class="names">中文名,ABC,ABC,中文名中文名,ABC,中文名,ABC</span>
				<div class="icon-wrap more">
					<img src="../../static/img/icon-more.png" />
				</div>
				<span class="total">32人喜欢此作品</span>
			</div>
			<div class="art-info">
				<div class="top clear">
					<div class="title left">壁画</div>
					<div class="btn-wrap right">
						<div class="icon left">
							<img src="../../static/img/icon-like1.png" />
						</div>
						<div class="icon right">
							<img src="../../static/img/icon_share.png" />
						</div>
					</div>
				</div>
				<div class="middle">
					<div class="author">
						<span>徐晓辉</span>
						<span>|</span>
						<span>20岁</span>
					</div>
					<div class="local">
						
					</div>
					<div class="count">
						
					</div>
				</div>
			</div>

			<div class="comment-list">
				
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
					<div class="link-home">回艺术馆首页</div>
				</div>
				<div class="author-more right">
					<div class="link-author">
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
      console.log('detail created')
    },
  	data () {
  		return {
  			isStar: false,
  			startCount: 500,
  			comments: [{
  				id: 1,
  				photo: '',
  				name: '张三',
  				date: '2018-6-1',
  				content: '这是一条留言'
  			},{
  				id: 2,
  				photo: '',
  				name: '张三',
  				date: '2018-6-1',
  				content: '这是一条留言'
  			},{
  				id: 3,
  				photo: '',
  				name: '张三',
  				date: '2018-6-1',
  				content: '这是一条留言'
  			},{
  				id: 4,
  				photo: '',
  				name: '张三',
  				date: '2018-6-1',
  				content: '这是一条留言'
  			}]
  		}
  	},
  	methods: {
  		back() {
  			this.$router.go(-1);
  		},
  		star() {
  			this.isStar = !this.isStar
  			if(this.isStar) {
  				this.startCount ++
  			} else {
  				this.startCount --
  			}
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

	#detail .star .icon-wrap {
		width: 1rem;
		height: 1rem;
	}

	#detail .star .icon-wrap .more {
		margin-right: 0.26rem;
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
		
	/** 作品信息 **/

	#detail .art-info {
		background-color: #FAFAFA;
		padding: 0 0.32rem;
	}

	#detail .art-info .top {
		height: 1.6rem;
	}

	#detail .art-info .title {
		margin-top: 0.5rem;
		font-size: 0.64rem;
		font-weight: bold;
		color: #353535;
	}

	#detail .art-info .btn-wrap {
		margin-top: 0.26rem;
		height: 1.3rem;
		width: 3.226rem;
		border-radius: 0.2rem;
		background-image: url("../../static/img/board-like.png");
		background-size: 3.226rem 1.3rem ;
		overflow: hidden;
	}

	#detail .art-info .btn-wrap .icon {
		margin-top: 0.05rem;
		height: 1.2rem;
		width: 1.6rem;
	}

	#detail .art-info .btn-wrap .icon img {
		width: 100%;
    height: 100%;
    object-fit: contain;
	}

	#comment-list {
		border-top: 0.026rem solid #DCDFE6;
		border-bottom: 0.026rem solid #DCDFE6;
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
    box-shadow: 0 0.1rem 0.1rem #888888;
	}

	#detail .ad {
		height: 2.32rem;
		background-image: url("../../static/img/ad-link.png");
		background-size: 10rem 2.32rem;
		background-repeat: no-repeat;
	}

</style>