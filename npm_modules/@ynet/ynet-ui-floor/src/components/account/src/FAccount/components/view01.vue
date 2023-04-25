<template>
    <div class="tfloor_account_view01" @click="fireClick(options.action, options.actionContext)">
        <div class="tfloor_account_view01_wrap">
            <div class="tfloor_account_view01_header">
                <div class="tfloor_account_view01_con">
                    <span>
                        <span>{{options.accountName}}</span>
                        <span v-if="options.accountNo">({{options.accountNo}})</span>
                    </span>
                    <img :src="isMask ? desc.closeEye : desc.openEye" class="tfloor_account_view01_icon"
                        @click.stop="$emit('togglemask')"/>
                </div>
                <div class="tfloor_account_view01_con">
                    <img :src="desc.arrow" class="tfloor_account_view01_icon"/>
                </div>
            </div>
            <div class="tfloor_account_view01_body">
                <div class="tfloor_account_view01_desc">
                    <div class="tfloor_account_view01_flexleft">
                        <span class="tfloor_account_view01_title">{{options.amountDesc}}</span>
                        <span class="tfloor_account_view01_subtitle"
                            v-if="options.amountMark" :style="subTitleStyle">{{(options.amountMark || {}).title || ''}}</span>
                    </div>
                    <div class="tfloor_account_view01_flexright">
                        <span class="tfloor_account_view01_datedesc" v-if="options.dateDesc">{{options.dateDesc}}</span>
                    </div>
                </div>
                <div class="tfloor_account_view01_info">
                    <div class="tfloor_account_view01_number">{{isMask ? '******' : options.amount}}</div>
                    <div class="tfloor_account_view01_btngroup">
                        <span class="tfloor_account_view01_btn"
                            v-for="(btnInfo, index) in btnArray"
                            :key="index"
                            :style="btnStyle"
                            @click.stop="fireClick(btnInfo.action, options.actionContext)">{{btnInfo.btnTitle}}</span>
                    </div>
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
        isMask: {
            type: Boolean,
            default: false
        },

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
        },

        desc: {
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
            let amountMark = this.options.amountMark || {}
            return {
                color: this.doParseColor(amountMark.titleColor || ''),
                backgroundColor: this.doParseColor(amountMark.bgColor || '')
            }
        },

        btnArray () {
            let btns = this.options.btnArray || []
            return btns.slice(0, 2)
        }
    }
}
</script>
<style lang="scss">
.tfloor_account_view01 {
    width: 100%;
    background: #FFFFFF;
    border-radius: 8px;

    .tfloor_account_view01_wrap{
        padding: 16px 16px 31px 16px;
    }

    .tfloor_account_view01_header{
        font-size: 12px;
        color: #8A8A8E;
        letter-spacing: 0;
        line-height: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tfloor_account_view01_con{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .tfloor_account_view01_icon{
        width: 16px;
        height: 16px;
        margin-left: 4px;
    }

    .tfloor_account_view01_desc{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tfloor_account_view01_flexleft{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .tfloor_account_view01_flexright{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .tfloor_account_view01_body{
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .tfloor_account_view01_title{
        font-size: 12px;
        color: #8A8A8E;
        letter-spacing: 0;
        line-height: 16px;
        opacity: 0.8;
    }

    .tfloor_account_view01_subtitle{
        font-size: 10px;
        letter-spacing: 0;
        line-height: 14px;
        margin-left: 10px;
        border-radius: 2px;
        padding: 0 4px;
        display: flex;
        align-items: center;
    }

    .tfloor_account_view01_datedesc{
        font-size: 12px;
        color: #BABABF;
        letter-spacing: 0;
        line-height: 16px;
    }

    .tfloor_account_view01_info{
        width: 100%;
        margin-top: 11px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 28px;
    }

    .tfloor_account_view01_number{
        font-size: 28px;
        color: #000000;
        letter-spacing: 0;
        line-height: 24px;
        font-weight: bold;
    }

    .tfloor_account_view01_btngroup{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .tfloor_account_view01_btn{
        font-size: 12px;
        color: #1765CA;
        text-align: center;
        line-height: 12px;
        background: #F2F2F7;
        border-radius: 16px;
        width: 72px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;

        &+.tfloor_account_view01_btn{
            margin-left: 12px;
        }
    }
}
</style>