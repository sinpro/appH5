<template>
    <div class="template_advertise_announce" ref="templateadvertiseannounce">
        <div v-if="bShow" class="template_advertise_announce_container" :style="containerStyle">
            <marquee ref="marquee" behavior="scroll" scrollamount="5" scrolldelay="100" class="template_advertise_announce_content"
                @click="$emit('mClick', options.styleInfoList[0])"
                :style="contentStyle">{{(options.styleInfoList[0] || {}).adText}}</marquee>
            <div class="template_advertise_announce_img_container" :style="closeStyle"
                @click="closeFloat">
                <imageview class="template_advertise_announce_img"
                    src="./assets/close2x.png"></imageview> 
            </div>
            
        </div>
    </div>
</template>
<script>
import props from '../../../props'
import mixins from '../../../mixins'
import { setInterval } from 'timers';

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
            contentStyle: {
                width: 'auto',
                fontSize: '14px',
                transform: 'none'
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
            let containerWidth = this.calcpxbyelem(this.$refs.templateadvertiseannounce, 375, 343)
            let closeWidth = this.calcpxbyelem(this.$refs.templateadvertiseannounce, 375, 24)
            let contentWidth = (containerWidth - closeWidth - 5)

            this.contentStyle.fontSize = this.calcpxbyelem(this.$refs.templateadvertiseannounce, 375, 14) + 'px'
            this.contentStyle.width = contentWidth + 'px'
            this.closeStyle.width = closeWidth + 'px'
            this.closeStyle.height = this.closeStyle.width
            this.containerStyle.width = containerWidth + 'px'
            this.containerStyle.height = this.calcpxbyelem(this.$refs.templateadvertiseannounce, 375, 44) + 'px'

            
            this.$nextTick(() => {
                if(this.$refs.marquee.scrollWidth <= contentWidth) {
                    this.$refs.marquee.stop && this.$refs.marquee.stop()
                }
            })
        }
    }

}
</script>
<style scoped>
.template_advertise_announce{
    width: 100%;
    background-color: rgba(245, 166, 35, 0.1);
    display: flex;
    justify-content: center;
}

.template_advertise_announce_container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333333;
    overflow: hidden;
    position: relative;
}

.template_advertise_announce_img_container{
    flex-shrink: 0;
    flex-grow: 0;
}

.template_advertise_announce_content{
    white-space: nowrap;
    overflow: hidden;
}

.template_advertise_announce_img{
    width: 100%;
    height: 100%;
}
</style>

