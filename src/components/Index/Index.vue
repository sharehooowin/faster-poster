<template>
	<div id="Index-container" class="Index-container">
		<div class="canvas btnItem" @click="to('canvas')">canvas</div>
		<div class="html2canvas btnItem" @click="to('html2canvas')">html2canvas</div>
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
	name: 'Index',
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
.Index-container{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.btnItem{
		width:7rem;
		margin:0.5rem;
		padding:0.5rem 0;
		text-align: center;
		border-radius:20px;
	}
	.canvas{
		background-color: darkcyan;
	}
	.html2canvas{
		background-color: darkgoldenrod;
	}
}
</style>
