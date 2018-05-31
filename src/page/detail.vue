<template>
	<div class="detail">
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
				<div class="right btn">
					<div class="left">点赞</div>
					<div class="left">分享</div>
				</div>
			</div>
			<div class="star-wrap">
				<div class="star-list">
					<div class="star"></div>
					<div class="star"></div>
					<div class="star"></div>
					<div class="star"></div>
					<div class="star"></div>
					<div class="star"></div>
					<div class="star"></div>
					<div class="star"></div>
					<div class="star"></div>
					<div class="star"></div>
					<div class="star"></div>
					<div class="star"></div>
					<div class="star"></div>
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
				<input class="weui-input" type="text" placeholder="添加评论">
				<a href="javascript:;" class="send-btn">发送</a>
			</div>
			<div class="more">
				<div class="title">更多作品</div>
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
  	}
  }

</script>

<style scoped>
	.detail {
		height: 100%;
		padding: 0.26rem;
		overflow: scroll;
	}

	.detail .top-bar {
		height: 0.6rem;
		line-height: 0.6rem;
		margin-bottom: 0.26rem;
	}

	.detail .art {
		height: 9rem;
		margin-bottom: 0.26rem;
	}

	.detail .art img {
		width: 100%;
    height: 100%;
    object-fit:cover;
	}

	/** 学员信息 **/

	.detail .info {
		height: 2rem;
		margin-bottom: 0.4rem;
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

	.detail .btn {
		line-height: 2rem;
	}

	/** 点赞 **/

	.detail .star-wrap {
		min-height: 1rem;
		padding-bottom: 0.16rem;
		margin-bottom: 0.6rem;
		border-bottom: 0.02rem solid #DCDFE6;
		display: flex;
	}

	.detail .star-btn {
		margin-right: 0.26rem;
	}

	.detail .star-list {
		flex: 1;
		display: flex;
		flex-flow: row wrap;
	}

	.detail .star {
		width: 0.6rem;
		height: 0.6rem;
		background-color: orange;
		border-radius: 50%;
		margin-right: 0.16rem;
		margin-bottom: 0.16rem;
	}

	.detail .comment-list {
		margin-bottom: 0.4rem;

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
		margin-bottom: 0.26rem;
		display: flex;
	}

	.detail .send-btn {
		height: 0.8rem;
		width: 1.4rem;
		border-radius: 0.16rem;
		text-align: center;
		line-height: 0.8rem;
		color: #fff;
		display: block;
		background-color: orange;
	}

	.detail .weui-input {
		flex: 1;
		margin-right: 0.26rem;
		height: 0.8rem;
		border: 0.02rem solid #DCDFE6;
		border-radius: 0.16rem;
	}

	/** 更多 **/

	.detail .more {
		height: 4rem;
		background-color: orange;
	}

</style>