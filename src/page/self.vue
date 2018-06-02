<template>
	<div class="self">
		<div class="top-bar clear">
			<div class="photo left">头像</div>
			<div class="left name">名字</div>
			<div class="left age">12岁</div>
			<div class="right">当月赞: 500</div>
		</div>
		<div class="list-warp" @scroll="loadMore($event)">

			<div class="art-wrap" v-for="item in list" :key="item.id" >
				<div class="art" @click="view(item.id)">
					<img :src="item.src">
					<div class="date">{{item.date}}</div>
				</div>
				<div class="info clear">
					<div class="title left">{{item.title}}</div>
					<div class="right">
						<i class="iconfont icon-good left"></i>
						<span class="left">{{item.star}}</span>
						<i class="iconfont icon-share left"></i>
					</div>
				</div>
			</div>

			<div v-if="list.length>0" class="end">没有更多了</div>

		</div>

	</div>
</template>

<script>
export default {
	data() {
		return {
			loadMoreFinish: false,
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
		loadMore(e) {
      if(!this.loadMoreFinish) {
        let totalHeight = e.target.scrollHeight,
          warpHeight = e.target.clientHeight,
          scrollTop = e.target.scrollTop
        if(totalHeight - (warpHeight + scrollTop) <= 1) {
        	
          if(this.list.length < 5) {
            for(let i=4;i<6;i++) {
              this.list.push({
								id: i,
								src: "https://mailimg.teambition.com/logos/cover-demo.jpg",
								date: "2018-6-01",
								title: "《认真工作》",
								star: 201
							})
            }
          } else {
            this.loadMoreFinish = true
          }
        }
      }
      
    },
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
		height: 9.8rem;
	}

	.self .art {
		height: 8rem;
		position: relative;
	}

	.self .art .date {
		position: absolute;
		bottom: 0.16rem;
		right: 0.26rem;
		font-weight: bold;
		color: #000;
	}

	.self .art img {
		width: 100%;
    height: 100%;
    object-fit:cover;
	}

	.self .info {
		height: 1.4rem;
		border-bottom: 0.02rem solid #DCDFE6;
	}

	.self .info .title {
		line-height: 1.4rem;
		font-size: 0.5rem;
		font-weight: bold;
	}
	

	.self .info .icon-good {
		text-align: center;
		margin-top: 0.34rem;
		font-size: 0.56rem;
		font-weight: bold;
	}

	.self .info span {
		margin: 0.28rem 0.4rem 0 0.26rem;
		height: 0.76rem;
		width: 1.2rem;
		line-height: 0.76rem;
		text-align: center;
		display: inline-block;
		background-color: #B5B5B5;
		color: #F5F5F5;
		border-radius: 0.16rem;
	}

	.self .info .icon-share {
		font-size: 0.7rem;
		margin-top: 0.3rem;
	}

	.self .list-warp .end {
		text-align: center;
    font-size: 0.3rem;
    height: 0.6rem;
    line-height: 0.6rem;
	}



</style>