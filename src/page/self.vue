<template>
	<div class="self">
		<div class="top-bar clear">
			<div class="photo left">头像</div>
			<div class="left name">名字</div>
			<div class="left age">12岁</div>
			<div class="right">当月赞: 500</div>
		</div>
		<div class="list-warp">

			<div class="art-wrap" v-for="item in list" :key="item.id" >
				<div class="art" @click="view(item.id)">
					<img :src="item.src">
					<div class="date">{{item.date}}</div>
				</div>
				<div class="info clear">
					<div class="title left">{{item.title}}</div>
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
				star: 201
			},{
				id: 2,
				src: "https://mailimg.teambition.com/logos/cover-demo.jpg",
				date: "2018-6-01",
				title: "《认真工作》",
				star: 201
			},{
				id: 3,
				src: "https://mailimg.teambition.com/logos/cover-demo.jpg",
				date: "2018-6-01",
				title: "《认真工作》",
				star: 201
			}]
		}
	},
	methods: {
		view(id) {
      this.$router.push(`/art/${id}`)
    }
	}
}
</script>

<style scoped>
	.self {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.self .top-bar {
		height: 1.2rem;
		line-height: 1.2rem;
		padding: 0 0.26rem;
		border-bottom: 0.02rem solid #DCDFE6;
		margin-bottom: 0.26rem;
	}

	.self .top-bar .photo, .self .top-bar .name, .self .top-bar .age {
		margin-right: 0.26rem;
	}

	/** 列表 **/

	.self .list-warp {
		flex: 1;
		overflow: scroll;
		padding: 0 0.26rem;
	}

	.self .art-wrap {
		height: 10.2rem;
	}

	.self .art {
		height: 8rem;
		margin-bottom: 0.15rem;
		position: relative;
	}

	.self .art .date {
		position: absolute;
		bottom: 0.16rem;
		right: 0.26rem;
		font-weight: bold;
	}

	.self .art img {
		width: 100%;
    height: 100%;
    object-fit:cover;
	}

	.self .info {
		line-height: 1.5rem;
		height: 1.3rem;
		margin-bottom: 0.15rem;
		padding-bottom: 0.2rem;
		border-bottom: 0.02rem solid #DCDFE6;
	}

	.self .info .fav {
		margin-right: 0.15rem;
	}

	.self .list-warp .no-more {
		text-align: center;
		color: #909399;
		margin-bottom: 0.26rem;
	}

</style>