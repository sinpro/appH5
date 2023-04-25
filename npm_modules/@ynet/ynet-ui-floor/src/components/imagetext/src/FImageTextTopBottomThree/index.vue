<template>
    <div class="tfloor_imagetext_fimagetexttopbottomthree" :style="fImagetextStyle" @click="linkTo">
        <div class="tfloor_imagetext_fimagetexttopbottomthree_list" v-for="(item, index) in fImagetextInfo.imagetextList" :key="index" @click="linkTo(item)">
            <img :src="item.imageUrl" class="tfloor_imagetext_fimagetexttopbottomthree_img" />
            <div class="tfloor_imagetext_fimagetexttopbottomthree_text_container">
                <div class="tfloor_imagetext_fimagetexttopbottomthree_text" :style="titleStyle">{{item.title}}</div>
                <div class="tfloor_imagetext_fimagetexttopbottomthree_text" :style="descStyle">{{item.titleDes}}</div>
            </div>
        </div>
        
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'

export default {

    name: 'FImageTextTopBottomThree',

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
.tfloor_imagetext_fimagetexttopbottomthree {
    width: 100%;
    height: 166px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .tfloor_imagetext_fimagetexttopbottomthree_list {
        width: 104px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
    }
    .tfloor_imagetext_fimagetexttopbottomthree_img {
        width: 104px;
        height: 104px;
        margin-bottom: 8px;
    }
    .tfloor_imagetext_fimagetexttopbottomthree_text_container {
        max-width: 100%;
        .tfloor_imagetext_fimagetexttopbottomthree_text {
            line-height: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .tfloor_imagetext_fimagetexttopbottomthree_text:first-child {
            margin-bottom: 4px;
        }
    }
}
</style>