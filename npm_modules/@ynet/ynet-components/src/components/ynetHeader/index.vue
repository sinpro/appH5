/**
 * Y表示必填,N表示非必填
 * @desc - 头部组件,
 * @props {preventBack: Boolean} - N 是需要重置返回按钮的默认行为，非客户内参数无效
 * @props {showLeftMenu: Boolean} - N 是否需要显示左边返回按钮
 * @props {leftMenu: Array} - N 设置左菜单，参数详情请查看props.js
 * @props {rightMenu: Array} - N 设置右菜单，参数详情请查看props.js
 * @event {leftHandler: Function} - N 左侧菜单的点击回调函数，参数为 index 对应该每个icon的索引值
 * @event {rightHandler: Function} - N 右侧菜单的点击回调函数，参数为 index 对应该每个icon的索引值
 * @example 
 *     <m-header>
 *       <div slot="overwrite-left"></div>
 *       <div slot="overwrite-title">title</div>
 *       <div slot="overwrite-right"></div>
 *       <div slot="other-layout"></div>
 *     </m-header>
 */



<template>
	<div class="y-head">
		<div class="y-head_content" :class="{'y-head_content_shadow': !isNative}">
			<div class="y-head_topBar" v-if="!isNative">
				<div class="y-head_left">
					<slot name="overwrite-left">
						<div class="default_left">
							<i class="icons-back"></i>
						</div>
					</slot>
				</div>
				<h1 class="y-head_title" v-if="!shouldOverWriteTitle">{{stitle}}</h1>
				<div class="y-head_title_area" v-if="shouldOverWriteTitle">
					<slot name="overwrite-title">{{stitle}}</slot>
				</div>
				<div class="y-head_right">
					<slot name="overwrite-right"></slot>
				</div>
			</div>
			<div class="y-head_other_layout">
				<slot name="other-layout"></slot>
			</div>
		</div>
	</div>
</template>
<script>
	import { initClientHead } from './utils'
	import props from './props'
	export default {
		name: 'y-head',
		props,
		data(){
			return Object.freeze({
				shouldOverWriteTitle: false,
				isNative: app.device.specialSign,
				stitle: '示例'
			})
		},
		created(){
			app.api.showLeftMenu(false)
			this.isNative && initClientHead.call(this)
		},
		methods: {
			setLeftMenu(options){
				app.api.setLeftMenu({
					menus: options,
					overrideClick: !this.preventBack
				}, res => {
					this.$emit('leftHandler', res.index)
				})
			},
			setRightMenu(options){
				app.api.setRightMenu({
					menus: options
				}, res => {
					this.$emit('rightHandler', res.index)
				})
			},
			setTitle(title){
				app.api.setMiddleTitle({title})
			},
			setBarBottomLineColor(color){
				app.api.setBarBottomLineColor({
					color
				})
			},
			showLeftMenu(options){
				app.api.showLeftMenu(options)
			}
		}
	}
</script>
<style lang="scss">
	
.y-head{
	width: 100%;
	z-index: 500;

	.y-head_content{
		width: 100%;
		background: #fff;
		
	}

	.y-head_content_shadow{
		box-shadow: 0 0.02rem 0.01rem rgba(0, 0, 0, 0.05);
	}
	
	.y-head_topBar{
		width: 100%;
		height: 0.88rem;
		box-sizing: border-box;
		position: relative;
	}

	.y-head_title{
		display: block;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.36rem;
		margin: 0 1.76rem;
		color: #222;
	}


	.y-head_title_area{
		width: 100%;
		height: 100%;
		position:relative;
	}

	.y-head_other_layout{
		position:relative
	}

	.y-head_left{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		.default_left i{
			display: block;
			width: 0.88rem;
			height: 0.88rem;
			background: url(./assets/icon_arrow.png) no-repeat center / 24%;
		}
	}
}
</style>