<template>
	<div id="dialog" >
		<div v-if="visible" class="pop" :style="{height: heightWithRem, width: widthWithRem, 
			top: '50%', left: '50%', marginTop: marginTop, marginLeft: marginLeft}" >
			<slot></slot>
		</div>
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
		  marginTop() {
		  	return (this.cHeight / 1) * -1 + 'rem'
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
	  z-index: 3;
	}

	.tbar {
		height: 1rem;
		border-bottom: 0.02rem solid #E4E4E4;
	}
</style>