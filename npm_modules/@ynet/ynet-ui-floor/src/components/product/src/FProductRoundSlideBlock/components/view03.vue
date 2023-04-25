<template>
    <div class="tfloor_product_roundslideblock_view03" @click="fireClick(options.action, options.actionContext)">
        <div class="tfloor_product_roundslideblock_view03_wrap">
        <div class="tfloor_product_roundslideblock_view03_left">
            <img :src="options.productImage" class="tfloor_product_roundslideblock_view03_image"/>
        </div>
        <div class="tfloor_product_roundslideblock_view03_right">
            <div>
                <div class="tfloor_product_roundslideblock_view03_title">{{options.productName}}</div>
                <div class="tfloor_product_roundslideblock_view03_desc">
                    <span>{{options.productLabel}}</span>
                    <span v-if="options.productMark"
                     class="tfloor_product_roundslideblock_view03_productmark"
                     :style="markStyle">{{(options.productMark || {}).title}}</span>
                </div>
                <div class="tfloor_product_roundslideblock_view03_price">
                    <span>{{options.price}}</span>
                    <span class="tfloor_product_roundslideblock_view03_pricemark">{{options.priceMark}}</span>
                </div>
            </div>
            <div class="tfloor_product_roundslideblock_view03_btngroup" 
                v-if="options.btnArray && options.btnArray[0]">
                <span class="tfloor_product_roundslideblock_view03_btn"
                    @click.stop="fireClick(options.btnArray[0].action, options.actionContext)"
                    :style="btnStyle">{{options.btnArray[0].btnTitle}}</span>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import mixins from '../../../../../assets/mixins/mixins'

export default {

    mixins,

    props: {
        
        options: {
            type: Object,
            default () {
                return {}
            }
        },

        btnStyle: {
            type: Object,
            default () {
                return {}
            }
        }
    },

    methods: {

        fireClick (action, actionContext) {
            this.doEmit('mclick', {action, actionContext})
        }
    },

    computed: {
        
        markStyle () {
            let productMark = this.options.productMark || {}
            return {
                color: this.doParseColor(productMark.titleColor || ''),
                backgroundColor: this.doParseColor(productMark.bgColor || '')
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_product_roundslideblock_view03{
    width: 288px;
    background: #F2F2F7;
    border-radius: 8px;

    .tfloor_product_roundslideblock_view03_wrap{
        padding: 18px 16px;
        display: flex;
    }

    .tfloor_product_roundslideblock_view03_left{
        width: 100px;
        height: 100px;
        flex: 0 0 auto;
    }

    .tfloor_product_roundslideblock_view03_image{
        width: 100%;
        height: 100%;
    }

    .tfloor_product_roundslideblock_view03_right{
        width: 140px;
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .tfloor_product_roundslideblock_view03_title{
        font-size: 14px;
        color: #000000;
        letter-spacing: 0;
        font-weight: bold;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .tfloor_product_roundslideblock_view03_desc{
        font-size: 10px;
        color: #929292;
        letter-spacing: 0;
        line-height: 16px;
        display: flex;
        align-items: center;
        margin-top: 2px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .tfloor_product_roundslideblock_view03_productmark{
        margin-left: 4px;
        padding: 0 4px;
        border-radius: 2px;
    }

    .tfloor_product_roundslideblock_view03_price{
        font-size: 20px;
        color: #FF3A30;
        line-height: 24px;
        font-weight: bold;
        margin-top: 4px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .tfloor_product_roundslideblock_view03_pricemark{
        font-size: 10px;
        color: #929292;
        letter-spacing: 0;
        line-height: 16px;
        margin-left: 4px;
    }

    .tfloor_product_roundslideblock_view03_btngroup{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .tfloor_product_roundslideblock_view03_btn{
        font-size: 12px;
        color: #FFFFFF;
        text-align: center;
        line-height: 12px;
        background: #1765CA;
        border-radius: 16px;
        width: 76px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>