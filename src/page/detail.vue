<template>
	<div class="detail">
		<div class="top-bar">
			<i class="iconfont icon-back" @click="back"></i>
			<div class="title">《作品名字》</div>
		</div>
		<div class="detail-wrap">
			<div class="art">
				<div class="date">2018-6-1</div>
				<img src="https://mailimg.teambition.com/logos/cover-demo.jpg">
			</div>
			<div class="info clear">
				<div class="left photo"></div>
				<div class="left name">姓名</div>
				<div class="left age">年龄</div>
				<i class="left iconfont icon-map" ></i>
				<div class="left local">校区</div>
				<div class="right">
					<i class="left iconfont icon-good"></i>
					<div :class="['left', isStar ? 'activeStar' : '']" @click="star">{{startCount}}</div>
					<i class="iconfont icon-share left" ></i>
				</div>
			</div>
		
			<div class="comment-list">
				<div class="comment clear" v-for="item in comments" :key="item.id">
					<div class="photo left"></div>
					<div class="left">
						<div class="name">{{item.name}}</div>
						<div class="content">{{item.content}}</div>
					</div>
					<div class="date right">{{item.date}}</div>
				</div>
				
			</div>
			<div class="send-wrap">
				<input type="text" placeholder="添加评论">
				<div class="send-btn btn">发送</div>
			</div>
			<div class="more">
				<div class="title">
					<span class="left">相似作品</span>
					<i class="iconfont icon-office left" ></i>
			  </div>
				<div class="same-list">
					<div class="art">
						<div class="img-wrap">
							<img src="https://mailimg.teambition.com/logos/cover-demo.jpg">
						</div>
						
					</div>
					<div class="art">
						<div class="img-wrap">
							<img src="https://mailimg.teambition.com/logos/cover-demo.jpg">
						</div>
					</div>
				</div>
			</div>
		
		</div>
	</div>
</template>

<script>

	export default {
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
	.detail {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.detail-wrap {
		overflow: scroll;
		flex: 1;
	}

	.detail .top-bar {
		width: 100%;
		height: 1.4rem;
		line-height: 1.4rem;
		position: relative;
		border-bottom: 0.02rem solid #DCDFE6;
	}

	.detail .top-bar .title {
		font-size: 0.6rem;
		line-height: 1.4rem;
		text-align: center;
	}

	.detail .top-bar .icon-back {
		display: inline-block;
		width: 1rem;
		font-size: 0.9rem;
		position: absolute;
		z-index: 1;
	}

	.detail .art {
		height: 8rem;
		position: relative;
	}

	.detail .art .date {
		color: #000;
		font-weight: bold;
		position: absolute;
		bottom: 0.26rem;
		right: 0.26rem;
	}

	.detail .art img, .detail .more .img-wrap img {
		width: 100%;
    height: 100%;
    object-fit:cover;
	}

	/** 学员信息 **/

	.detail .info {
		margin: 0.26rem;
		height: 1.4rem;
		border-bottom: 0.02rem solid #DCDFE6;
	}

	.detail .info .photo {
		width: 1rem;
		height: 1rem;
		margin-top: 0.15rem;
		margin-right: 0.26rem;
		border-radius: 50%;
		background-color: orange;
	}

	.detail .info .name, .detail .info .local, .detail .info .age {
		text-align: center;
		margin-right: 0.3rem;
		line-height: 1.4rem;
		font-size: 0.4rem;
	}

	.detail .info .icon-map {
		line-height: 1.4rem;
		margin-right: 0.1rem;
		font-size: 0.5rem;
	}

	.detail .right div {
		margin: 0.28rem 0.4rem 0 0;
		height: 0.76rem;
		width: 1.2rem;
		line-height: 0.76rem;
		text-align: center;
		display: inline-block;
		background-color: #B5B5B5;
		color: #F5F5F5;
		border-radius: 0.16rem;
	}

	.detail .icon-good {
		display: block;
		margin-top: 0.28rem;
		margin-right: 0.26rem;
		text-align: center;
		font-size: 0.6rem;
		font-weight: bold;
	}

	.detail .right .activeStar {
		background-color: #E6A23C;
	}

	.detail .icon-share {
		margin-top: 0.28rem;
		font-size: 0.7rem;
	}

	/** 评论 **/

	.detail .comment-list {
		margin: 0.26rem;
	}

	.detail .comment {
		height: 1.4rem;
		margin-bottom: 0.26rem;
	}

	.detail .comment .photo {
		width: 1rem;
		height: 1rem;
		margin-top: 0.2rem;
		margin-right: 0.26rem;
		border-radius: 50%;
		background-color: orange;
	}

	.detail .comment .name {
		margin: 0.2rem 0;
	}

	.detail .comment .date {
		line-height: 1.4rem;
	}

	/** 发送评论 **/

	.detail .send-wrap {
		height: 0.9rem;
		margin: 0.26rem 0.26rem 0.6rem 0.26rem;
		display: flex;
	}

	.detail .send-btn {
		line-height: 0.9rem;
		height: 0.9rem;
		width: 1.4rem;
	}

	.detail input {
		flex: 1;
		margin-right: 0.26rem;
	}

	/** 更多 **/

	.detail .more {
		margin: 0.26rem;
		height: 4.8rem;
	}

	.detail .more .title {
		height: 0.6rem;
		margin-bottom: 0.26rem;
		font-size: 0.43rem;
	}

	.detail .more .iconfont {
		margin-left: 0.26rem ;
		font-size: 0.54rem;
	}

	.detail .more .title div {
		margin-right: 0.26rem;
	}

	.detail .more .same-list {
		height: 3.2rem;
	}

	.detail .more .art {
		width: 50%;
		height: 4rem;
		float: left;
	}

	.detail .more .img-wrap {
		padding: 2%;
    height: 96%;
	}
		
</style>