<template>
    <div class="template_installment_verticalthreetext" ref="templateinstallmentverticalthreetext">
        <div class="template_installment_verticalthreetext_container" :style="containerStyle">
            <div class="template_installment_verticalthreetext_left" :style="blockStyle">
                <imageview :style="imgStyle" :src="options.styleInfoList[0].picUrl"></imageview>
                <div>
                    <div class="template_installment_verticalthreetext_title" :style="titleStyle">{{options.styleInfoList[0].fieldset1}}</div>
                    <div class="template_installment_verticalthreetext_subtitle" :style="subtitleStyle">{{options.styleInfoList[0].fieldset2}}</div>
                </div>
            </div>
            <div class="template_installment_verticalthreetext_placeholder" :style="placeholderStyle"/>
            <div class="template_installment_verticalthreetext_middle" :style="blockStyle">
                <imageview :style="imgStyle" :src="options.styleInfoList[1].picUrl"></imageview>
                <div>
                    <div class="template_installment_verticalthreetext_title" :style="titleStyle">{{options.styleInfoList[1].fieldset1}}</div>
                    <div class="template_installment_verticalthreetext_subtitle" :style="subtitleStyle">{{options.styleInfoList[1].fieldset2}}</div>
                </div>
            </div>
            <div class="template_installment_verticalthreetext_placeholder" :style="placeholderStyle"/>
            <div class="template_installment_verticalthreetext_right" :style="blockStyle">
                <imageview :style="imgStyle" :src="options.styleInfoList[2].picUrl"></imageview>
                <div>
                    <div class="template_installment_verticalthreetext_title" :style="titleStyle">{{options.styleInfoList[2].fieldset1}}</div>
                    <div class="template_installment_verticalthreetext_subtitle" :style="subtitleStyle">{{options.styleInfoList[2].fieldset2}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'

export default {
    mixins,
    props,

    data () {
        return {
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
    },

    methods: {
        calcRect () {
            let imgWidth = this.calcpxbyelem(this.$refs.templateinstallmentverticalthreetext, 375, 104)
            this.imgStyle.width = imgWidth + 'px'
            this.imgStyle.height = this.imgStyle.width
            this.imgStyle.marginBottom = this.calcpxbyelem(this.$refs.templateinstallmentverticalthreetext, 375, 8) + 'px'
            this.placeholderStyle.width = this.calcpxbyelem(this.$refs.templateinstallmentverticalthreetext, 375, 16) + 'px'
            this.containerStyle.marginTop = this.calcpxbyelem(this.$refs.templateinstallmentverticalthreetext, 375, 8) + 'px'
            this.containerStyle.marginBottom = this.containerStyle.marginTop
            

            this.blockStyle.width = this.imgStyle.width

            this.titleStyle.fontSize = this.calcpxbyelem(this.$refs.templateinstallmentverticalthreetext, 375, 14) + 'px'
            this.subtitleStyle.fontSize = this.calcpxbyelem(this.$refs.templateinstallmentverticalthreetext, 375, 12) + 'px'
        }
    }
}
</script>
<style scoped>

.template_installment_verticalthreetext{
    width: 100%;
    display: flex;
}

.template_installment_verticalthreetext_container{
    margin: 0 auto;
    display: flex;
}

.template_installment_verticalthreetext_title{
    color: #323C41;
    letter-spacing: 0;
}

.template_installment_verticalthreetext_subtitle{
    color: #EE2039;
    letter-spacing: 0;
}

.template_installment_verticalthreetext_title,
.template_installment_verticalthreetext_subtitle{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
}

.template_installment_verticalthreetext_placeholder {
    height: 100%;
}

.template_installment_verticalthreetext_left,
.template_installment_verticalthreetext_middle,
.template_installment_verticalthreetext_right{
    font-size: 0;
}

</style>
