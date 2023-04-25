<template>
    <div class="template_advertise_float" ref="templateadvertisefloat">
        <div class="template_advertise_float_container" :style="containerStyle">
            <div v-if="bClose" class="template_advertise_float_close" :style="closeStyle" 
                @click="closeFloat">
                <imageview class="template_advertise_float_closeimg" src="./assets/close.png"></imageview>
            </div>
            <imageview class="template_advertise_float_img" :src="(options.styleInfoList[0] || {}).picUrl"
                @click="$emit('mClick', options.styleInfoList[0])"></imageview>
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
            containerStyle: {
                width: 'auto',
                height: 'auto',
                transform: ''
            },
            closeStyle: {
                width: 'auto',
                height: 'auto'
            },
            bClose: true
        }
    },

    created () {

    },

    mounted () {
        this.calcRect()
        this.initTouch()
    },

    methods: {

        initTouch () {
            this.timer = null

            //滚动启动
            document.ontouchstart = (e) => {
                this.timer && clearTimeout(this.timer)
                this.close()
            }

            //滚动结束
            document.ontouchend = (e) => {
                this.timer && clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.open()
                }, 3000)
            }
        },

        open () {
            this.containerStyle.transform = 'translateX(0) translateY(-50%)'
        },

        close () {
            this.containerStyle.transform = 'translateX(80%) translateY(-50%)'
        },

        closeFloat () {
            this.bClose = false
            this.containerStyle.transform = 'translateX(100%) translateY(-50%)'
            this.timer && clearTimeout(this.timer)
        },

        calcRect () {
            this.closeStyle.width = this.calcpxbyelem(this.$refs.templateadvertisefloat, 375, 24) + 'px'
            this.closeStyle.height = this.closeStyle.width
            this.containerStyle.width = this.calcpxbyelem(this.$refs.templateadvertisefloat, 375, 72) + 'px'
            this.containerStyle.height = this.calcpxbyelem(this.$refs.templateadvertisefloat, 375, 84) + 'px'
        }
    }

}
</script>
<style scoped>
.template_advertise_float{
    width: 100%;
    background-color: #FFFFFF;
}

.template_advertise_float_container{
    position: fixed;
    right: 0;
    top: 30%;
    transform: translateX(0) translateY(-50%);
    z-index: 1000000;
    transition: transform 0.5s;
}

.template_advertise_float_close{
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-50%) translateY(-50%);
}

.template_advertise_float_close .template_advertise_float_closeimg{
    width: 100%;
    height: 100%;
}

.template_advertise_float_img{
    width: 100%;
    height: 100%;
}
</style>

