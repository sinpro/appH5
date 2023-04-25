<template>
    <div class="tfloor_product_roundslideblock">
        <div class="tfloor_product_roundslideblock_rect">
            <div class="tfloor_product_roundslideblock_rectheader">
                <round-header :options="header" v-on="$listeners"/>
            </div>
            <div class="tfloor_product_roundslideblock_rectbody" ref="wrapper">
                <div class="tfloor_product_roundslideblock_list">
                    <component 
                        v-for="(productInfo, index) in productList"
                        :key="index"
                        :is="'view' + productInfo.productStyle"
                        :options="productInfo"
                        :btnStyle="btnStyle"
                        class="tfloor_product_roundslideblock_item"
                        v-on="$listeners"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mixins from '../../../../assets/mixins/mixins'
import props from './props'
import BetterScroll from 'better-scroll'
import RoundHeader from '../../../../assets/components/RoundHeader/index.vue'
import components from './components/index.js'

export default {

    name: 'FProductRoundSlideBlock',

    mixins,

    props,

    components: {
        RoundHeader,
        ...components
    },

    mounted() {
        this.initScroll()
    },

    methods: {

        initScroll() {
            this.$nextTick(() => {
                new BetterScroll(this.$refs.wrapper, {
                    scrollX: true,
                    click: true
                })
            })
        },
    },

    computed: {

        btnStyle () {
            return {
                color: this.doParseColor(this.btnTitleColor),
                backgroundColor: this.doParseColor(this.btnBgColor)
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_product_roundslideblock {
    overflow: hidden;
    padding: 0 16px;

    .tfloor_product_roundslideblock_rect{
        background: #FFFFFF;
        border-radius: 10px;
    }

    .tfloor_product_roundslideblock_rectheader{
        padding: 16px 16px 0 16px;
    }

    .tfloor_product_roundslideblock_rectbody{
        padding: 16px 0;
        overflow: hidden;
    }

    .tfloor_product_roundslideblock_list {
        display: flex;
        flex-wrap: nowrap;
        width: max-content;
        padding: 0px 16px;
        box-sizing: border-box;
    }

    .tfloor_product_roundslideblock_item {

        &+.tfloor_product_roundslideblock_item{
            margin-left: 8px;
        }
    }
}
</style>