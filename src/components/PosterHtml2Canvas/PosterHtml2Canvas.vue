<template>
	<div id="html2canvas_poster" class="html2canvas_poster">
		<div class="html2canvas_poster_modal">
			<div class="close_btn" @click="close">关闭</div>
			<div ref="html2canvas_poster_content" class="html2canvas_poster_content">
				<img src="../../assets/img/bg_poster.jpg" class="bg_poster" alt="">
				<img src="../../assets/img/poster_title.png" class="title" alt="">
				<img src="../../assets/img/girl.png" class="girl" alt="">
				<img src="../../assets/img/bg1_poster.png" class="bg1_poster" alt="">
				<img src="../../assets/img/avatar.jpg" class="avatar" alt="">
				<div class="username">我的名字？</div>
			</div>
			<img :src="posterImgData" ref="poster" class="poster" alt="">
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

export default {
	name: 'PosterHtml2Canvas',
	data,
	// 属性
	props: [],
	// 组件
	components: {},
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
.html2canvas_poster{
	position:fixed;
	width:100%;
	height:100%;
	top:0;
	left:0;
	background-color: rgba(0,0,0,.75);
	.html2canvas_poster_modal{
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
.poster{
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
	opacity: 0;
	display:block;
}
.html2canvas_poster_content{
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
	background-color: darkcyan;
	.title{
		width:80%;
		position:absolute;
		top:5%;
		left:50%;
		transform: translateX(-50%);
	}
	.bg_poster{
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;
	}
	.bg1_poster{
		width:100%;
		position:absolute;
		bottom:0;
	}
	.girl{
		position:absolute;
		width:65%;
		right:2%;
		top:25%;
	}
	.avatar{
		position:absolute;
		width:15%;
		top:55%;
		left:10%;
	}
	.username{
		color:white;
		font-size:3vw;
		position:absolute;
		top: 65%;
		left:10%;
	}
}
</style>
