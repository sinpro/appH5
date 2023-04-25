<template>
    <div class="tfloor_imagetext_fimagetexttopbottomslideone" :style="fImagetextStyle">
        <div class="tfloor_imagetext_fimagetexttopbottomslideonecontainer" ref="scrollercontainer">
            <div class="tfloor_imagetext_fimagetexttopbottomslideone_content">
                <div class="tfloor_imagetext_fimagetexttopbottomslideone_list" v-for="(item, index) in fImagetextInfo.imagetextList" :key="index" @click="linkTo(item)">
                    <img :src="item.imageUrl" class="tfloor_imagetext_fimagetexttopbottomslideone_img" />
                    <div class="tfloor_imagetext_fimagetexttopbottomslideone_text_container">
                        <div class="tfloor_imagetext_fimagetexttopbottomslideone_text" :style="titleStyle">{{item.title}}</div>
                        <div class="tfloor_imagetext_fimagetexttopbottomslideone_text" :style="descStyle">{{item.titleDes}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'
import BetterScroll from 'better-scroll'

export default {

    name: 'FImageTextTopBottomSlideOne',

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
    mounted() {
        this.initScroll()
    },
    methods: {
        initScroll() {
            this.$nextTick(() => {
                new BetterScroll(this.$refs.scrollercontainer, {
                    scrollX: true
                })
            })
        },
        linkTo(item) {
            this.doEmit('mclick', {action: item.action, actionContext: item.actionContext})
        }
    }
}
</script>
<style lang="scss">

.tfloor_imagetext_fimagetexttopbottomslideone {
    width: 100%;
    .tfloor_imagetext_fimagetexttopbottomslideonecontainer {
        height: 168px;
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
    }

    .tfloor_imagetext_fimagetexttopbottomslideone_content{
        display: flex;
        flex-wrap: nowrap;
        padding: 0 16px;
    }

    .tfloor_imagetext_fimagetexttopbottomslideone_list {
        margin-left: 0;
        width: 300px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;

        &+.tfloor_imagetext_fimagetexttopbottomslideone_list{
            margin-left: 16px;
        }
    }
    .tfloor_imagetext_fimagetexttopbottomslideone_img {
        width: 300px;
        height: 100px;
        margin-bottom: 8px;
    }
    .tfloor_imagetext_fimagetexttopbottomslideone_text_container {
        width: 100%;
        .tfloor_imagetext_fimagetexttopbottomslideone_text {
            line-height: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .tfloor_imagetext_fimagetexttopbottomslideone_text:first-child {
            margin-bottom: 4px;
        }
    }
}
.tfloor_imagetext_fimagetexttopbottomslideone::-webkit-scrollbar{//隐藏滚动条
    display: none;
}
</style>