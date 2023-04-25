<template>
    <div class="template_deposit_sliderone" ref="templatedepositsliderone">
        <ul class="template_deposit_sliderone_ul" :style="slidercontainerStyle">
            <li v-for="(itemInfo, index) in (options.styleInfoList || [])" :style="itemStyle" :key="index" class="template_deposit_sliderone_li">
                <div class="template_deposit_sliderone_textBlock">
                    <div class="template_deposit_sliderone_financeTitle" :style="financeStyle">{{itemInfo.fieldset1}}</div>
                </div>
                <div class="template_deposit_sliderone_textBlock">
                    <div class="template_deposit_sliderone_rate" :style="rateStyle">{{itemInfo.fieldset2}}<span :style="rateDesc"></span></div>
                    <div class="template_deposit_sliderone_financeDescTitle" :style="financeDescStyle">{{itemInfo.fieldset4}}</div>
                    <div class="template_deposit_sliderone_financeAmount" :style="financeAmountStyle">{{itemInfo.fieldset6}}</div>
                </div>
                <div class="template_deposit_sliderone_textBlock template_deposit_sliderone_linethree">
                    <div class="template_deposit_sliderone_rateLabel" :style="rateLabelStyle">
                        {{itemInfo.fieldset3}}
                    </div>
                    <div class="template_deposit_sliderone_financeLabel" :style="financeLabelStyle">
                        {{itemInfo.fieldset5}}
                    </div>
                    <div class="template_deposit_sliderone_financeAmountLabel" :style="financeAmountLabelStyle">
                        {{itemInfo.fieldset7}}
                    </div>
                </div>

                <div class="template_deposit_sliderone_progress" v-if="options.isProgressBar == '1'">
                    <div class="template_deposit_sliderone_progress_bar" :style="{width:(parseFloat(itemInfo.fieldset8)*100 + '%'), background: (options.color || '#FF8E00')}"></div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'
import Bscroll from 'better-scroll'

export default {
    mixins,
    props,

    data () {
        return {
            slidercontainerStyle: {
                width: 'auto'
            },
            itemStyle: {
                width: 'auto',
                height: 'auto',
                marginLeft: '0',
                marginTop: '0',
                marginBottom: '0',
                paddingLeft: '0',
                paddingRight: '0'
            },
            rateStyle: {
                width: 'auto',
                fontSize: '12px'
            },
            rateLabelStyle: {
                width: 'auto',
                fontSize: '12px'
            },
            rateDesc: {
                fontSize: 'auto'
            },
            financeStyle: {
                width: 'auto',
                fontSize: '12px',
                marginBottom: '10px'
            },
            financeLabelStyle: {
                width: 'auto',
                fontSize: '12px'
            },
            financeDescStyle: {
                width: 'auto',
                fontSize: '12px'
            },
            financeAmountStyle:{
                width: 'auto',
                fontSize: '12px'
            },
            financeAmountLabelStyle: {
                width: 'auto',
                fontSize: '12px'
            }
        }
    },

    created () {
        
    },

    mounted () {
        this.calcRect()

        this.$nextTick(() => {
            if(!this.picScroll){
                this.picScroll = new Bscroll(this.$refs.templatedepositsliderone,{
                    scrollX: true,
                    mouseWheel: {    // pc端同样能滑动
                        speed: 1,
                        invert: false
                    }
                })
            }else{
                this.picScroll.refresh();
            }
        })
    },

    methods: {
        calcRect () {

            let marginLeft = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 16)
            let itemWidth = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 327)
            this.itemStyle.width = itemWidth + 'px'
            this.itemStyle.height = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 108) + 'px'
            this.itemStyle.marginLeft = marginLeft + 'px'
            this.itemStyle.marginTop = marginLeft + 'px'
            this.itemStyle.marginBottom = this.itemStyle.marginTop
            this.itemStyle.paddingLeft = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 12) + 'px'
            this.itemStyle.paddingRight = this.itemStyle.paddingLeft

            this.rateStyle.width = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 120) + 'px'
            this.rateStyle.fontSize = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 30) + 'px'
            this.rateLabelStyle.width = this.rateStyle.width
            this.rateLabelStyle.fontSize = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 12) + 'px'
            this.rateDesc.fontSize = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 14) + 'px'

            this.financeStyle.width = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 343) + 'px'
            this.financeStyle.fontSize = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 14) + 'px'
            this.financeStyle.marginBottom = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 10) + 'px'
            this.financeDescStyle.width = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 80) + 'px'
            this.financeDescStyle.fontSize = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 18) + 'px'
            this.financeLabelStyle.width = this.financeDescStyle.width
            this.financeLabelStyle.fontSize = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 12) + 'px'

            this.financeAmountStyle.width = this.financeDescStyle.width
            this.financeAmountStyle.fontSize = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 18) + 'px'
            this.financeAmountLabelStyle.width = this.financeAmountStyle.width
            this.financeAmountLabelStyle.fontSize = this.calcpxbyelem(this.$refs.templatedepositsliderone, 375, 12) + 'px'

            if((this.options.styleInfoList || []).length > 1){
                this.slidercontainerStyle.width = ((this.options.styleInfoList || []).length*(marginLeft + itemWidth) + marginLeft) + 'px'
            }
            
        }
    }

}
</script>
<style scoped>
    @import '../../../reset.css';

    .template_deposit_sliderone{
        width: 100%;
        overflow: hidden;
        text-align: left;
    }

    .template_deposit_sliderone_ul{
        display: flex;
        justify-content: flex-start;
        font-size: 0;
        white-space: nowrap;
    }

    .template_deposit_sliderone_ul:after {
        content: '';
        clear: both;
        overflow: hidden;
        height: 0;
        line-height: 0;
        display: block
    }

    .template_deposit_sliderone_li{
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: 0 0 10px 0 rgba(195,200,226,0.50);
        border-radius: 4px;
        position: relative;
    }

    .template_deposit_sliderone_textBlock{
        display: flex;
        justify-content: space-between;
    }

    .template_deposit_sliderone_linethree{
        position: relative;
        top: -6px;
    }

    .template_deposit_sliderone_rate{
        color: #EE2039;
        transform: translateY(-20%);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_deposit_sliderone_financeTitle,
    .template_deposit_sliderone_financeDescTitle,
    .template_deposit_sliderone_financeAmount{
        color: #333333;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_deposit_sliderone_rateLabel,
    .template_deposit_sliderone_financeLabel,
    .template_deposit_sliderone_financeAmountLabel{
        color: #999999;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_deposit_sliderone_progress{
        position: absolute;
        width: 100%;
        height: 3px;
        bottom: 0;
        left: 0;
        background: #E8E8F0;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
    }

    .template_deposit_sliderone_progress_bar{
        background: #FF8E00;
        width: 0;
        height: 100%;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
    }

</style>
