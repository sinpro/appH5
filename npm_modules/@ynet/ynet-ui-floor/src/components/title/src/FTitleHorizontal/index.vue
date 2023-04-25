<!--
    标题组件：
        属性列表
            {String}  titleContent       标题内容
            {String}  textContent        文本内容
            {String}  hasLeftImage       是否有左侧图标
            {String}  hasRightImage      是否有右侧图标
            {String}  leftImageUrl       左侧图标链接
            {String}  rightImageUrl      右侧图标链接
            {String}  titleSize	         标题大小
            {String}  titleBold          标题粗细
            {Array}   titleColor	     标题颜色
            {String}  textAlignment      文本位置
            {String}  textSize           文本大小
            {String}  textBold           文本粗细
            {String}  textColor          文本颜色
            {String}  bottomLine         底部分割线
        事件列表
            {event}   action
-->
<template>
    <div class="tfloor_title_horizontal" :style="tilteStyle">
        <img :src="titleTextInfo.leftImageUrl" class="tfloor_title_horizontal_img" v-if="titleTextInfo.showLeftImg" />
        <div class="tfloor_title_horizontal_text"><span :style="titleStyleInfo">{{titleTextInfo.titleContent}}</span><span :style="textStyleInfo">{{titleTextInfo.textContent}}</span></div>
        <img :src="titleTextInfo.rightImageUrl" class="tfloor_title_horizontal_img" @click="linkTo" v-if="titleTextInfo.showRightImg" />
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'

export default {

    name: 'FTitleHorizontal',

    mixins,

    props,

    computed: {
        titleTextInfo() {
            let options = this.options
            return {
                titleContent: options.titleContent || '',
                textContent: options.textContent || '',
                showLeftImg: options.hasLeftImage == 0 ? false : true,
                showRightImg: options.hasRightImage == 0 ? false : true,
                leftImageUrl: options.leftImageUrl || '',
                rightImageUrl: options.rightImageUrl || ''
            }
        },
        titleStyleInfo() {
            let options = this.options
            return {
                fontSize: this.doCalcSize(options.titleSize || '16'),
                fontWeight:  parseInt((options.titleBold || 0), 10) === 1 ? 'bolder' : 'normal',
                color: this.doParseColor(options.titleColor || '#FF333333'),

            }
        },
        textStyleInfo() {
            let options = this.options
            return {
                fontSize: this.doCalcSize(options.textSize || '12'),
                fontWeight:  parseInt((options.textBold || 0), 10) === 1 ? 'bolder' : 'normal',
                color: this.doParseColor(options.textColor || '#FF666666'),
                marginLeft: parseInt(this.options.textAlignment) !== 0 ? 'auto' : this.doCalcSize('8')
            }
        },
        tilteStyle() {
            return {
                borderBottom: parseInt(this.options.bottomLine || '0') && '1px solid #F5F5FA'
            }
        }
    },
    methods: {
      linkTo() {
        this.doEmit('mclick', {action: this.options.action})
      }
    }
}
</script>
<style lang="scss">
.tfloor_title_horizontal {
    width: 100%;
    height: 40px;
    padding: 0 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tfloor_title_horizontal_img {
        width: 20px;
        height: 20px;
    }
    .tfloor_title_horizontal_text {
        display: flex;
        width: 100%;
        margin: auto 8px;
        align-items: center;
        justify-content: flex-start;
    }
}
</style>