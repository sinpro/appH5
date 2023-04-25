<template>
    <div class="tfloor_product_roundslide_view01" @click="fireClick(options.action, options.actionContext)">
        <div class="tfloor_product_roundslide_view01_title">{{options.productName}}</div>
        <div class="tfloor_product_roundslide_view01_rate">{{options.productRate}}</div>
        <div class="tfloor_product_roundslide_view01_ratedesc">{{options.productRateDesc}}</div>
        <div class="tfloor_product_roundslide_view01_label"
            v-if="options.productLabel" :style="labelStyle">{{options.productLabel || ''}}</div>
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

        labelStyle: {
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
.tfloor_product_roundslide_view01{
    overflow: hidden;
    width: 180px;
    padding: 16px;
    background: #F2F2F7;
    border-radius: 8px;

    .tfloor_product_roundslide_view01_title{
        font-size: 14px;
        color: #000000;
        line-height: 20px;
        font-weight: bold;
    }

    .tfloor_product_roundslide_view01_rate{
        font-weight: bold;
        font-size: 24px;
        color: #FF3A30;
        line-height: 24px;
        margin-top: 12px;
    }

    .tfloor_product_roundslide_view01_ratedesc{
        margin-top: 6px;
        font-size: 12px;
        color: #8A8A8E;
        line-height: 12px;
    }

    .tfloor_product_roundslide_view01_label{
        background: #FFFFFF;
        border-radius: 5px;
        font-size: 12px;
        color: #1765CA;
        text-align: center;
        line-height: 16px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 16px;
    }
}
</style>