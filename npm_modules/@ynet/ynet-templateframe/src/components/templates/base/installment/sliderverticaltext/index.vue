<template>
    <div class="template_installment_sliderverticaltext" ref="templateinstallmentsliderverticaltext">
        <ul class="template_installment_sliderverticaltext_slider_container" :style="slidercontainerStyle">
            <li class="template_installment_sliderverticaltext_slider_item" v-for="(itemInfo, index) in options.styleInfoList" :key="index">
                <div class="template_installment_sliderverticaltext_container" :style="containerStyle">
                    <div class="template_installment_sliderverticaltext_placeholder" :style="placeholderStyle"/>
                    <div class="template_installment_sliderverticaltext_item" :style="blockStyle">
                        <imageview :style="imgStyle" :src="itemInfo.picUrl"></imageview>
                        <div>
                            <div class="template_installment_sliderverticaltext_title" :style="titleStyle">{{itemInfo.fieldset1}}</div>
                            <div class="template_installment_sliderverticaltext_subtitle" :style="subtitleStyle">{{itemInfo.fieldset2}}</div>
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
                marginTop : '0',
                marginBottom : '0'
            },
            blockStyle: {
                width: 'auto'
            },
            placeholderStyle: {
                width: 'auto'
            },
            imgStyle: {
                width: 'auto',
                height: 'auto',
                marginBottom: '0'
            },
            titleStyle: {
                fontSize: '16px'
            },
            subtitleStyle: {
                fontSize: '16px',
                width: 'auto'
            }
        }
    },

    created () {
         
    },

    mounted () {
        this.calcRect()
        this.$nextTick(() => {
            if(!this.picScroll){
                this.picScroll = new Bscroll(this.$refs.templateinstallmentsliderverticaltext,{
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
            this.imgStyle.marginBottom = this.calcpxbyelem(this.$refs.templateinstallmentsliderverticaltext, 375, 8) + 'px'
            let placeholderWidth = this.calcpxbyelem(this.$refs.templateinstallmentsliderverticaltext, 375, 16)
            this.placeholderStyle.width = placeholderWidth + 'px'
            this.containerStyle.marginTop = this.calcpxbyelem(this.$refs.templateinstallmentsliderverticaltext, 375, 8) + 'px'
            this.containerStyle.marginBottom = this.containerStyle.marginTop

            let imgWidth = this.calcpxbyelem(this.$refs.templateinstallmentsliderverticaltext, 375, 88)
            this.imgStyle.width = imgWidth + 'px'
            this.imgStyle.height = this.imgStyle.width

            this.blockStyle.width = this.imgStyle.width
            this.titleStyle.fontSize = this.calcpxbyelem(this.$refs.templateinstallmentsliderverticaltext, 375, 14) + 'px'
            this.subtitleStyle.fontSize = this.calcpxbyelem(this.$refs.templateinstallmentsliderverticaltext, 375, 12) + 'px'

            if((this.options.styleInfoList || []).length > 1){
                this.slidercontainerStyle.width = ((this.options.styleInfoList || []).length*(placeholderWidth + imgWidth) + placeholderWidth) + 'px'
            }

        }
    }
}
</script>
<style scoped>

.template_installment_sliderverticaltext{
    width: 100%;
    overflow: hidden;
}

.template_installment_sliderverticaltext_slider_container{
    font-size: 0;
    white-space: nowrap;
}

.template_installment_sliderverticaltext_slider_container:after {
    content: '';
    clear: both;
    overflow: hidden;
    height: 0;
    line-height: 0;
    display: block
}

.template_installment_sliderverticaltext_slider_item{
    float: left;
}




.template_installment_sliderverticaltext_container{
    margin: 0 auto;
    display: flex;
}

.template_installment_sliderverticaltext_title{
    color: #323C41;
    letter-spacing: 0;
}

.template_installment_sliderverticaltext_subtitle{
    color: #EE2039;
    letter-spacing: 0;
}

.template_installment_sliderverticaltext_title,
.template_installment_sliderverticaltext_subtitle{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
}

.template_installment_sliderverticaltext_placeholder {
    height: 100%;
}

</style>
