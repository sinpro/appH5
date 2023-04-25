<template>
    <div class="tfloor_account_view03" @click="fireClick(options.action, options.actionContext)">
        <div class="tfloor_account_view03_wrap">
            <div class="tfloor_account_view03_header">
                <div class="tfloor_account_view03_con">
                    <span>
                        <span>{{options.accountName}}</span>
                        <span v-if="options.accountNo">({{options.accountNo}})</span>
                    </span>
                    <img :src="isMask ? desc.closeEyeWhite : desc.openEyeWhite" class="tfloor_account_view03_icon"
                        @click.stop="$emit('togglemask')"/>
                </div>
                <div class="tfloor_account_view03_con">
                    <img :src="desc.arrow" class="tfloor_account_view03_icon"/>
                </div>
            </div>
            <div class="tfloor_account_view03_body">
                <div class="tfloor_account_view03_desc">
                    <span class="tfloor_account_view03_title">{{options.amountDesc}}</span>
                </div>
                <div class="tfloor_account_view03_info">
                    <div class="tfloor_account_view03_number">{{isMask ? '******' : options.amount}}</div>
                    <div class="tfloor_account_view03_btngroup">
                        <span class="tfloor_account_view03_btn"
                            v-for="(btnInfo, index) in btnArray"
                            :key="index"
                            :style="btnStyle"
                            @click.stop="fireClick(btnInfo.action, options.actionContext)">{{btnInfo.btnTitle}}</span>
                    </div>
                </div>
            </div>
            <div class="tfloor_account_view03_footer" v-if="options.debtDesc && options.profitDesc">
                <span class="tfloor_account_view03_attach" v-if="options.debtDesc">{{options.debtDesc}}</span>
                <span class="tfloor_account_view03_attach" v-if="options.profitDesc">{{options.profitDesc}}</span>
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
.tfloor_account_view03 {
    width: 100%;
    background: #FFFFFF;
    border-radius: 8px;
    background-image: linear-gradient(270deg, #545A68 0%, #7F818F 100%);

    .tfloor_account_view03_wrap{
        padding: 16px 16px 16px 16px;
    }

    .tfloor_account_view03_header{
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tfloor_account_view03_con{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .tfloor_account_view03_icon{
        width: 16px;
        height: 16px;
        margin-left: 4px;
    }

    .tfloor_account_view03_desc{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tfloor_account_view03_body{
        margin-top: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .tfloor_account_view03_title{
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 16px;
        opacity: 0.8;
    }

    .tfloor_account_view03_info{
        width: 100%;
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 28px;
    }

    .tfloor_account_view03_number{
        font-size: 28px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 24px;
        font-weight: bold;
    }

    .tfloor_account_view03_btngroup{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .tfloor_account_view03_btn{
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

        &+.tfloor_account_view03_btn{
            margin-left: 12px;
        }
    }

    .tfloor_account_view03_footer{
        margin-top: 8px;
    }

    .tfloor_account_view03_attach{
        opacity: 0.8;
        margin-left: 0;
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 16px;

        &+.tfloor_account_view03_attach{
            margin-left: 24px;
        }
    }
}
</style>