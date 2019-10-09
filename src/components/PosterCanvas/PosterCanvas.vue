<template>
	<div id="canvas_poster" class="canvas_poster">
		<div class="canvas_poster_modal">
			<div class="close_btn" @click="close">关闭</div>
			<Poster :designWidth="640" :degignHeight="1040" :imgList="imgList" :textList="textList"></Poster>
			<div class="tips">-长按保存海报-</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import data from './data'
import methods from './module'
// import watch from './watch'
// import computed from './computed'
// import filters from './filters'
// import {  } from '@/common'
import Poster from '../../common/Poster/Poster.vue';

export default {
	name: 'PosterCanvas',
	data,
	// 属性
	props: [],
	// 组件
	components: {
        Poster
	},
	mounted(){
		this.init()
	},
	// 函数
	methods,
	// 监听
	watch: {},
	// 计算
	computed: {},
	// 过滤
	filters: {},
}
</script>

<style type="text/scss" lang="scss">
.canvas_poster{
	position:fixed;
	width:100%;
	height:100%;
	top:0;
	left:0;
	background-color: rgba(0,0,0,.75);
	.canvas_poster_modal{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 7.73rem;
		height: 12.56rem;
		-webkit-transition: all 1s;
		transition: all 1s;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		border-radius: 10px;
		cursor: pointer;
		-webkit-tap-highlight-color: rgba(255,255,255,0);
	}
	.close_btn{
		color:white;
		font-size:0.5rem;
		position:absolute;
		right:0;
		top:-1.2rem;
		background-color:black;
		padding:0.1rem 0.2rem;
	}
	.tips{
		width: 100%;
		position: absolute;
		bottom: -1rem;
		color:white;
		font-size:0.35rem;
		text-align: center;
		margin-top:0.5rem;
	}
}
</style>
