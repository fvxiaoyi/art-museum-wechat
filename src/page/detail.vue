<template>
	<div class="detail">
		<div class="top-bar"><span @click="back">返回</span></div>
		<div class="detail-wrap">
			<div class="art">
				<img src="https://mailimg.teambition.com/logos/cover-demo.jpg">
			</div>
			<div class="info clear">
				<div class="photo left"></div>
				<div class="base left">
					<div>
						<div class="left title">作品名字</div>
						<div class="left date"> 日期 </div>
					</div>
					<div>
						<div class="left name">姓名</div>
						<div class="left age">年龄</div>
						<div class="left local">校区</div>
					</div>
				</div>
				<div class="right btn-wrap">
					<div class="left">点赞201</div>
					<div class="left">分享</div>
				</div>
			</div>
		
			<div class="comment-list">
				<div class="comment clear" v-for="item in comments" :key="item.id">
					<div class="photo left"></div>
					<div class="left content">
						<div class="name">{{item.name}}</div>
						<div>{{item.content}}</div>
					</div>
					<div class="date right">{{item.date}}</div>
				</div>
				
			</div>
			<div class="send-wrap">
				<input type="text" placeholder="添加评论">
				<a href="javascript:;" class="send-btn btn">发送</a>
			</div>
			<div class="more">
				<div class="title">相似作品</div>
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
  			this.$router.push('/');
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
		height: 0.6rem;
		line-height: 0.6rem;
		margin-bottom: 0.26rem;
	}

	.detail .art {
		height: 10rem;
		margin-bottom: 0.26rem;
	}

	.detail .art img, .detail .more .img-wrap img {
		width: 100%;
    height: 100%;
    object-fit:cover;
	}

	/** 学员信息 **/

	.detail .info {
		margin: 0.26rem;
		height: 2rem;
		border-bottom: 0.02rem solid #DCDFE6;
	}

	.detail .info .photo {
		width: 1rem;
		height: 1rem;
		margin-top: 0.5rem;
		border-radius: 50%;
		background-color: orange;
	}

	.detail .info .base {
		margin-top: 0.26rem;
	}

	.detail .info .title, .detail .info .name, .detail .info .date, .detail .info .local, .detail .info .age {
		font-size: 0.5rem;
	}

	.detail .info .title {
		font-weight: bold;
	}

	.detail .info .left {
		margin-right: 0.26rem;
		text-align: center;
	}

	.detail .btn-wrap {
		line-height: 2rem;
	}

	/** 评论 **/

	.detail .comment-list {
		margin: 0.6rem 0.26rem 0.26rem 0.26rem;
	}

	.detail .comment {
		margin-bottom: 0.6rem;
	}

	.detail .comment .photo {
		width: 1rem;
		height: 1rem;
		margin-right: 0.26rem;
		border-radius: 50%;
		background-color: orange;
	}

	/** 发送评论 **/

	.detail .send-wrap {
		height: 0.9rem;
		margin: 0.26rem 0.26rem 0.6rem 0.26rem;
		display: flex;
	}

	.detail .send-btn {
		line-height: 0.8rem;
		height: 0.8rem;
		width: 1.4rem;
	}

	.detail input {
		flex: 1;
		margin-right: 0.26rem;
	}

	/** 更多 **/

	.detail .more {
		margin: 0.26rem;
		height: 4rem;
	}

	.detail .more .title {
		height: 0.54rem;
		margin-bottom: 0.26rem;
	}

	.detail .more .same-list {
		height: 3.2rem;
	}

	.detail .more .art {
		width: 50%;
		height: 3.2rem;
		float: left;
	}

	.detail .more .img-wrap {
		padding: 2%;
    height: 96%;
	}
		
</style>