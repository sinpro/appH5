<template>
    <div class="template_advertise_popup" ref="templateadvertisepopup">
        <div v-if="bShow" class="template_advertise_popup_container">
            <div class="template_advertise_popup_backdrop"></div>
            <imageview class="template_advertise_popup_img" :style="imgStyle"
                :src="(options.styleInfoList[0] || {}).picUrl"
                @click="$emit('mClick', options.styleInfoList[0])"></imageview>
            <div class="template_advertise_popup_close" :style="closeStyle"
                @click="closeFloat">
                <imageview class="template_advertise_popup_closeimg" src="./assets/close.png"></imageview>
            </div>
        </div>
    </div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'

export default {

    props,
    mixins,

    data () {
        return {
            closeStyle: {
                width: 'auto',
                height: 'auto',
                right: '0',
                top: '0'
            },
            imgStyle: {
                width: '100%',
                height: 'auto',
                left: 0,
                top: 0,
                transform: ''
            },
            bShow: true
        }
    },

    created () {

    },

    mounted () {
        this.calcRect()
    },

    methods: {

        closeFloat () {
            this.bShow = false
        },

        calcRect () {

            //1：居中显示  2：全屏显示
            if((this.options.styleInfoList[0] || {}).picPositionType == '2'){
                this.imgStyle.height = '100%'
            }else{
                this.imgStyle.top = '50%'
                this.imgStyle.transform = 'translateY(-50%)'
            }

            this.closeStyle.width = this.calcpxbyelem(this.$refs.templateadvertisepopup, 375, 32) + 'px'
            this.closeStyle.height = this.closeStyle.width
            this.closeStyle.top = this.calcpxbyelem(this.$refs.templateadvertisepopup, 375, 24) + 'px'
            this.closeStyle.right = this.closeStyle.top
        }
    }

}
</script>
<style scoped>
.template_advertise_popup{
    width: 100%;
}

.template_advertise_popup_container{
    transition: transform 0.5s;
}

.template_advertise_popup_backdrop{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: 0.2;
    z-index: 1000010;
}

.template_advertise_popup_img{
    position: fixed;
    z-index: 1000011;
}

.template_advertise_popup_close{
    position: fixed;
    z-index: 1000012;
}

.template_advertise_popup_close .template_advertise_popup_closeimg{
    width: 100%;
    height: 100%;
}
</style>

