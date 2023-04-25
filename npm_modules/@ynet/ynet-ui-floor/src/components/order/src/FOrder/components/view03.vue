<template>
    <div class="tfloor_order_view03" @click="fireClick(options.action, options.actionContext)">
        <div class="tfloor_order_view03_wrap">
            <div class="tfloor_order_view03_body">
                <div class="tfloor_order_view03_left">
                    <img class="tfloor_order_view03_img" :src="options.productImage"/>
                </div>
                <div class="tfloor_order_view03_right">
                    <div class="tfloor_order_view03_section">
                        <span class="tfloor_order_view03_info">{{options.productName}}</span>
                        <span class="tfloor_order_view03_desc">{{options.productDesc}}</span>
                    </div>
                    <div class="tfloor_order_view03_section">
                        <span class="tfloor_order_view03_amount">{{options.productAmount}}</span>
                    </div>
                </div>
            </div>
            <div class="tfloor_order_view03_footer">
                <div>
                    <span>{{options.timeDesc}}</span>
                    <span>{{options.time}}</span>
                </div>
                <div>
                    <span>{{options.buyDesc}}</span>
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

        btnStyle: {
            type: Object,
            default () {
                return {}
            }
        },

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
.tfloor_order_view03 {
    width: 100%;
    background: #F2F2F7;
    border-radius: 10px;

    .tfloor_order_view03_wrap{
        padding: 16px;
    }

    .tfloor_order_view03_header{
        font-size: 14px;
        color: #000000;
        letter-spacing: 0;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tfloor_order_view03_body{
        display: flex;
    }

    .tfloor_order_view03_left{
        width: 100px;
        height: 78px;
        flex: 0 0 auto;
    }

    .tfloor_order_view03_img{
        width: 100%;
        height: 100%;
    }

    .tfloor_order_view03_right{
        width: 163px;
        height: 78px;
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    .tfloor_order_view03_section{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .tfloor_order_view03_info{
        font-size: 14px;
        color: #000000;
        letter-spacing: 0;
        font-weight: bold;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .tfloor_order_view03_desc{
        font-size: 10px;
        color: #929292;
        letter-spacing: 0;
        line-height: 16px;
        margin-top: 4px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .tfloor_order_view03_amount{
        font-size: 20px;
        color: #FF3A30;
        line-height: 24px;
        font-weight: bold;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .tfloor_order_view03_footer{
        font-size: 12px;
        color: #929292;
        letter-spacing: 0;
        line-height: 16px;
        padding-top: 10px;
        margin-top: 12px;
        border-top: 1px solid #E8E8E8;
        display: flex;
        justify-content: space-between;
    }
}
</style>