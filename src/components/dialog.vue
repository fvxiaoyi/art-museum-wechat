<template>
	<div v-if="visible" >
		<transition name="fade">
			<div class="pop" :style="{height: heightWithRem, width: widthWithRem, 
				top: '4rem', left: '50%', marginLeft: marginLeft}" >
				<slot></slot>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	props: {
		height: {
		type: Number,
		default: 3.47
		},
		width: {
			type: Number,
			default: 4.77
		},
		visible: Boolean
	},
	computed: {
		cHeight() {
			return this.height - 0.53
		},
		cWidth() {
			return this.width - 0.53
		},
		heightWithRem() {
	    return this.cHeight + 'rem'
	  },
	  widthWithRem() {
	    return this.cWidth + 'rem'
	  },
	  marginLeft() {
	  	return (this.cWidth / 2) * -1 + 'rem'
	  }
	}
}
</script>

<style scoped>
.pop {
  background-color: #fff;
  border-radius: 0.1rem;
  position: absolute;
  z-index: 11;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>