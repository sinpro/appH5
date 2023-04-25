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
    <div
      class="y-head_content"
      :class="{'y-head_content_shadow': !isNative}"
    >
      <div
        v-if="!isNative"
        class="y-head_topBar"
      >
        <div class="y-head_left">
          <slot name="overwrite-left">
            <div class="default_left">
              <i class="icons-back" />
            </div>
          </slot>
        </div>
        <h1
          v-if="!shouldOverWriteTitle"
          class="y-head_title"
        >
          {{ stitle }}
        </h1>
        <div
          v-if="shouldOverWriteTitle"
          class="y-head_title_area"
        >
          <slot name="overwrite-title">
            {{ stitle }}
          </slot>
        </div>
        <div class="y-head_right">
          <slot name="overwrite-right" />
        </div>
      </div>
      <div class="y-head_other_layout">
        <slot name="other-layout" />
      </div>
    </div>
  </div>
</template>
<script>
	import {initClientHead, setLeftMenu, setRightMenu, setTitle, setBarBottomLineColor} from './utils'
	import props from './utils/props'
	export default {
		name: 'YHead',
		props,
		data(){
			return Object.freeze({
				shouldOverWriteTitle: false,
				isNative: app.device.specialSign,
				stitle: '示例'
			})
		},
		watch: {
			leftMenu(){
				setLeftMenu(this)
			},
			rightMenu(){
				setRightMenu(this)
			},
			title(){
				setTitle(this)
			},
			barBottomLineColor(){
				setBarBottomLineColor(this)
			}
		},
		created(){
			this.isNative && initClientHead(this)
		}
	}
</script>
<style lang="scss">
	@import './scss/index.scss';
</style>
