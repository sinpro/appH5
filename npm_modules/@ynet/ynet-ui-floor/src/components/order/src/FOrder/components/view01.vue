<template>
    <div class="tfloor_order_view01" @click="fireClick(options.action, options.actionContext)">
        <div class="tfloor_order_view01_wrap">
            <div class="tfloor_order_view01_header">
                <span class="tfloor_order_view01_title">{{options.productName}}</span>
                <span class="tfloor_order_view01_subtitle"
                    v-if="options.orderMark" :style="subTitleStyle">{{(options.orderMark || {}).title || ''}}</span>
            </div>
            <div class="tfloor_order_view01_body">
                <div class="tfloor_order_view01_section">
                    <span class="tfloor_order_view01_info">{{options.amount}}</span>
                    <span class="tfloor_order_view01_desc">{{options.amountDesc}}</span>
                </div>
                <div class="tfloor_order_view01_section">
                    <span class="tfloor_order_view01_info">{{options.inComeAmount}}</span>
                    <span class="tfloor_order_view01_desc">{{options.inComeAmountDesc}}</span>
                </div>
                <div class="tfloor_order_view01_section">
                    <div class="tfloor_order_view01_btngroup">
                        <span class="tfloor_order_view01_btn"
                            v-for="(btnInfo, index) in options.btnArray"
                            :key="index"
                            :style="btnStyle"
                            @click.stop="fireClick(btnInfo.action, options.actionContext)">{{btnInfo.btnTitle}}</span>
                    </div>
                </div>
            </div>
            <div class="tfloor_order_view01_footer">
                <span>{{options.cardNoDesc}}</span>
                <span>{{options.dueInfo}}</span>
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
    },

    computed: {
        
        subTitleStyle () {
            let orderMark = this.options.orderMark || {}
            return {
                color: this.doParseColor(orderMark.titleColor || ''),
                backgroundColor: this.doParseColor(orderMark.bgColor || '')
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_order_view01 {
    width: 100%;
    background: #F2F2F7;
    border-radius: 10px;

    .tfloor_order_view01_wrap{
        padding: 16px;
    }

    .tfloor_order_view01_header{
        display: flex;
        align-items: center;
    }

    .tfloor_order_view01_title{
        font-size: 14px;
        color: #000000;
        letter-spacing: 0;
        font-weight: bold;
    }

    .tfloor_order_view01_subtitle{
        font-size: 10px;
        letter-spacing: 0;
        line-height: 14px;
        margin-left: 4px;
        border-radius: 2px;
        padding: 0 4px;
        display: flex;
        align-items: center;
    }

    .tfloor_order_view01_body{
        padding: 12px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #E8E8E8;
    }
    
    .tfloor_order_view01_section{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .tfloor_order_view01_info{
        font-size: 14px;
        color: #050505;
        letter-spacing: 0;
        line-height: 24px;
        font-weight: bold;
    }

    .tfloor_order_view01_desc{
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        line-height: 16px;
        margin-top: 4px;
    }

    .tfloor_order_view01_btngroup{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .tfloor_order_view01_btn{
        font-size: 12px;
        color: #1765CA;
        text-align: center;
        line-height: 12px;
        background: #FFFFFF;
        border-radius: 16px;
        width: 72px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;

        &+.tfloor_order_view01_btn{
            margin-left: 12px;
        }
    }

    .tfloor_order_view01_footer{
        padding-top: 10px;
        font-size: 12px;
        color: #929292;
        letter-spacing: 0;
        line-height: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>