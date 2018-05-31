<template>
	<div class="index">
		<div class="top-bar clear">
			<div class="photo left">头像</div>
			<div class="left name">名字</div>
			<div class="left age">12岁</div>
			<div class="right">当月赞: 500</div>
		</div>
		<div class="list-warp">

			<div class="art-wrap" v-for="item in list" :key="item.id" >
				<div class="art">
					<img :src="item.src">
					<div class="date">{{item.date}}</div>
				</div>
				<div class="info clear">
					<div class="base left">
						<div class="title">{{item.title}}</div>
						<div>{{item.local}}</div>
					</div>
					<div class="right">
						<div class="left fav">点赞{{item.star}}</div>
						<div class="left">分享</div>
					</div>
				</div>
			</div>

			<div v-if="list.length>0" class="no-more">没有更多了</div>

		</div>

	</div>
</template>

<script>
export default {
	data() {
		return {
			list: [{
				id: 1,
				src: "https://mailimg.teambition.com/logos/cover-demo.jpg",
				date: "2018-6-01",
				title: "《认真工作》",
				local: "和祥东校区",
				star: 201
			},{
				id: 2,
				src: "https://mailimg.teambition.com/logos/cover-demo.jpg",
				date: "2018-6-01",
				title: "《认真工作》",
				local: "和祥东校区",
				star: 201
			},{
				id: 3,
				src: "https://mailimg.teambition.com/logos/cover-demo.jpg",
				date: "2018-6-01",
				title: "《认真工作》",
				local: "和祥东校区",
				star: 201
			}]
		}
	}
}
</script>

<style scoped>
	.index {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.index .top-bar {
		height: 1.2rem;
		line-height: 1.2rem;
		padding: 0 0.26rem;
		border-bottom: 0.02rem solid #DCDFE6;
		margin-bottom: 0.26rem;
	}

	.index .top-bar .photo, .index .top-bar .name, .index .top-bar .age {
		margin-right: 0.26rem;
	}

	/** 列表 **/

	.index .list-warp {
		flex: 1;
		overflow: scroll;
		padding: 0 0.26rem;
	}

	.index .art-wrap {
		height: 10.2rem;
	}

	.index .art {
		height: 8rem;
		margin-bottom: 0.15rem;
		position: relative;
	}

	.index .art .date {
		position: absolute;
		bottom: 0.16rem;
		right: 0.26rem;
		font-weight: bold;
	}

	.index .art img {
		width: 100%;
    height: 100%;
    object-fit:cover;
	}

	.index .info {
		height: 1.3rem;
		margin-bottom: 0.15rem;
		padding-bottom: 0.2rem;
		border-bottom: 0.02rem solid #DCDFE6;
	}

	.index .info .title {
		margin: 0.2rem 0 0.2rem 0;
	}

	.index .info .right {
		line-height: 1.5rem;
	}

	.index .info .fav {
		margin-right: 0.15rem;
	}

	.index .list-warp .no-more {
		text-align: center;
		color: #909399;
		margin-bottom: 0.26rem;
	}

</style>