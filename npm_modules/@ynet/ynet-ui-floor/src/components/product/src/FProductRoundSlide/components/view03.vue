<template>
    <div class="tfloor_product_roundslide_view03" @click="fireClick(options.action, options.actionContext)">
        <div class="tfloor_product_roundslide_view03_image">
            <img :src="options.productImage" class="tfloor_product_roundslide_view03_img"/>
        </div>
        <div class="tfloor_product_roundslide_view03_section">
            <div class="tfloor_product_roundslide_view03_title">{{options.productName}}</div>
            <div class="tfloor_product_roundslide_view03_number">
                <span class="tfloor_product_roundslide_view03_amount">{{options.price}}</span>
                <span class="tfloor_product_roundslide_view03_amountmark">{{options.priceMark}}</span>
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
.tfloor_product_roundslide_view03 {
    overflow: hidden;
    width: 180px;
    padding: 0;
    background: #F2F2F7;
    border-radius: 8px;

    .tfloor_product_roundslide_view03_image{
        width: 100%;
        height: 92px;
    }

    .tfloor_product_roundslide_view03_img{
        width: 100%;
        height: 100%;
    }

    .tfloor_product_roundslide_view03_section{
        padding: 6px 16px 10px 16px;
    }

    .tfloor_product_roundslide_view03_title{
        font-size: 14px;
        color: #000000;
        letter-spacing: 0;
        font-weight: bold;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .tfloor_product_roundslide_view03_number{
        font-size: 14px;
        
        line-height: 20px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .tfloor_product_roundslide_view03_amount{
        font-size: 14px;
        color: #FF3A30;
        line-height: 20px;
    }

    .tfloor_product_roundslide_view03_amountmark{
        font-size: 10px;
        color: #999999;
        line-height: 14px;
        margin-left: 4px;
    }
}
</style>