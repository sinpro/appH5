<template>
    <div class="tfloor_imagetext_fimagetexttopbottomslidethree" :style="fImagetextStyle">
        <div class="tfloor_imagetext_fimagetexttopbottomslidethreecontainer" ref="scrollercontainer">
            <div class="tfloor_imagetext_fimagetexttopbottomslidethree_content">
                <div class="tfloor_imagetext_fimagetexttopbottomslidethree_list" v-for="(item, index) in fImagetextInfo.imagetextList" :key="index" @click="linkTo(item)">
                    <img :src="item.imageUrl" class="tfloor_imagetext_fimagetexttopbottomslidethree_img" />
                    <div class="tfloor_imagetext_fimagetexttopbottomslidethree_text_container">
                        <div class="tfloor_imagetext_fimagetexttopbottomslidethree_text" :style="titleStyle">{{item.title}}</div>
                        <div class="tfloor_imagetext_fimagetexttopbottomslidethree_text" :style="descStyle">{{item.titleDes}}</div>
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

    name: 'FImageTextTopBottomSlideThree',

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
.tfloor_imagetext_fimagetexttopbottomslidethree {
    width: 100%;
    .tfloor_imagetext_fimagetexttopbottomslidethreecontainer {
        height: 148px;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        overflow: hidden;
    }
    .tfloor_imagetext_fimagetexttopbottomslidethree_content{
        display: flex;
        flex-wrap: nowrap;
        padding: 0 16px;
    }
    .tfloor_imagetext_fimagetexttopbottomslidethree_list {
        margin-left: 0;
        width: 88px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;

        &+.tfloor_imagetext_fimagetexttopbottomslidethree_list{
            margin-left: 16px;
        }
    }
    .tfloor_imagetext_fimagetexttopbottomslidethree_img {
        width: 88px;
        height: 88px;
        margin-bottom: 8px;
    }
    .tfloor_imagetext_fimagetexttopbottomslidethree_text_container {
        width: 100%;
        text-align: center;
        .tfloor_imagetext_fimagetexttopbottomslidethree_text {
            line-height: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .tfloor_imagetext_fimagetexttopbottomslidethree_text:first-child {
            margin-bottom: 4px;
        }
    }
}
.tfloor_imagetext_fimagetexttopbottomslidethree::-webkit-scrollbar{//隐藏滚动条
    display: none;
}
</style>