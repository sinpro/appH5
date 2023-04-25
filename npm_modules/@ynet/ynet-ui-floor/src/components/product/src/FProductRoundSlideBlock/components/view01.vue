<template>
    <div class="tfloor_product_roundslideblock_view01" @click="fireClick(options.action, options.actionContext)">
        <div class="tfloor_product_roundslideblock_view01_wrap">
        <div class="tfloor_product_roundslideblock_view01_header">{{options.productName}}</div>
        <div class="tfloor_product_roundslideblock_view01_body">
            <div>
                <div class="tfloor_product_roundslideblock_view01_rate">{{options.productRate}}</div>
                <div class="tfloor_product_roundslideblock_view01_ratedesc">{{options.productRateDesc}}</div>
            </div>
            <div>
                <div class="tfloor_product_roundslideblock_view01_btngroup" 
                    v-if="options.btnArray && options.btnArray[0]">
                    <span class="tfloor_product_roundslideblock_view01_btn"
                        @click.stop="fireClick(options.btnArray[0].action, options.actionContext)"
                        :style="btnStyle">{{options.btnArray[0].btnTitle}}</span>
                </div>
            </div>
        </div>
        <div class="tfloor_product_roundslideblock_view01_footer">
            <div class="tfloor_product_roundslideblock_view01_label">{{options.productLabel}}</div>
            <div class="tfloor_product_roundslideblock_view01_desc">{{options.labelDesc}}</div>
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
    }
}
</script>
<style lang="scss">
.tfloor_product_roundslideblock_view01{
    width: 288px;
    background: #F2F2F7;
    border-radius: 8px;
    height: 136px;

    .tfloor_product_roundslideblock_view01_wrap{
        padding: 16px 16px 8px 16px;
    }

    .tfloor_product_roundslideblock_view01_header{
        font-size: 14px;
        color: #000000;
        font-weight: bold;
    }

    .tfloor_product_roundslideblock_view01_body{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 12px;
        border-bottom: 1px solid #E8E8E8;
    }

    .tfloor_product_roundslideblock_view01_rate {
        font-weight: bold;
        font-size: 24px;
        color: #FF3A30;
        line-height: 24px;
        margin-top: 12px;
    }

    .tfloor_product_roundslideblock_view01_ratedesc {
        margin-top: 4px;
        font-size: 12px;
        color: #8A8A8E;
        line-height: 16px;
    }

    .tfloor_product_roundslideblock_view01_btngroup{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .tfloor_product_roundslideblock_view01_btn{
        font-size: 12px;
        color: #FFFFFF;
        text-align: center;
        line-height: 12px;
        background: #1765CA;
        border-radius: 16px;
        width: 72px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;

        &+.tfloor_product_roundslideblock_view01_btn{
            margin-left: 12px;
        }
    }

    .tfloor_product_roundslideblock_view01_footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 8px;
    }

    .tfloor_product_roundslideblock_view01_label{
        display: flex;
        font-size: 10px;
        color: #929292;
        letter-spacing: 0;
        line-height: 16px;
    }

    .tfloor_product_roundslideblock_view01_labeltext{
        margin: 0 2px;
    }

    .tfloor_product_roundslideblock_view01_desc{
        font-size: 10px;
        color: #929292;
        letter-spacing: 0;
        text-align: right;
        line-height: 16px;
    }
}
</style>