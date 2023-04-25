<template>
    <div class="template_deposit_slidertwo" ref="templatedepositslidertwo">
        <ul class="template_deposit_slidertwo_ul" :style="slidercontainerStyle">
            <li v-for="(itemInfo, index) in (options.styleInfoList || [])" :style="itemStyle" :key="index" class="template_deposit_slidertwo_li" :class="{'template_deposit_slidertwo_li_first': index == 0}">
                <div>
                    <div class="template_deposit_slidertwo_financeLabel" :style="financeLabelStyle">
                        <span>{{itemInfo.fieldset4}}</span>
                        <span class="template_deposit_slidertwo_li_logo">NO.1</span>
                    </div>
                    <div class="template_deposit_slidertwo_financeTitle" :style="financeStyle">{{itemInfo.fieldset1}}</div>
                </div>
                <div>
                    <div class="template_deposit_slidertwo_rate" :style="rateStyle">{{itemInfo.fieldset2}}</div>
                    <div class="template_deposit_slidertwo_rateLabel" :style="rateLabelStyle">{{itemInfo.fieldset3}}</div>
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
                padding: '0'
            },
            rateStyle: {
                fontSize: '12px'
            },
            rateLabelStyle: {
                fontSize: '12px'
            },
            financeStyle: {
                fontSize: '12px',
                marginBottom: '10px'
            },
            financeLabelStyle: {
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
                this.picScroll = new Bscroll(this.$refs.templatedepositslidertwo,{
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

            let marginLeft = this.calcpxbyelem(this.$refs.templatedepositslidertwo, 375, 16)
            let itemWidth = this.calcpxbyelem(this.$refs.templatedepositslidertwo, 375, 142)
            this.itemStyle.width = itemWidth + 'px'
            this.itemStyle.height = this.itemStyle.width
            this.itemStyle.marginLeft = marginLeft + 'px'
            this.itemStyle.marginTop = marginLeft + 'px'
            this.itemStyle.marginBottom = this.itemStyle.marginTop
            this.itemStyle.padding = this.calcpxbyelem(this.$refs.templatedepositslidertwo, 375, 16) + 'px'

            this.rateStyle.fontSize = this.calcpxbyelem(this.$refs.templatedepositslidertwo, 375, 24) + 'px'
            this.rateLabelStyle.fontSize = this.calcpxbyelem(this.$refs.templatedepositslidertwo, 375, 12) + 'px'
            this.financeStyle.fontSize = this.calcpxbyelem(this.$refs.templatedepositslidertwo, 375, 12) + 'px'
            this.financeStyle.marginTop = this.calcpxbyelem(this.$refs.templatedepositslidertwo, 375, 4) + 'px'
            this.financeStyle.marginBottom = this.calcpxbyelem(this.$refs.templatedepositslidertwo, 375, 22) + 'px'
            this.financeLabelStyle.fontSize = this.calcpxbyelem(this.$refs.templatedepositslidertwo, 375, 14) + 'px'

            if((this.options.styleInfoList || []).length > 1){
                this.slidercontainerStyle.width = ((this.options.styleInfoList || []).length*(marginLeft + itemWidth) + marginLeft) + 'px'
            }
            
        }
    }

}
</script>
<style scoped>
    @import '../../../reset.css';

    .template_deposit_slidertwo{
        width: 100%;
        overflow: hidden;
        text-align: left;
    }

    .template_deposit_slidertwo_ul{
        display: flex;
        justify-content: flex-start;
        font-size: 0;
        white-space: nowrap;
    }

    .template_deposit_slidertwo_ul:after {
        content: '';
        clear: both;
        overflow: hidden;
        height: 0;
        line-height: 0;
        display: block
    }

    .template_deposit_slidertwo_li{
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 4px;
        position: relative;
        box-shadow: 0 2px 8px 0 rgba(63,91,245,0.36);
        border-radius: 4px;
        color: #FFFFFF;
        background: #FFFFFF;
        opacity: 1;
        position: relative;
        letter-spacing: 1px;
    }

    .template_deposit_slidertwo_rate{
        color: #EE2039;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_deposit_slidertwo_financeTitle{
        color: #A2A4A6;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_deposit_slidertwo_financeLabel{
        color: #323C41;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_deposit_slidertwo_rateLabel{
        color: #A2A4A6;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_deposit_slidertwo_li_logo{
        display: none;
    }

    .template_deposit_slidertwo_li_first{
        background-image: linear-gradient(-90deg, #2B4AF0 3%, #435FF6 100%);
    }

    .template_deposit_slidertwo_li_first .template_deposit_slidertwo_li_logo{
        display: block;
        position: absolute;
        right: 0;
        transform: translateY(-100%);
        padding-left: 6px;
        background-color: #F66730;
        border-radius: 10px 0px 0px 10px;
    }

    .template_deposit_slidertwo_li_first .template_deposit_slidertwo_rate,
    .template_deposit_slidertwo_li_first .template_deposit_slidertwo_financeTitle,
    .template_deposit_slidertwo_li_first .template_deposit_slidertwo_rateLabel,
    .template_deposit_slidertwo_li_first .template_deposit_slidertwo_financeLabel{
        color: #FFFFFF;
    }

    .template_deposit_slidertwo_li_first .template_deposit_slidertwo_financeTitle,
    .template_deposit_slidertwo_li_first .template_deposit_slidertwo_rateLabel{
        opacity: 0.5;
    }



</style>
