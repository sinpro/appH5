<template>
    <div class="tfloor_order_view04" @click="fireClick(options.action, options.actionContext)">
        <div class="tfloor_order_view04_wrap">
            <div class="tfloor_order_view04_body">
                <div class="tfloor_order_view04_left">
                    <img class="tfloor_order_view04_img" :src="options.cardImage"/>
                </div>
                <div class="tfloor_order_view04_right">
                    <div class="tfloor_order_view04_section">
                        <span class="tfloor_order_view04_info">{{options.cardName}}</span>
                        <span class="tfloor_order_view04_desc">{{options.cardDesc}}</span>
                    </div>
                    <div class="tfloor_order_view04_section">
                        <div class="tfloor_order_view04_btngroup">
                            <span class="tfloor_order_view04_btn"
                                v-for="(btnInfo, index) in options.btnArray"
                                :key="index"
                                :style="btnStyle"
                                @click.stop="fireClick(btnInfo.action, options.actionContext)">{{btnInfo.btnTitle}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tfloor_order_view04_footer">
                <div>
                    <span>{{options.applyTimeDesc}}</span>
                    <span>{{options.applyTime}}</span>
                </div>
                <div>
                    <span :style="approveStyle">{{approveTitle}}</span>
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
    },

    computed: {

        approveTitle () {
            let approveDesc = this.options.approveDesc || {}
            return approveDesc.content || ''
        },

        approveStyle () {
            let approveDesc = this.options.approveDesc || {}
            return {
                color: this.doParseColor(approveDesc.color)
            }
        }
    }
}
</script>
<style lang="scss">
.tfloor_order_view04 {
    width: 100%;
    background: #F2F2F7;
    border-radius: 10px;

    .tfloor_order_view04_wrap{
        padding: 16px;
    }

    .tfloor_order_view04_header{
        font-size: 14px;
        color: #000000;
        letter-spacing: 0;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tfloor_order_view04_body{
        display: flex;
    }

    .tfloor_order_view04_left{
        width: 116px;
        height: 77px;
        flex: 0 0 auto;
    }

    .tfloor_order_view04_img{
        width: 100%;
        height: 100%;
    }

    .tfloor_order_view04_right{
        width: 147px;
        height: 77px;
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    .tfloor_order_view04_section{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .tfloor_order_view04_info{
        font-size: 14px;
        color: #000000;
        letter-spacing: 0;
        font-weight: bold;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .tfloor_order_view04_desc{
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

    .tfloor_order_view04_amount{
        font-size: 20px;
        color: #FF3A30;
        line-height: 24px;
        font-weight: bold;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .tfloor_order_view04_footer{
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

    .tfloor_order_view04_btngroup{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .tfloor_order_view04_btn{
        font-size: 12px;
        color: #1765CA;
        text-align: center;
        line-height: 12px;
        background: #FFFFFF;
        border-radius: 16px;
        padding: 0 10px;
        height: 28.8px;
        display: flex;
        justify-content: center;
        align-items: center;

        &+.tfloor_order_view04_btn{
            margin-left: 12px;
        }
    }
}
</style>