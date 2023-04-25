<template>
    <div class="tfloor_imagetext_fimagetexttopbottom">
        <div class="tfloor_imagetext_fimagetexttopbottom_container" :style="fImagetextStyle" v-for="(item, index) in fImagetextInfo.imagetextList" :key="index" @click="linkTo(item)">
            <img :src="item.imageUrl" class="tfloor_imagetext_fimagetexttopbottom_img" />
            <div class="tfloor_imagetext_fimagetexttopbottom_text_container" :style="imageContainerStyle">
                <div class="tfloor_imagetext_fimagetexttopbottom_text" :style="titleStyle">{{item.title}}</div>
                <div class="tfloor_imagetext_fimagetexttopbottom_text" :style="descStyle">{{item.titleDes}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'

export default {

    name: 'FImageTextTopBottom',

    mixins,

    props,

    computed: {
        fImagetextInfo() {
            return {
                imagetextList: this.imageTextList
            }
        },
        fImagetextStyle() {
            return {
                borderBottom: this.isBottomLine == '0' ? 'none' : '1px solid #3671F'
            }
        },
        imageContainerStyle() {
            return {
                textAlign: this.textOption == '0' ? 'left' : 'right'
            }
        },
        titleStyle() {
            return {
                fontSize: this.doCalcSize(this.titleTextSize),
                fontWeight: this.titleIsBold == '0' ? 'normol' : 'bolder',
                color: this.doParseColor(this.titleColor)
            }
        },
        descStyle() {
            return {
                fontSize: this.doCalcSize(this.desTextSize),
                fontWeight: this.desIsBlod == '0' ? 'normol' : 'bolder',
                color: this.doParseColor(this.desColor)
            }
        }
    },
    methods: {
        linkTo(item) {
            this.doEmit('mclick', {action: item.action, actionContext: item.actionContext})
        }
    }
}
</script>
<style lang="scss">
.tfloor_imagetext_fimagetexttopbottom {
    width: 100%;
    .tfloor_imagetext_fimagetexttopbottom_container {
        width: 100%;
        height: 132px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
        padding: 0 16px;
        box-sizing: border-box;
        .tfloor_imagetext_fimagetexttopbottom_img {
            width: 100%;
            height: 64px;
            margin-bottom: 8px;
        }
        .tfloor_imagetext_fimagetexttopbottom_text_container {
            width: 100%;
            .tfloor_imagetext_fimagetexttopbottom_text {
                line-height: 16px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .tfloor_imagetext_fimagetexttopbottom_text:first-child {
                margin-bottom: 4px;
            }
        }
    }
}
</style>