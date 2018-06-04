<template>
	<div id="art-self">
		<div class="top-bar clear">
			<div class="base left">
				<div class="photo left">
					<img src="../../static/boy-pic.jpg">
				</div>
				<div class="text left">
					<div class="name">名字{{pageWidth}}</div>
					<div class="age">12岁</div>
				</div>
			</div>
			<div class="total right">
				<div class="artTotal left">
					<div class="num">40</div>
					<div class="label">作品</div>
				</div>
				<div class="starTotal left">
					<div class="num">500</div>
					<div class="label">当月赞</div>
				</div>
			</div>
			
			
			
		</div>
		<div class="list-warp" @scroll="loadMore($event)" >

			<div class="art-wrap" v-for="(item, index) in list" :key="item.id">
				<div v-if="index===0" class="art" @click="view(item.id)" ref="artRef">
					<img :src="item.src">
					<div class="date">{{item.date}}</div>
				</div>
				<div v-else class="art" @click="view(item.id)" >
					<img :src="item.src">
					<div class="date">{{item.date}}</div>
				</div>
				<div class="info clear">
					<div class="title left">{{item.title}}</div>
					<div class="right">
						<i class="iconfont icon-icon left"></i>
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
			url: '../static/boy-pic.png',
			loadMoreFinish: false,
			list: [{
				id: 1,
				src: "../../static/art2.jpg",
				date: "2018-6-01",
				title: "《认真工作》",
				star: 201
			},{
				id: 2,
				src: "../../static/art1.jpg",
				date: "2018-6-01",
				title: "《认真工作》",
				star: 201
			},{
				id: 3,
				src: "../../static/art2.jpg",
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
								src: "../../static/art1.jpg",
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
	},
	computed: {
		pageWidth() {
			return 1
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
		height: 1.6rem;
		line-height: 1.2rem;
		padding: 0 0.26rem 0.26rem 0.26rem;
		border-bottom: 0.02rem solid #DCDFE6;
		margin-bottom: 0.26rem;
	}

	#art-self .top-bar .photo {
		margin-top: 0.26rem;
		width: 1.4rem;
		height: 1.4rem;
		border-radius: 50%;
		overflow: hidden;
	}

	#art-self .top-bar .text {
		height: 1.4rem;
		margin: 0.3rem 0 0 0.3rem;
	}

	#art-self .top-bar .name, #art-self .top-bar .age {
		height: 0.7rem;
		line-height: 0.7rem;
		font-size: 0.3rem;
		text-align: center;
	}

	#art-self .top-bar .total {
		margin-top: 0.5rem;
	}

	#art-self .top-bar .artTotal {
		margin-right: 0.6rem;
	}

	#art-self .top-bar .num {
		font-weight: bold;
		font-size: 0.4rem;
		color: #000;
	}

	#art-self .top-bar .label {
		font-size: 0.3rem;
	}

	#art-self .top-bar .num, #art-self .top-bar .label {
		height: 0.5rem;
		line-height: 0.5rem;
		text-align: center;
	}

	/** 列表 **/

	#art-self .list-warp {
		flex: 1;
		overflow: scroll;
		padding: 0 0.26rem;
	}

	#art-self .art-wrap {
		margin-bottom: 0.26rem;
	}

	#art-self .art {
		position: relative;
	}

	#art-self .art .date {
		position: absolute;
		bottom: 0.16rem;
		right: 0.26rem;
		font-weight: bold;
		color: #000;
	}

	#art-self .art img {
		width: 100%;
    height: 100%;
    object-fit:cover;
	}

	#art-self .info {
		height: 1.4rem;
		border-bottom: 0.02rem solid #DCDFE6;
	}

	#art-self .info .title {
		line-height: 1.4rem;
		font-size: 0.5rem;
		font-weight: bold;
	}
	

	#art-self .info .icon-icon {
		text-align: center;
		margin-top: 0.34rem;
		font-size: 0.56rem;
		font-weight: bold;
	}

	#art-self .info span {
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

	#art-self .info .icon-share {
		font-size: 0.7rem;
		margin-top: 0.3rem;
	}

	#art-self .list-warp .end {
		text-align: center;
    font-size: 0.3rem;
    height: 0.6rem;
    line-height: 0.6rem;
	}



</style>