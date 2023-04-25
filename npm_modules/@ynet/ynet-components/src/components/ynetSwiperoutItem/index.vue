<template>
	<div class="ynet-swiperout_item" @touchstart="start" @mousedown="start" @touchmove="move" @mousemove="move" @touchend="end" @mouseup="end" @touchcancel="end">
		<div class="ynet-swiperout_button_box ynet-swipeout_button_box_left" v-show="distX >= 0" ref="leftMenu">
			<slot name="left-menu"></slot>
		</div>
		<div class="ynet-swiperout_button_box ynet-swipeout_button_box_right" :style="rightButtonBoxStyle" v-show="distX <= 0" ref="rightMenu">
			<slot name="right-menu"></slot>
		</div>
		<div class="ynet-swiperout_content" :style="styles" @mousedown="onContentClick" @touchstart="onContentClick" ref="content">
			<slot name="content"></slot>
		</div>
	</div>
</template>
<script>
import props from './props'
export default {
	name: 'ynet-swiperout-item', props,
	mounted(){ this.$nextTick(this.render) },
	methods: {
		render(){
			this.target = this.$refs.content
			if(this.$slots['left-menu']) {
				this.hasLeftMenu = true
				this.caculateMenuWidth('left')
			}
			if(this.$slots['right-menu']) {
				this.hasRightMenu = true
				this.caculateMenuWidth('right')
			}
		},
		caculateMenuWidth(direction) { this[`${direction}MenuWidth`] = this.$refs[`${direction}Menu`].clientWidth },
		onContentClick(){
			if(this.styles.transform.indexOf('(0px, 0, 0)') === -1) { this._setClose(200) }
		},
		onItemClick () {
			if(this.autoCloseOnButtonClick){ this._setClose() }
		},
		start(ev) {
			if(this.disabled || this.isOpen || ev.target.nodeName.toLowerCase() === 'button'){ return }
		 	if(this.$parent.$options._componentTag === 'ynet-swiperout'){
				const openItems = this.$parent.$children.filter(item => item.$data.styles.transform.indexOf('(0px, 0, 0)') === -1)
				if(openItems.length > 0){
					openItems.forEach(item => item.setOffset(0, true))
					return ev.preventDefault()
				}
			}
			const touch = ev.touches ? ev.touches[0] : ev
			this.pageX = touch.pageX
			this.pageY = touch.pageY
		},
		move(ev){
			if(this.disabled){ return }
			if(ev.target.nodeName.toLowerCase() === 'button' || this.pageX === undefined){ return ev.preventDefault() }
			const touch = ev.touches ? ev.touches[0] : ev
			this.distX = touch.pageX - this.pageX
			this.distY = touch.pageY - this.pageY
			if(!this.direction){ this.direction = this.distX > 0 ? 'left' : 'right' }
			if((this.direction === 'right' && this.distX > 0 && this.hasRightMenu) || (this.direction === 'left' && this.distX < 0 && this.hasLeftMenu)){
				this.valid = true
				ev.preventDefault()
			}
			if(this.valid === undefined){
				if((this.distX > 0 && this.hasLeftMenu === false) || (this.distX < 0 && this.hasRightMenu === false)){
					this.valid = false
				}else if(Math.abs(this.distX) > this.sensitivity || Math.abs(this.distY) > this.sensitivity){
					this.valid = Math.abs(this.distX) > Math.abs(this.distY)
				}else{
					ev.preventDefault()
				}
			}
			if(this.valid === true){
				if(Math.abs(this.distX) <= this.menuWidth){
					this.setOffset(this.distX, false)
				}else{
					const extra = (Math.abs(this.distX) - this.menuWidth) * 0.5
					const offset = (this.menuWidth + extra) * (this.distX < 0 ? -1 : 1)
					this.setOffset(offset, false)
				}
				ev.preventDefault()
			}
		},
		end(ev){
			if(this.disabled || ev.target.nodeName.toLowerCase() === 'button'){ return }
			if(this.valid === true){
				if(this.distX < 0 && this.direction === 'right') {
					const threshold = this.threshold <= 1 ? this.rightMenuWidth * this.threshold : this.threshold
					if (this.distX < -threshold) {
						this.setOffset(-this.rightMenuWidth, true)
						this.$emit('on-open')
						this.isOpen = true
					}else{
						this._setClose()
					}
				}else if(this.distX > 0 && this.direction === 'left') {
					const threshold = this.threshold <= 1 ? this.leftMenuWidth * this.threshold : this.threshold
					if (this.distX > threshold) {
						this.setOffset(this.leftMenuWidth, true)
						this.$emit('on-open')
						this.isOpen = true
					}else{
						this._setClose()
					}
				}
			}
			this.pageX = this.pageY = this.valid = undefined
			this.direction = ''
		},
		setOffset(x, animated = false, force) {
			this.isAnimated = animated
			if(this.disabled && !force){ return }
			if((this.direction === 'right' && x > 0) || (this.direction === 'left' && x < 0)) { x = 0 }
			if(x === 0) {
			setTimeout(() => this.isOpen = false, 300)
			}
			if(x < 0 && Math.abs(x) === this.rightMenuWidth) {
				this.distX = -this.rightMenuWidth
			} else if (x > 0 && Math.abs(x) === this.leftMenuWidth) {
				this.distX = this.leftMenuWidth
			}
			if (animated && this.target) {
				this.target.classList.add('ynet-swiperout_content_animated')
				let cb = (function (self, target) {
				  return function () {
					target.classList.remove('ynet-swiperout_content_animated')
					self.isAnimated = false
					target.removeEventListener('webkitTransitionEnd', cb)
					target.removeEventListener('transitionend', cb)
				  }
				})(this, this.target)
				this.target.addEventListener('webkitTransitionEnd', cb)
				this.target.addEventListener('transitionend', cb)
			}
			this.styles.transform = 'translate3d(' + x + 'px, 0, 0)'
		},
		_setClose(delay = 0){
			this.setOffset(0, true)
			this.$emit('on-close')
			!delay ? (this.isOpen = false) : setTimeout(() => this.isOpen = false, delay)
			this.distX = 0
		}
	},
	computed: {
		menuWidth(){
			if(!this.hasLeftMenu && this.hasRightMenu){ return this.rightMenuWidth }
			if(this.hasLeftMenu && !this.hasRightMenu){ return this.leftMenuWidth }
			if(this.hasLeftMenu && this.hasRightMenu){ return this.distX < 0 ? this.rightMenuWidth : this.leftMenuWidth }
		},

		rightButtonBoxStyle () {
			let offset = this.styles.transform.indexOf('(0px, 0, 0)') === -1 ? this.rightMenuWidth - Math.abs(this.distX) : this.rightMenuWidth
			if(offset < 0){ offset = 0 }
			return this.isAnimated ? {
				transform: `translate3d(${offset}px, 0, 0)`, transition: 'transform 0.2s'
			} : { transform: `translate3d(${offset}px, 0, 0)` }
		}
	},
	data(){
		return {
			pageX: undefined,
			pageY: undefined,
			distX: 0,
			distY: 0,
			hasLeftMenu: false,
			hasRightMenu: false,
			animated: false,
			isAnimated: false,
			isOpen: false,
			styles: { transform: 'translate3d(0px, 0, 0)' },
			direction: '',
			leftMenuWidth: 0,
			rightMenuWidth: 0
		}
	},
	watch:{
		disabled (newVal, oldVal){
			if (newVal === true && !oldVal) {
				this.setOffset(0, true, true)
			}
		}
	}
}
</script>
<style lang="scss">
	.ynet-swiperout_button_box{
			position: absolute;
			height: 100%;
			font-size: 0;
			text-align: right;
			& > div{
				height: 100%;
			}
		}
	.ynet-swiperout_item{
		position: relative;

		&:after{
			content: '';
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 1px;
			background-color: #c7c7c7;
			transform: scaleY(.5);
		}
		.ynet-swipeout_button_box_right{
			top: 0;
			right: 0;
		}
		.ynet-swipeout_button_box_left{
			top: 0;
			left: 0;
		}

		.ynet-swiperout_content{
			position: relative;
			background: #fff;
			&.ynet-swiperout_content_animated{
				transition: transform 0.2s;
			}
		}
	}
</style>
