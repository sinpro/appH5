<template>
    <div class="template_finance_slidertwo" ref="templatefinanceslidertwo">
        <ul class="template_finance_slidertwo_slider_container" :style="slidercontainerStyle">
            <li class="template_finance_slidertwo_slider_item" v-for="(itemInfo, index) in (options.styleInfoList || [])" :key="index">
                <div class="template_finance_slidertwo_item" :style="itemStyle">
                    <div class="template_finance_slidertwo_financeTitle" :style="financeTitleStyle">{{itemInfo.fieldset8}}</div>
                    <div class="template_finance_slidertwo_financeDesc" :style="financeDescStyle">{{itemInfo.fieldset1}}</div>
                    <div class="template_finance_slidertwo_rate" :style="rateStyle">{{itemInfo.fieldset2}}</div>
                    <div class="template_finance_slidertwo_rateLabel" :style="rateLabelStyle">{{itemInfo.fieldset3}}</div>
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
                width: '50%',
                textAlign: 'left',
                backgroundColor: 'none',
                marginLeft: '0',
                marginTop: '0',
                marginBottom: '0'
            },
            financeTitleStyle: {
                fontSize: '18px',
                marginTop: '0'
            },
            financeDescStyle: {
                fontSize: '12px',
                marginTop: '0'
            },
            rateStyle: {
                fontSize: '24px',
                marginTop: '0'
            },
            rateLabelStyle: {
                fontSize: '12px',
                marginTop: '0'
            }
        }
    },

    created () {
    },

    mounted () {
        this.calcRect()

        this.$nextTick(() => {
            if(!this.picScroll){
                this.picScroll = new Bscroll(this.$refs.templatefinanceslidertwo,{
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

            let itemWidth = this.calcpxbyelem(this.$refs.templatefinanceslidertwo, 375, 142)
            this.itemStyle.width = itemWidth + 'px'
            this.itemStyle.textAlign = 'center'
            this.itemStyle.backgroundColor = '#FAFAFC'
            this.itemStyle.height = this.calcpxbyelem(this.$refs.templatefinanceslidertwo, 375, 136) + 'px'
            let marginLeft = this.calcpxbyelem(this.$refs.templatefinanceslidertwo, 375, 16)
            this.itemStyle.marginLeft = marginLeft + 'px'
            this.financeDescStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceslidertwo, 375, 12) + 'px'
            this.financeDescStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinanceslidertwo, 375, 4) + 'px'
            this.itemStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinanceslidertwo, 375, 16) + 'px'
            this.itemStyle.marginBottom = this.itemStyle.marginTop

            this.financeTitleStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceslidertwo, 375, 14) + 'px'
            this.rateStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceslidertwo, 375, 24) + 'px'
            this.rateStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinanceslidertwo, 375, 10) + 'px'
            this.rateLabelStyle.fontSize = this.calcpxbyelem(this.$refs.templatefinanceslidertwo, 375, 12) + 'px'
            this.rateLabelStyle.marginTop = this.calcpxbyelem(this.$refs.templatefinanceslidertwo, 375, 4) + 'px'

            if((this.options.styleInfoList || []).length > 1){
                this.slidercontainerStyle.width = ((this.options.styleInfoList || []).length*(marginLeft + itemWidth) + marginLeft) + 'px'
            }
        }
    }

}
</script>
<style scoped>
    @import '../../../reset.css';

    .template_finance_slidertwo{
        width: 100%;
        overflow: hidden;
    }

    .template_finance_slidertwo_slider_container{
        font-size: 0;
        white-space: nowrap;
    }

    .template_finance_slidertwo_slider_container:after {
        content: '';
        clear: both;
        overflow: hidden;
        height: 0;
        line-height: 0;
        display: block
    }

    .template_finance_slidertwo_slider_item{
        float: left;
    }

    .template_finance_slidertwo_container{
        width: 100%;
        overflow: hidden;
    }

    .template_finance_slidertwo_item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        letter-spacing: 1px;
    }

    .template_finance_slidertwo_financeTitle{
        color: #323C41;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
    }

    .template_finance_slidertwo_financeDesc{
        color: #A2A4A6;
    }

    .template_finance_slidertwo_rate{
        color: #EE2039;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_finance_slidertwo_rateLabel{
        color: #A2A4A6;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .template_finance_slidertwo_placeholder{
        width: 0;
        border-left: 1px solid #DDE0E4;
        position: absolute;
        left: 50%;
        height: 100%;
        top: 0;
        opacity: 0.4;
    }

</style>
