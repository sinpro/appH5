<template>
    <div class="template_finance_sliderone" ref="templatefinancesliderone">
        <ul class="template_finance_sliderone_slider_container" :style="slidercontainerStyle">
            <li class="template_finance_sliderone_slider_item" v-for="(itemInfo, index) in (options.styleInfoList || [])" :key="index">
                <div class="template_finance_sliderone_container" :style="containerStyle">
                    <div class="template_finance_sliderone_rateCon" :style="rateConStyle">
                        <div class="template_finance_sliderone_rate" :style="rateStyle">
                            {{itemInfo.fieldset2}}
                        </div>
                        <div class="template_finance_sliderone_financeTitle" :style="financeTitleStyle">{{itemInfo.fieldset1}}</div>
                    </div>
                    <div class="template_finance_sliderone_financeCon" :style="financeConStyle">
                        <div class="template_finance_sliderone_rateLabel" :style="rateLabelStyle">
                            {{itemInfo.fieldset3}}
                        </div>
                        <div class="template_finance_sliderone_financeLabel" :style="financeLabelStyle">
                            <span>{{itemInfo.fieldset8}}</span>
                            <span>{{itemInfo.fieldset4}}</span>
                            <span>{{itemInfo.fieldset7}}</span>
                        </div>
                    </div>
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
            containerStyle: {
                width: '100%',
                height: 'auto',
                marginLeft: '0',
                marginTop: '0',
                marginBottom: '0',
            },
            rateConStyle: {
                marginLeft: '0'
            },
            rateStyle: {
                width: 'auto',
                fontSize: '24px',
                marginTop: '0',
                marginLeft: '0'
            },
            rateLabelStyle: {
                width: 'auto',
                fontSize: '12px',
                marginTop: '0',
                marginLeft: '0'
            },
            financeConStyle: {
                marginRight: '0'
            },
            financeTitleStyle: {
                width: 'auto',
                fontSize: '18px',
                marginTop: '0',
                marginRight: '0'
            },
            financeLabelStyle: {
                width: 'auto',
                fontSize: '12px',
                marginTop: '0',
                marginRight: '0'
            }
        }
    },

    created () {
    },

    mounted () {
        this.calcRect()

        this.$nextTick(() => {
            if(!this.picScroll){
                this.picScroll = new Bscroll(this.$refs.templatefinancesliderone,{
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
            
            this.rateStyle.marginLeft = this.calcpxbyelem(this.$refs.templatefinancesliderone, 375, 16) + 'px'
            this.rateStyle.width = this.calcpxbyelem(this.$refs.templatefinancesliderone, 375, 100) + 'px'
            this.rateStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinancesliderone, 375, 24) + 'px'
            this.rateStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinancesliderone, 375, 8) + 'px'
            this.rateLabelStyle.width = this.rateStyle.width
            this.rateLabelStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinancesliderone, 375, 12) + 'px'
            this.rateLabelStyle.marginLeft = this.rateStyle.marginLeft
            
            this.financeTitleStyle.marginRight = this.calcpxbyelem(this.$refs.templatefinancesliderone, 375, 16) + 'px'
            this.financeTitleStyle.width = this.calcpxbyelem(this.$refs.templatefinancesliderone, 375, 156) + 'px'
            this.financeTitleStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinancesliderone, 375, 16) + 'px'
            this.financeLabelStyle.width = this.financeTitleStyle.width
            this.financeLabelStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinancesliderone, 375, 11) + 'px'
            this.financeLabelStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinancesliderone, 375, 8) + 'px'
            this.financeLabelStyle.marginRight = this.financeTitleStyle.marginRight

            let containerWidth = this.calcpxbyelem(this.$refs.templatefinancesliderone, 375, 300)
            this.containerStyle.width = containerWidth + 'px'
            this.containerStyle.height = this.calcpx(containerWidth, 300, 88) + 'px'
            let containerMarginLeft = this.calcpxbyelem(this.$refs.templatefinancesliderone, 375, 16)
            this.containerStyle.marginLeft = containerMarginLeft + 'px'
            this.containerStyle.marginTop = containerMarginLeft + 'px'
            this.containerStyle.marginBottom = this.containerStyle.marginTop

            if((this.options.styleInfoList || []).length > 1){
                this.slidercontainerStyle.width = ((this.options.styleInfoList || []).length*(containerMarginLeft + containerWidth) + containerMarginLeft) + 'px'
            }
        }
    }

}
</script>
<style scoped>

    .template_finance_sliderone{
        width: 100%;
        overflow: hidden;
    }

    .template_finance_sliderone_slider_container{
        font-size: 0;
        white-space: nowrap;
    }

    .template_finance_sliderone_slider_container:after {
        content: '';
        clear: both;
        overflow: hidden;
        height: 0;
        line-height: 0;
        display: block
    }

    .template_finance_sliderone_slider_item{
        float: left;
    }

    .template_finance_sliderone_container{
        margin: 0 auto;
        box-shadow: 0 1px 6px 0 rgba(21,30,121,0.10);
        border-radius: 4px;
    }

    .template_finance_sliderone_rateCon{
        display: flex;
        justify-content: space-between;
    }

    .template_finance_sliderone_financeTitle{
        color: #323C41;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: relative;
        top: -6px;
    }

    .template_finance_sliderone_rate{
        color: #EE2039;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .template_finance_sliderone_rateLabel{
        color: #A2A4A6;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
    }


    .template_finance_sliderone_financeCon{
        display: flex;
        justify-content: space-between;
    }

    .template_finance_sliderone_financeLabel{
        color: #EE2039;
        margin-top: 2px;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
    }

    .template_finance_sliderone_financeLabel span{
        border: 1px solid #EE2039;
        padding: 1px;
        border-radius: 2px;
        margin: 0 1px;
    }

</style>
